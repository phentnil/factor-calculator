const search = require("./search");

const searchResults = (target) => {
  if (typeof target === "undefined") {
    return "";
  }
  var results;
  try {
    results = search(target);
    console.log(JSON.stringify(results));
  } catch (error) {
    console.error(error);
    return "";
  }
  var tResults = "";
  var { goodResults } = results;
  var { otherResults } = results;
  var resultsToDisplay = goodResults.length ? goodResults : otherResults;
  for (let i = 0, sl = resultsToDisplay.length; i < sl && i < 10; i++) {
    let sru = resultsToDisplay[i].units.join(", ");
    let sum = resultsToDisplay[i].sum;
    let sign = resultsToDisplay[i].difference < 0 ? "-" : "+";
    let diff = Math.abs(resultsToDisplay[i].difference).toPrecision(4);
    let difp = Math.abs(
      resultsToDisplay[i].differencePercent * 100
    ).toPrecision(4);
    tResults = `${tResults}
      <tr>
        <td>${sru}</td>
        <td>${sum}</td>
        <td>${sign}${Math.abs(diff)} (${sign}${Math.abs(difp)}%)</td>
      </tr>`;
  }
  return `
  <table>
    <thead>
      <tr>
        <th>Units to use:</th>
        <th>Result Sum</th>
        <th>Difference from Ordered dose</th>
      </tr>
    </thead>
    <tbody>
      ${tResults}
    </tbody>
  </table>`;
};
const html = (title, target) => {
  if ("number" === typeof target) {
    // Target upper constraint of 5000
    target = target > 5000 ? 5000 : target;
    // Target lower constraint of 1
    target = target < 1 ? 1 : target;
  }
  const sResults = searchResults(target);
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <style>
    * {text-align: center;}
    table {margin: 1em auto;}
    th,
    td {padding: 0.5em;}
    table,
    th,
    td {border: 1px solid black; border-collapse: collapse;}
    input[type=number] {border: 0; border-bottom: 1px solid black; width: 60px;}
  </style>
</head>
<body>
  <h1>${title}</h1>
  <form action="" method="GET">
    <div><label for="target">Ordered dose:</label></div>
    <div><input type="number" name="target" id="target" value="${
      typeof target === "undefined" ? 500 : target
    }" /> units</div>
    <div><em>Ordered dose must be less than or equal to 5,000 units.</em></div>
    <div><input type="submit" value="Search" /></div>
  </form>
  ${sResults}
</body>
</html>`;
};
module.exports = html;
