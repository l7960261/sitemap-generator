const WebService = require('./pptr');

(async () => {
  const base = 'https://nohu99.org/';
  const result = await WebService.run(base);
  console.log(result);
})();
