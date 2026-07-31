// Eleventy's passthrough copy of src/assets races against blogPosts.js
// writing newly-cached thumbnails into that same directory during the
// build's data resolution. Running the fetch here, before Eleventy starts,
// means every image already exists on disk by the time the copy runs.
require("../content/_data/blogPosts.js")()
  .then((posts) => console.log(`[prefetch-blog-images] cached images for ${posts.length} posts`))
  .catch((e) => console.warn("[prefetch-blog-images] failed, continuing:", e.message));
