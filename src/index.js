const config = require("./config");
const WebService = require("./pptr");
const Log = require("./log");
const Rules = require("./rules");
const R = require("ramda");
const XmlService = require('./xml');

const { base } = config;
const completed = [];
const images = [];

(() => {
  // MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
  // process.setMaxListeners(Infinity);
  start([base]);
})();

function start(urls = []) {
  if (urls.length > 0) {
    Log.log(`Start to crawler ${JSON.stringify(urls)}`);
    return crawler(urls);
  }

  return new Promise((resolve, reject) => {
    Log.log("Ending");
    Log.log(`completed: ${JSON.stringify(completed.length)}`);
    Log.log(`images: ${JSON.stringify(images.length)}`);
    resolve();
  }).then(() => {
    XmlService.create(completed, images);
  });
}

function crawler(urls) {
  Log.log(`Queuing ${JSON.stringify(urls)}`);
  completed.push(...urls);

  return R.splitEvery(10, urls)
    .reduce((prev, curr) => {
      return prev.then((prevResult) =>
        Promise.all(
          curr.map((url) =>
            WebService.run(url).then((result) => {
              Log.log(`Data received for the ${url}`);
              const { links, imgs } = result;
              const index = completed.indexOf(url);
              images[index] = imgs;
              Log.log(`Sort out links`);
              const newLinks = Rules.format(links);
              const removingCompleted = R.uniq(R.without(completed, newLinks));
              return removingCompleted;
            })
          )
        ).then((currResult) => prevResult.concat(currResult))
      );
    }, Promise.resolve([]))
    .then((collection) => {
      const allLinks = collection.reduce((prev, curr) => prev.concat(curr), []);
      const uniqAllLinks = R.uniq(allLinks);
      Log.log(`Data next queue for the ${JSON.stringify(uniqAllLinks)}`);
      return start(uniqAllLinks);
    });

  // return Promise.all(
  //   urls.map((url) =>
  //     WebService.run(url).then((result) => {
  //       Log.log(`Data received for the ${url}`);
  //       const { links, imgs } = result;
  //       const index = completed.indexOf(url);
  //       images[index] = imgs;
  //       Log.log(`Sort out links`);
  //       const newLinks = Rules.format(links);
  //       const removingCompleted = R.uniq(R.without(completed, newLinks));
  //       return removingCompleted;
  //     })
  //   )
  // ).then((collection) => {
  //   const allLinks = collection.reduce((prev, curr) => prev.concat(curr), []);
  //   const uniqAllLinks = R.uniq(allLinks);
  //   Log.log(`Data next queue for the ${JSON.stringify(uniqAllLinks)}`);
  //   return start(uniqAllLinks);
  // });
}
