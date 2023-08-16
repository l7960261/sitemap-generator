const R = require("ramda");
const { base, crawlLevel } = require("./config");
const baseUrlHashes = base.split("/").length;

const Rules = {
  format(urls) {
    // 1. exclude not base
    // 2. exclude hash
    // 3. exclude .apk
    // 4. exclude ignore levles
    // 5. uniq
    const returnUrls = urls
      .filter((item) => item.includes(base))
      .filter((item) => !item.includes("#"))
      .filter((item) => !item.includes(".apk"))
      .filter((item) => item.split("/").length <= baseUrlHashes + crawlLevel);
    return R.uniq(returnUrls);
  },
};

module.exports = Rules;
