const MAX_UNIT_VALUE = 5000;
const LOW_PART = 0.9;
const HIGH_PART = 1.1;
const LOW_THRESHOLD = Math.round((1 - HIGH_PART) * 10) / 10;
const HIGH_THRESHOLD = Math.round((1 - LOW_PART) * 10) / 10;
module.exports = {
  MAX_UNIT_VALUE,
  LOW_PART,
  HIGH_PART,
  LOW_THRESHOLD,
  HIGH_THRESHOLD,
};
