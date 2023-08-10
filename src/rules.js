const config = require("./config");
const Rules = {
  format(urls) {
    // 1. exclude not base
    // 2. exclude hash
    return urls
      .filter((item) => item.includes(config.base))
      .filter((item) => !item.includes("#"));
  },
};

module.exports = Rules;
