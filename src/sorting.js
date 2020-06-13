module.exports = (a, b) => {
  /**
   * In this module, we are sorting unit objects by quantity used (integer
   * quotient), Ascending Order; then we are sorting any unit objects of equal
   * quantity used by difference from the target.
   * This method will be convenient for the user to
   */
  if (a.iq === b.iq) {
    return Math.abs(a.diff) - Math.abs(b.diff);
  }
  return a.iq - b.iq;
};
