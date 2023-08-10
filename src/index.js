const WebService = require("./pptr");
const Log = require("./log");

(async () => {
  const base = "https://nohu99.org/";
  Log.log(`Queuing ${base}`);
  const result = await WebService.run(base);
  Log.log(`Data received ${JSON.stringify(result)}`);
})();
