const sitemap = require("nextjs-sitemap-generator");
const fs = require("fs");

const BUILD_ID = fs.readFileSync(".next/BUILD_ID").toString();

sitemap({
  baseUrl: "https://kimamaniweb.com",
  pagesDirectory: __dirname + "/out/",
  targetDirectory: "public/",
  ignoredExtensions: ["js", "map", "ico", "xml", "svg"],
  ignoredPaths: ["[fallback]", "image", "_next", "page", "google85f37d88fa2c41e5"],
});