const units = JSON.parse(require('./units'));
const Result = require("./result");
module.exports = (t) => {
  if ("number" !== typeof t) {
    throw "Target not specified (must be a number)!";
  } else if ((t < 500) || (t > 5000)) {
    throw "Target out of range!";
  }
  let results = [];
  let unitMultiples = [];
  for (let i = 0, l = units.length; i < l; i++) {
    for (let u = units[i].unit, q = units[i].quantity; q > 0; q--) {
      let total = u * q;
      // Break if the multiple goes over 5000 or over 110% of the target
      if (total > 5000 || total >= (t * 1.1)) {continue;}
      let mtp = {};
      mtp.base = u;
      mtp.quantity = q;
      mtp.total = total;

      // Now it will either be a multiple to be considered in further combinations or it is a result as any other combinations will cause the sum to be > 110% of the target
      if (total <= (t * 0.9)) {
        // Since the total is still good, we want to create a multiple to be considered
        unitMultiples.push(mtp);
      } else {
        let mtpUnits = [];
        mtpUnits.push(mtp);
        results.push(new Result(t, mtpUnits, total));
      }
    }
  }

  // After building the multiples, we can then search for all combinations that result in a value which could be within range
  // Remember to check for multiple.base such that one object does not contain the same base value

  let umLength = unitMultiples.length;
  for (let i = 0; i < umLength; i++) {
    let umResult = {};
    umResult.units = [];
    umResult.sum = 0;
    for (let j = i + 1; j < umLength; j++) {
      if (umResult.units.length > 0) {
        if (umResult.units.some(item => {return item.base === this.base;}, unitMultiples[j])) {continue;}
      }
      let sum = umResult.sum + unitMultiples[j].total;
      if (sum > 5000 || sum >= t * 1.1) {break;}
      umResult.units.push(unitMultiples[j]);
      umResult.sum += unitMultiples[j].total;
      if (sum > t * 0.9) {break;}
    }
    if (umResult.units.length > 0 && umResult.sum > t * 0.9) {
      results.push(new Result(t, umResult.units, umResult.sum));
    }
  }

  return results;
};
