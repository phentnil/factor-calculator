module.exports = tar => {
  // import modules
  const search = require('./search');
  //const sorting = require('./sorting');
  //const output = require('./output');

  // TODO: implement user input
  const input = tar || 3000;

  // TODO: import units in inventory?

  // TODO: find all results
  const results = search(input);

  // TODO: sort and classify results?
  // const filteredResults = qualityCheckFunction(results);

  // TODO: format top result(s)
  // const finalResults = outputParser(filteredResults);

  // TODO: output result(s)
  //   - console.log() or return?
  return results;
};
