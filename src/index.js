const { search } = require("./search");
const { Result } = require("./Result");
const {
  MAX_UNIT_VALUE,
  LOW_PART,
  HIGH_PART,
  LOW_THRESHOLD,
  HIGH_THRESHOLD,
} = require("./constants");
const factorTable = document.getElementById("factorResults");
const targetInput = document.getElementById("newTargetInput");
const targetHead = document.getElementById("targetValue");
const minValueElement = document.getElementById("minValue");
const maxValueElement = document.getElementById("maxValue");
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
/**
 * @type {Result[]}
 */
var results;
var target = parseInt(targetInput.value, 10);

const reloadResults = () => {
  target = parseInt(targetInput.value, 10);
  results = search(target);
  targetHead.textContent = target;
  console.log(LOW_THRESHOLD, HIGH_THRESHOLD);
  minValueElement.textContent = Math.ceil(target * LOW_PART);
  maxValueElement.textContent = Math.floor(target * HIGH_PART);
  factorTable.innerHTML = "";
  const outOfRangeResults = results.filter(
    (res) => res.differencePercent <= -0.1
  );
  for (let i = 0; i < outOfRangeResults.length; i++) {
    for (let j = i + 1; j < outOfRangeResults.length; j++) {
      if (i === j) continue;
      let sum = outOfRangeResults[i].sum + outOfRangeResults[j].sum;
      let diff = target - sum;
      let differencePercent = diff / target;
      if (differencePercent < 0.1 && differencePercent > -0.1) {
        results.push(
          new Result(target, [
            ...outOfRangeResults[i].units,
            ...outOfRangeResults[j].units,
          ])
        );
      }
    }
  }
  results = results.filter((res) => res.differencePercent < 0.1);
  results = results.filter((value, index, array) => {
    let valueStringified = JSON.stringify(value);
    for (let i = index + 1; i < array.length; i++) {
      if (i === index) continue;
      if (JSON.stringify(array[i]) === valueStringified) {
        return false;
      }
    }
    return true;
  });
  results.sort((ma, mb) => mb.score - ma.score);
  const inRangeResults = results.filter(
    (res) => res.differencePercent > -0.1 && res.sum <= MAX_UNIT_VALUE
  );
  /**
   * @type {Result[]}
   */
  let resultsToShow;
  let inRange = true;
  if (inRangeResults.length < 1) {
    // Select out-of-range results to show
    resultsToShow = JSON.parse(JSON.stringify(outOfRangeResults));
    inRange = false;
    resultsInRange.textContent = 0;
  } else {
    // Select in-range results to show
    resultsToShow = JSON.parse(JSON.stringify(inRangeResults));
  }
  /**@type {Result[]} */
  const resultsPerQuantity = [];
  resultsToShow.forEach((result) => {
    let { count } = result;
    if (resultsPerQuantity.every((res) => res.count !== count)) {
      resultsPerQuantity.push(result);
    }
  });
  if (inRange) {
    resultsInRange.textContent = resultsPerQuantity.length;
  }
  resultsPerQuantity.forEach((result) => {
    const row = tableRow.cloneNode();
    const sumCell = tableCell.cloneNode();
    const diffCell = tableCell.cloneNode();
    const vialCountCell = tableCell.cloneNode();
    const unitsCell = tableCell.cloneNode();

    sumCell.textContent = result.sum;
    diffCell.textContent = `${result.difference} (${(
      result.differencePercent * 100
    ).toPrecision(3)}%)`;
    vialCountCell.textContent = result.units.length;
    unitsCell.textContent = result.units.join(", ");
    row.appendChild(sumCell);
    row.appendChild(diffCell);
    row.appendChild(vialCountCell);
    row.appendChild(unitsCell);
    factorTable.appendChild(row);
  });
};
targetInput.addEventListener("keydown", (event) => {
  if (!allowedKeys.includes(event.key) && event.key.match(/\d+/gi) === null) {
    event.preventDefault();
    console.log(event);
    console.log(event.key);
  }
});
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
