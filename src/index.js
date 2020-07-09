module.exports = tar => {
  // import modules
  const search = require('./search');
  const output = require('./output');
  const fs = require('fs');

  // TODO: find all results
  var results;
  try {
    results = search(tar);
    // TODO: format top result(s)
    const formattedResults = output(results, tar);
    console.log(formattedResults);
    return formattedResults;
  } catch (err) {
    console.log(err);
    return `Results found: 0`;
  }
};
