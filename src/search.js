const units = require('./units');
const sorting = require('./sorting');

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

  let resultUnits = units.map(item => {
    let q = t / item.unit; // quotient
    item.iq = Math.round(q); // integer quotient
    if (item.iq > item.quantity) {item.iq = item.quantity;}
    item.diff = (item.unit * item.iq) - t;
    item.dpnt = item.diff / t;
    return item;
  });
  resultUnits.sort(sorting);

  // Using the .some() array method, we want to check that there is at least
  // one result within the 10% margin that will be returned
  if (resultUnits.some(item=>Math.abs(item.dpnt) < 0.1)) {
    return resultUnits.filter(item => Math.abs(item.dpnt) < 0.1);
  }

  // If no results will be returned that are within the 10% margin,
  // return the best 3 results
  return resultUnits.slice(0,3);
};
