const config = require("./config");
const WebService = require("./pptr");
const Log = require("./log");
const Rules = require("./rules");
const R = require("ramda");

const { base, crawlLevel, maxPage } = config;
const baseUrlHashes = base.split("/").length;
const pending = [];
const completed = [];
const images = [];

(async () => {
  pending.push(base);
  autoCrawler();
})();

function autoCrawler() {
  let counter = 0;

  while (pending.length > 0 && completed.length < maxPage) {
    const url = pending.pop();
    Log.log(`Queuing ${url}`);

    counter = counter + 1;
    completed.push(url);
    getData(url, counter).then(() => {
      if (images.length == maxPage) {
        Log.log("Ending");
      }
    });
  }

  function getData(url, index) {
    return WebService.run(url).then((result) => {
      Log.log(`Data received for the ${url}`);

      Log.log(`Data Queued ${index} - Completed`);
      const { links, imgs } = result;
      images[index] = imgs;
      const newLinks = Rules.format(links);
      queue(newLinks);
    });
  }
}

function queue(urls) {
  const removingCompleted = R.uniq(R.without(completed, urls));
  const removingPending = R.without(pending, removingCompleted);
  const removingIngoreLevels = removingPending.filter(
    (url) => url.split("/").length <= baseUrlHashes + crawlLevel
  );

  pending.push(...removingIngoreLevels);
  autoCrawler();
}
