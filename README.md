# Factor Calculator
Using a list of available vials and their specific unit values, we want to calculate the most ideal dose as close to the ordered dose as possible. The allowable error margin from the ordered dose is ±10%.

![CI](https://github.com/phentnil/factor-calculator/workflows/CI/badge.svg)

## Units available:
Units | Quantity
------|---------
533 | 4
535 | 3
536 | 1
540 | 6
554 | 1
565 | 2
576 | 2
1097 | 4
1100 | 4
1155 | 2

## Example 1:
* Ordered dose (target): 3000
  * Minimum dose: 2700
  * Maximum dose: 3300
  * A few potential combinations:
    * [1155, 1155, 576] Sum: 2886; Variance: -3.8%
    * [1097, 1097, 1097] Sum: 3291; Variance: +9.7%
