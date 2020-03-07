"use strict";
// Sample units to work with
const units = [{unit: 516, qty: 1},{unit: 533, qty: 4},{unit: 535, qty: 3},{unit: 536, qty: 1},{unit: 554, qty: 1},{unit: 565, qty: 2},{unit: 576, qty: 6},{unit: 1089, qty: 2},{unit: 1097, qty: 8}];

// Variables which will be assigned to important DOM elements
var uForm, uTarget, output;

// Result class where all the values are stored to be displayed
class Result {
  constructor (target, sum, units, random) {
    this._target = target;
    let result = JSON.parse(JSON.stringify(units));
    result.sort((ia, ib) => ia - ib);
    let devInt = sum - target;
    let devPct = devInt / target;
    let score = (sum === target) ? 0 : Math.pow(2, result.length) + Math.abs(devPct * 100);
    this._sum = sum;
    this._devInt = devInt;
    this._devPct = devPct;
    this._score = score;
    this._units = JSON.parse(JSON.stringify(result));
    this._random = random;
  }
  get devInt () {
    return this._devInt;
  }
  get devPct () {
    return this._devPct;
  }
  get score () {
    return this._score;
  }
  get sum () {
    return this._sum;
  }
  get target () {
    return this._target;
  }
  get units () {
    return this._units;
  }
  get randomized () {
    return this._random;
  }
}

// Basic methods
const sortUnitsByDiff = (ia, ib) => Math.abs(ia.diff) - Math.abs(ib.diff);

// Main methods
const findTarget = target => {
  let randTarget = false;
  if ("number" !== typeof target) {
    target = Math.ceil(Math.random() * 4600) + 400;
  }
  const sumArray = [];
  let div, newTarget, sum = 0, nextUnit, unitsClone = JSON.parse(JSON.stringify(units));
  while (sum < (target * 0.9) && unitsClone.length) {
    newTarget = target - sum;
    for (let i = 0, l = unitsClone.length; i < l; i++) {
      div = newTarget / unitsClone[i].unit;
      unitsClone[i].diff = (div - Math.round(div));
    }
    unitsClone.sort(sortUnitsByDiff);
    if (unitsClone[0].qty > 1) {
      nextUnit = unitsClone[0].unit;
      unitsClone[0].qty -= 1;
    } else {
      if (unitsClone[0].qty < 1) {
        throw Error("Why is this quantity less than 1?", unitsClone[0]);
      }
      let removedUnit = unitsClone.shift();
      nextUnit = removedUnit.unit;
    }
    sumArray.push(nextUnit);
    sum += nextUnit;
  }
  return new Result(target, sum, sumArray, randTarget);
};

const genResult = result => {
  let out = "";
  if ("object" === typeof result && result instanceof Result) {
    let resGen = (result.randomized) ? "Random target unit" : "Target unit";
    let resPre = (result.devInt < 0) ? "" : "+";
    let resDev = resPre + result.devInt.toString() + " (" + resPre + (result.devPct * 100).toPrecision(4).toString() + " %)";
    if (Math.abs(result.devPct) >= 0.1) {
      resDev = "<strong title=\"Out of range!\" alt=\"Out of range\" class=\"error\">" + resDev + "</strong>";
    }
    out += "<ul><li><strong>" + resGen + "</strong>: " + result.target.toString() + "</li>";
    out += "<li>Closest result: " + result.sum.toString() + "</li>";
    out += "<li>Variance from target: " + resDev + "</li>";
    out += "<li>Units to use:<ul>";
    for (let i = 0, l = result.units.length; i < l; i++) {
      out += "<li>" + result.units[i].toString() + "</li>";
    }
    out += "</ul></li></ul>";
  } else if ("function" !== result) {
    out = "<strong>" + result.toString() + "</strong>";
  }
  output.innerHTML = out;
};
const init = () => {
	uForm = j("form");
  uTarget = j("#uTarget");
  output = j("#output");
  uForm.addEventListener("submit", formSubmit);
};
const j = selector => {
  if ("string" === typeof selector && selector.length) {
    let domResult = document.querySelectorAll(selector);
    if (domResult.length) {
      if (domResult.length > 1) {
        return domResult;
      } else {
        return domResult[0];
      }
    } else {
      return null;
    }
  } else {
    return undefined;
  }
};
const formSubmit = e => {
  let tVal = uTarget.value;
  let t = (tVal.length < 1) ? "" : parseInt(tVal);
  let r = findTarget(t);
  genResult(r);
  e.preventDefault();
  return false;
};
window.onload = init;