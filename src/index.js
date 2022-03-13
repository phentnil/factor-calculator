const { search } = require("./search");
const target = 3300;
const results = search(3300);

console.log(`Target: ${target}`);
console.log(
  `${"Sum".padStart(4, " ").padEnd(6, " ")}${"Diff"
    .padStart(5, " ")
    .padEnd(8, " ")}Units`
);
console.log(results.map((mult) => mult.simplePrint()).join("\n"));
