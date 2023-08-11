const config = require("./config");
const R = require("ramda");
const Rules = {
  format(urls) {
    // 1. exclude not base
    // 2. exclude hash
    // 3. uniq
    const returnUrls = urls
      .filter((item) => item.includes(config.base))
      .filter((item) => !item.includes("#"));
    return R.uniq(returnUrls);
  },
};

module.exports = Rules;
