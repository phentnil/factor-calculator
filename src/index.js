const { search } = require("./search");
const { Result } = require("./Result");
const factorTable = document.getElementById("factorResults");
const targetInput = document.getElementById("newTargetInput");
const targetHead = document.getElementById("targetValue");
const resultsInRange = document.getElementById("resultsInRange");
const tableRow = document.createElement("tr");
const tableCell = document.createElement("td");

var allowedKeys = [
  "Backspace",
  "Alt",
  "Control",
  "Shift",
  "End",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Delete",
  "Home",
  "PageUp",
  "PageDown",
  "Insert",
  "Tab",
  "Escape",
];
var results;
var target = targetInput.value;
targetInput.addEventListener("keydown", (event) => {
  if (!allowedKeys.includes(event.key) && event.key.match(/\d+/gi) === null) {
    event.preventDefault();
    console.log(event);
    console.log(event.key);
  }
});
const reloadResults = () => {
  target = parseInt(targetInput.value, 10);
  results = search(target);
  targetHead.textContent = target;
  factorTable.innerHTML = "";
  const outOfRangeResults = results.filter((res) => res.differencePercent <= -0.1);
  for (let i = 0; i < outOfRangeResults.length; i++) {
    for (let j = i + 1; j < outOfRangeResults.length; j++) {
      if (i === j) continue;
      let sum = outOfRangeResults[i].sum + outOfRangeResults[j].sum;
      let diff = target - sum;
      let differencePercent = diff / target;
      if (differencePercent < 0.1 && differencePercent > -0.1) {
        results.push(new Result(target, [...outOfRangeResults[i].units, ...outOfRangeResults[j].units]));
      }
    }
  }
  results.sort((ma, mb) => mb.score - ma.score);
  const inRangeResults = results.filter((res) => res.differencePercent > -0.1);
  resultsInRange.textContent = inRangeResults.length;
  inRangeResults.forEach((result) => {
    const row = tableRow.cloneNode();
    const sumCell = tableCell.cloneNode();
    const diffCell = tableCell.cloneNode();
    const unitsCell = tableCell.cloneNode();

    sumCell.textContent = result.sum;
    diffCell.textContent = `${result.difference} (${(
      result.differencePercent * 100
    ).toPrecision(3)}%)`;
    unitsCell.textContent = result.units.join(", ");
    row.appendChild(sumCell);
    row.appendChild(diffCell);
    row.appendChild(unitsCell);
    factorTable.appendChild(row);
  });
};
targetInput.addEventListener("keyup", (event) => {
  if (event.target.value < 400 || event.target.value > 5000) {
    event.preventDefault();
    return false;
  }
  reloadResults();
});
targetInput.addEventListener("change", (event) => {
  if (event.target.value < 400 || event.target.value > 5000) {
    event.preventDefault();
    return false;
  }
  reloadResults();
});

reloadResults();
