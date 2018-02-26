class StubClock {
  constructor() {
    this.currentDay = new Date(2000, 1, 1);
  }
  day(daysAdjustment = 0) {
    const today = new Date(this.currentDay);
    today.setDate(today.getDate() + daysAdjustment);
    return today;
  }
  time() {
    return new Date(this.currentDay);
  }
  hour() {
    return new Date(this.currentDay);
  }
  setDay(day) {
    this.currentDay = day;
  }
  moveForwardDay(days = 1) {
    this.currentDay = new Date(
      this.currentDay.getTime() + 1000 * 60 * 60 * 24 * days
    );
    return this.currentDay;
  }
  moveForwardOneHour() {
    this.currentDay = new Date(this.currentDay.getTime() + 1000 * 60 * 60);
    return this.currentDay;
  }
}

module.exports = StubClock;
