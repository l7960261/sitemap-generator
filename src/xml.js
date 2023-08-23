const dayjs = require("dayjs");
const fs = require("fs");
const R = require("ramda");

const XMLService = {
  create(links, imgs) {
    const now = dayjs().format("YYYY-MM-DD");
    let str = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    links.forEach((link, index) => {
      const imgsMatched = imgs[index];
      const randomIndex = Math.floor(Math.random() * imgsMatched.length);
      const randomImgs = R.slice(randomIndex, randomIndex + 5, imgsMatched);

      str =
        str +
        `
  <url>
    <loc>${link}</loc>
    <lastmod>${now}</lastmod>`;

      randomImgs.forEach((img) => {
        str = str + sitemapImageTag(img);
      });

      str = str + addClosingTag("  </url>");
    });

    str = str + addClosingTag("</urlset>");

    fs.writeFileSync("./sitemap.xml", str, "utf-8");
  },
};

function sitemapImageTag(url) {
  return `
    <image:image>
      <image:loc>${url}</image:loc>
    </image:image>`;
}

function addClosingTag(tag) {
  return `
${tag}`;
}

module.exports = XMLService;
