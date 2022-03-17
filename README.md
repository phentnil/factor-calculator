# Factor Calculator

[![CodeQL](https://github.com/phentnil/factor-calculator/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/phentnil/factor-calculator/actions/workflows/codeql-analysis.yml)

Because of the nature of production of bleeding factor product medications, the exact unit amount in each vial will vary. Usually each factor product has certain unit ranges which have some degree of variability. We take unit amounts available into account to calculate which combinations can make up dose amounts within ±10% of the ordered dose.

Using a list of available vials and their specific unit values, we want to calculate the most ideal dose as close to the ordered dose as possible. The allowable error margin from the ordered dose is > -10% of the ordered dose and < +10% of the ordered dose. If results are not found within this margin, it is still helpful to note the closest/best result as the pharmacist will have to contact the doctor to obtain the necessary approval for that dose.

## Example case

Ordered dose is 3000 units

- Minimum dose > 2700
- Maximum dose < 3300

### Units available

| Units | Quantity |
| ----- | -------- |
| 533   | 4        |
| 565   | 2        |
| 1097  | 4        |
| 1155  | 2        |

### Possible combinations

| Unit combination | Sum   | Difference | Variance |
| ---------------- | ----- | ---------- | -------- |
| 1155, 1155, 565  | 2,875 | -125       | -4.2%    |
| 1097, 1097, 1097 | 3,291 | 291        | +9.7%    |

## Getting Started

Clone this repository with

```sh
git clone https://github.com/phentnil/factor-calculator.git
cd factor-calculator
```

Build the project with

```sh
npm ci
npm run build
```

## Contribution

See [contributing.md](/contributing.md)
