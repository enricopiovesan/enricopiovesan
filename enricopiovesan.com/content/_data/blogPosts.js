const https = require("https");
const fs = require("fs");
const path = require("path");

const BLOG_IMG_DIR = path.join(__dirname, "../../src/assets/img/blog");
const FETCH_TIMEOUT_MS = 10000;

function fetchUrl(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error("Too many redirects"));
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; Eleventy)" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location, redirectCount + 1).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    });
    req.on("error", reject);
    req.setTimeout(FETCH_TIMEOUT_MS, () => req.destroy(new Error(`Timed out after ${FETCH_TIMEOUT_MS}ms: ${url}`)));
  });
}

function fetchBinary(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error("Too many redirects"));
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; Eleventy)" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        const next = loc.startsWith("http") ? loc : new URL(loc, url).href;
        return fetchBinary(next, redirectCount + 1).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on("data", chunk => chunks.push(chunk));
      res.on("end", () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers["content-type"] || "" }));
    });
    req.on("error", reject);
    req.setTimeout(FETCH_TIMEOUT_MS, () => req.destroy(new Error(`Timed out after ${FETCH_TIMEOUT_MS}ms: ${url}`)));
  });
}

function urlToFilename(url) {
  const u = new URL(url);
  const parts = u.pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "img";
  const ext = last.includes(".") ? "" : ".jpg";
  return last + ext;
}

async function cacheImage(remoteUrl) {
  if (!remoteUrl) return "";
  try {
    if (!fs.existsSync(BLOG_IMG_DIR)) fs.mkdirSync(BLOG_IMG_DIR, { recursive: true });
    const filename = urlToFilename(remoteUrl);
    const localPath = path.join(BLOG_IMG_DIR, filename);
    if (!fs.existsSync(localPath)) {
      const { buffer } = await fetchBinary(remoteUrl);
      fs.writeFileSync(localPath, buffer);
    }
    return `/src/assets/img/blog/${filename}`;
  } catch (e) {
    console.warn("[blogPosts] image cache failed:", e.message);
    return remoteUrl;
  }
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
}

function slugToLabel(slug) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const title = (/<title><!\[CDATA\[(.*?)\]\]><\/title>/.exec(block) || /<title>(.*?)<\/title>/.exec(block) || [])[1] || "";
    const link  = (/<link>(.*?)<\/link>/.exec(block) || /<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/.exec(block) || [])[1] || "";
    const date  = (/<pubDate>(.*?)<\/pubDate>/.exec(block) || [])[1] || "";

    const tags = [];
    const catRegex = /<category><!\[CDATA\[(.*?)\]\]><\/category>/g;
    let cm;
    while ((cm = catRegex.exec(block)) !== null && tags.length < 3) {
      tags.push(slugToLabel(cm[1]));
    }

    let image = "";
    const contentMatch = /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/.exec(block);
    if (contentMatch) {
      const imgRegex = /<img[^>]+src="(https:\/\/cdn-images[^"]+\.(png|jpg|jpeg|gif|webp))"[^>]*>/g;
      let im;
      while ((im = imgRegex.exec(contentMatch[1])) !== null) {
        const src = im[1];
        if (!src.endsWith(".gif")) {
          image = src.replace(/\/max\/\d+\//, "/max/56/");
          break;
        }
      }
    }

    const cleanTitle = decodeEntities(title).trim();
    const cleanLink  = link.replace(/\?source=rss.*$/, "").trim();

    if (cleanTitle && cleanLink) {
      items.push({ title: cleanTitle, url: cleanLink, date: date ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "", tags, image });
    }
    if (items.length >= 10) break;
  }
  return items;
}

module.exports = async function () {
  let posts = [];
  try {
    const xml = await fetchUrl("https://medium.com/feed/@enricopiovesan");
    posts = parseRSS(xml);
  } catch (e) {
    console.warn("[blogPosts] feed failed:", e.message);
    return [];
  }

  for (const post of posts) {
    if (post.image) {
      post.image = await cacheImage(post.image);
    }
  }

  return posts;
};
