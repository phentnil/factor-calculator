module.exports = target => {
  target = target || 3000;

  // import modules
  const search = require('./search');
  const sorting = require('./sorting');
  const oput = require('./output');

  // TODO: implement user input
  const input = "";

  // TODO: import units in inventory?
  const inv = [{unit: 533, quantity: 4}, {unit: 535, quantity: 3}, {unit: 536, quantity: 1}, {unit: 540, quantity: 6}, {unit: 554, quantity: 1}, {unit: 565, quantity: 2}, {unit: 576, quantity: 2}, {unit: 1097, quantity: 4}, {unit: 1100, quantity: 4}, {unit: 1155, quantity: 2}];

  // TODO: find all results
  const results = search(input, inv);

  // TODO: sort and classify results?
  // const filteredResults = qualityCheckFunction(results);

  // TODO: format top result(s)
  // const finalResults = outputParser(filteredResults);

  // TODO: output result(s)
  //   - console.log() or return?
  return results;
};
