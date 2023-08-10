const config = require("./config");
const WebService = require("./pptr");
const Log = require("./log");
const Rules = require("./rules");

(async () => {
  const { base } = config;
  Log.log(`Queuing ${base}`);
  const result = await WebService.run(base);
  Log.log(`Data received ${JSON.stringify(result)}`);
  const { links, imgs } = result;
  const newLinks = Rules.format(links);
  Log.log(`${JSON.stringify(newLinks)}`);
})();
