const units = require('./units');

module.exports = (t) => {
  /**
   * @param {number} t    Target amount. An error is thrown if type is not
                          number or if a number not between 500 and 5000 is
                          given.
   * @return [{Object}]   An Array of objects will be returned with the
                          best-matching values.
   */
  if ("number" !== typeof t) {
    throw "Target not specified (must be a number)!";
  } else if ((t < 500) || (t > 5000)) {
    throw "Target out of range!";
  }

  // Concept: develop classes for Units, Multiples, and Combinations
  // When searching for matching values, we should first search for multiples, then combinations (of multiples)
  // Units should simply contain unit value and quantity
  // Multiples should contain sum, base unit value and quantity (up to the quantity of the Unit object with the same base unit value [Multiple.base_unit_value === Unit.unit_value])
  // Combinations should contain sum and a list of multiples used
  // Multiples and Combinations can be converted over to a fourth class of Results, which contains details about the target used, sum of all units used, and an array of either a single multiple with its details or multiple combinations used, the difference of the sum and the target, and the difference percentage from the target
  let resultUnits = (JSON.parse(JSON.stringify(units))).map(item => {
    item.diff = item.total - t;
    item.dpnt = item.diff / t;
    item.target = t;
    return item;
  });

  // Using the .some() array method, we want to check that there is at least
  // one result within the 10% margin that will be returned
  if (resultUnits.some(item=>Math.abs(item.dpnt) < 0.1)) {
    resultUnits.sort((a, b) => (a.quantity === b.quantity) ? Math.abs(a.diff) - Math.abs(b.diff) : a.quantity - b.quantity);
    return resultUnits.filter(item => Math.abs(item.dpnt) < 0.1);
  }

  // If no results will be returned that are within the 10% margin,
  // return the best 3 results
  resultUnits.sort((a, b) => Math.abs(a.diff) - Math.abs(b.diff));
  return resultUnits.slice(0,3);
};
