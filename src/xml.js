const { base, extraDomains } = require("./config");
const dayjs = require("dayjs");
const now = dayjs().format("YYYY-MM-DD");

const fs = require("fs");
const R = require("ramda");

const XMLService = {
  create(links, imgs) {
    let str = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    links.forEach((link, index) => {
      const imgsMatched = imgs[index];
      const randomIndex = Math.floor(Math.random() * imgsMatched.length);
      const randomImgs = R.slice(randomIndex, randomIndex + 5, imgsMatched);
      // <url>
      str = str + sitemapLocAndLastmod(link);
      // <image></image>
      randomImgs.forEach((img) => (str = str + sitemapImageTag(img)));
      // </url>
      str = str + addClosingTag("  </url>");

      if (extraDomains.length) {
        extraDomains.forEach((domain) => {
          // <url>
          str = str + sitemapLocAndLastmod(link.replace(base, domain));
          // <image></image>
          randomImgs.forEach((img) => (str = str + sitemapImageTag(img)));
          // </url>
          str = str + addClosingTag("  </url>");
        });
      }
    });

    str = str + addClosingTag("</urlset>");

    fs.writeFileSync("./sitemap.xml", str, "utf-8");
  },
};

function sitemapLocAndLastmod(link) {
  return `
  <url>
    <loc>${link}</loc>
    <lastmod>${now}</lastmod>`;
}

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
