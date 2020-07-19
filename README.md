# Factor Calculator
Because of the nature of production of bleeding factor products, the specific unit amount in each vial can vary. Usually each factor product has certain unit ranges (KCentra has 500-unit ranges and 1000-unit ranges), so we need to be able to account for the different amounts that can make up dose amounts within ±10% of the ordered dose.

Using a list of available vials and their specific unit values, we want to calculate the most ideal dose as close to the ordered dose as possible. The allowable error margin from the ordered dose is > -10% of the ordered dose and < +10% of the ordered dose. If results are not found within this margin, it is still helpful to note the closest/best result as the pharmacist will have to contact the doctor who ordered the dose to verify that this deviation is acceptable to them.

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
  * Minimum dose: 2699
  * Maximum dose: 3299
  * A few potential combinations:
    * [1155, 1155, 576] Sum: 2886; Variance: -3.8%
    * [1097, 1097, 1097] Sum: 3291; Variance: +9.7%
