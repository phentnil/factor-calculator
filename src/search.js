var units = JSON.parse(require("./units"));
var Result = require("./result");
function search(target) {
  if ("number" !== typeof target) {
    throw "Target not specified (must be a number)";
  }
  var uniqueUnits = units
    .flatMap(function (unit) {
      return new Result(target, [unit.unit], unit.unit);
    })
    .sort(function (a, b) {
      return a.sum - b.sum;
    });
  var unitMultiples = units
    .flatMap(function (unit) {
      var multiples = [];
      for (var i = 2; i <= unit.quantity; i++) {
        var mult = [];
        for (var j = 0; j < i; j++) {
          mult.push(unit.unit);
        }
        multiples.push(new Result(target, mult, i * unit.unit));
      }
      return multiples;
    })
    .sort(function (a, b) {
      return a.sum - b.sum;
    });
  var results = [...uniqueUnits, ...unitMultiples].sort(function (a, b) {
    return b.score - a.score;
  });
  return results;
}

module.exports = search;
