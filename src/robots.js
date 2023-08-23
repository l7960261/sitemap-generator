const { base, extraDomains } = require("./config");
const Log = require("./log");
const fs = require("fs");

(() => {
  Log.log(`Base: ${base}`);
  let data = `Sitemap: ${base}sitemap.xml`;

  extraDomains.forEach((domain) => {
    Log.log(`Extra Domain: ${domain}`);
    data =
      data +
      `
Sitemap: ${domain}sitemap.xml`;
  });

  Log.log(`Generate robots.txt start`);
  fs.writeFileSync("robots.txt", data, "utf-8");
  Log.log(`Generate robots.txt end`);
})();
