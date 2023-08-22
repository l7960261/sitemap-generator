const dayjs = require('dayjs');
const fs = require("fs");
const XMLService = {
  create(links, imgs) {
    const now = dayjs().format('YYYY-MM-DD')
    let str = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    links.forEach((link) => {
      str =
        str +
        `
  <url>
    <loc>${link}</loc>
    <lastmod>${now}</lastmod>
  </url>`;
    });

    str =
      str +
      `
</urlset>`;

    fs.writeFileSync("./sitemap.xml", str, "utf-8");
  },
};

module.exports = XMLService;