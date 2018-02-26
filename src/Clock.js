class Clock {
  day(daysAdjustment = 0) {
    const today = new Date();
    today.setDate(today.getDate() - daysAdjustment);
    today.setHours(0, 0, 0, 0);
    return today;
  }

  time() {
    return new Date();
  }

  hour() {
    const today = new Date();
    today.setMinutes(0, 0, 0);
    return today;
  }
}

module.exports = Clock;
