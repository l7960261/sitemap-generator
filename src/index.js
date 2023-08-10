const WebService = require("./pptr");
const Log = require("./log");

(async () => {
  const base = "https://nohu99.org/";
  Log.log(`Queuing ${base}`);
  const result = await WebService.run(base);
  Log.log(`Data received ${JSON.stringify(result)}`);
  const { links, imgs } = result;
  // filter links
  // 1. exclude not base
  // 2. exclude hash
  const newLinks = links
    .filter((item) => item.includes(base))
    .filter((item) => !item.includes("#"))
  Log.log(`${JSON.stringify(newLinks)}`);
})();
