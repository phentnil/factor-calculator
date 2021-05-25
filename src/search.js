var units = JSON.parse(require("./units"));
var Result = require("./result");
function filterInRange(result) {
  return Math.abs(result.differencePercent) < 0.1 && result.sum <= 5000;
}
function filterLowerResults(result) {
  return result.differencePercent <= -0.1;
}
function deepCopy(array) {
  return JSON.parse(JSON.stringify(array));
}
function sortScoreDescending(a, b) {
  return b.score - a.score;
}
module.exports = function search(target) {
  if ("number" !== typeof target) {
    throw "Target not specified (must be a number)";
  }
  var uniqueUnits,
    unitMultiples,
    goodResults = [],
    mixedUnits = [];
  try {
    uniqueUnits = units.flatMap(function (unit) {
      return new Result(target, [unit.unit], unit.unit);
    });
    unitMultiples = units.flatMap(function (unit) {
      var multiples = [];
      for (var i = 2; i <= unit.quantity; i++) {
        var mult = [];
        for (var j = 0; j < i; j++) {
          mult.push(unit.unit);
        }
        multiples.push(new Result(target, mult, i * unit.unit));
      }
      return multiples;
    });
  } catch (error) {
    console.error(error);
  }
  goodResults.push(uniqueUnits.filter(filterInRange));
  goodResults.push(unitMultiples.filter(filterInRange));
  uniqueUnits = uniqueUnits.filter(filterLowerResults);
  unitMultiples = unitMultiples.filter(filterLowerResults);
  mixedUnits.push(uniqueUnits);
  mixedUnits.push(unitMultiples);
  mixedUnits = mixedUnits.flat();
  var mixedUnitsMixed = mixedUnits
    .map(function (result, index) {
      var newResults = [];
      for (var i = index + 1; i < mixedUnits.length; i++) {
        var tar = result.target;
        var newUnits = [];
        newUnits.push(result.units);
        newUnits.push(mixedUnits[i].units);
        newUnits = deepCopy(newUnits.flat());
        var sum = result.sum + mixedUnits[i].sum;
        var res = new Result(tar, newUnits, sum);
        newResults.push(res);
      }
      return newResults;
    })
    .flat();
  mixedUnits = deepCopy(mixedUnitsMixed);
  goodResults.push(deepCopy(mixedUnits).filter(filterInRange));
  mixedUnits = deepCopy(mixedUnits).filter(filterLowerResults);
  goodResults = deepCopy(goodResults).flat();
  uniqueUnits.sort(sortScoreDescending);
  unitMultiples.sort(sortScoreDescending);
  mixedUnits.sort(sortScoreDescending);
  goodResults.sort(sortScoreDescending);

  var resultToReturn = { target, goodResults };
  if (goodResults.length === 0) {
    resultToReturn.otherResults = deepCopy(mixedUnits);
  }
  return resultToReturn;
};
