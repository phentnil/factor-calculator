module.exports = tar => {
  // import modules
  const search = require('./search');
  //const sorting = require('./sorting');
  const output = require('./output');
  const fs = require('fs');

  // TODO: implement user input
  const input = tar;

  // TODO: import units in inventory?

  // TODO: find all results
  var results;
  try {
    results = search(input);
    // TODO: format top result(s)
    const formattedResults = output(results,tar);
    console.log(formattedResults);
    return formattedResults;
  } catch (err) {
    console.log(err);
    return `Results found: 0`;
  }
};
