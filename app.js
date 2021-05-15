process.on("uncaughtException", function (err) {
  console.error("There was an uncaught error!\n", err);
  process.exit(1);
});
var search = require("./src/search");

function resultPrint(result) {
  var sign = result.difference > 0 ? "+" : "-";
  var diff = Math.abs(result.difference).toPrecision(4);
  var difp = Math.abs(result.differencePercent * 100).toPrecision(4);
  return `Using target ${result.target}, a resulting sum of ${
    result.sum
  } uses the following units:\n${result.units.join(
    ", "
  )}\nDifference of ${sign}${diff} (${sign}${difp}%)\n`;
}
function optionPrint(result) {
  var sign = "-";
  var diff = Math.abs(result.difference).toPrecision(4);
  var difp = Math.abs(result.differencePercent * 100).toPrecision(4);
  return `One partial result for target ${result.target} contains a sum of ${
    result.sum
  } using the following units:\n${result.units.join(
    ", "
  )}\nThis partial result has a difference of ${sign}${diff} (${sign}${difp}%)\n`;
}

/* var sort = {
  byScore: function (a, b) {
    return b.score - a.score;
  },
  byVCount: function (a, b) {
    return a.vCount - b.vCount;
  },
  byDiff: function (a, b) {
    return Math.abs(a.diff) - Math.abs(b.diff);
  },
}; */
var args = require("minimist")(process.argv.slice(2));
var target = args["target"];
if ("undefined" === typeof target) {
  target = Math.floor(Math.random() * 5000) + 1;
  console.log(`target: ${target}\n`);
}
if ("number" === typeof target) {
  var results = search(target);
  var inRangeResults = [];
  for (var result in results) {
    if (Math.abs(results[result].differencePercent) < 0.1) {
      inRangeResults.push(JSON.parse(JSON.stringify(results[result])));
    }
  }
  var lowerResults = [];
  for (var i = 0; i < results.length; i++) {
    if (results[i].differencePercent <= -0.1) {
      lowerResults.push(results[i]);
    }
  }
  for (var i = 0; i < inRangeResults.length; i++) {
    console.log(resultPrint(inRangeResults[i]));
  }
  for (var i = 0; i < lowerResults.length; i++) {
    console.log(optionPrint(lowerResults[i]));
  }
  // TODO: #20 find combinations of lowerResults if inRangeResults is empty...
  //console.log(JSON.stringify(results));
  return;
}
//console.log(`Not sure what the input is.\n${args["target"]}`);
