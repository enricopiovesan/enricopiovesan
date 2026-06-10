const https = require("https");

function fetchUrl(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error("Too many redirects"));
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; Eleventy)" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location, redirectCount + 1).then(resolve).catch(reject);
      }
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
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

    // tags: all <category> values, max 3
    const tags = [];
    const catRegex = /<category><!\[CDATA\[(.*?)\]\]><\/category>/g;
    let cm;
    while ((cm = catRegex.exec(block)) !== null && tags.length < 3) {
      tags.push(slugToLabel(cm[1]));
    }

    // image: first <img src="..."> inside content:encoded that isn't a tracking pixel
    let image = "";
    const contentMatch = /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/.exec(block);
    if (contentMatch) {
      const imgRegex = /<img[^>]+src="(https:\/\/cdn-images[^"]+\.(png|jpg|jpeg|gif|webp))"[^>]*>/g;
      let im;
      while ((im = imgRegex.exec(contentMatch[1])) !== null) {
        const src = im[1];
        // skip tiny tracking/gif images
        if (!src.endsWith(".gif")) {
          // Request 112px WebP via Medium CDN format parameter
          image = src.replace(/\/max\/\d+\//, "/max/112/format:webp/");
          break;
        }
      }
    }

    const cleanTitle = decodeEntities(title).trim();
    const cleanLink  = link.replace(/\?source=rss.*$/, "").trim();

    if (cleanTitle && cleanLink) {
      items.push({
        title: cleanTitle,
        url:   cleanLink,
        date:  date ? new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "",
        tags,
        image
      });
    }
    if (items.length >= 10) break;
  }
  return items;
}

module.exports = async function () {
  try {
    const xml = await fetchUrl("https://blog.enricopiovesan.com/feed");
    const posts = parseRSS(xml);
    if (posts.length) return posts;
  } catch (e) {
    console.warn("[blogPosts] primary feed failed:", e.message);
  }
  try {
    const xml = await fetchUrl("https://medium.com/feed/@enricopiovesan");
    return parseRSS(xml);
  } catch (e) {
    console.warn("[blogPosts] fallback feed failed:", e.message);
    return [];
  }
};
