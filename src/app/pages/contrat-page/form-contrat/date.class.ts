export class DateStuff {

  constructor() {}

  isLeapYearConfig(year: any) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  getDaysInMonthConfig(year: any, month: any) {
    return [
      31,
      this.isLeapYearConfig(year) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][month];
  }

  isLeapYear(date: Date) {
    return this.isLeapYearConfig(date.getFullYear());
  }

  getDaysInMonth(date: Date) {
    return this.getDaysInMonthConfig(date.getFullYear(), date.getMonth());
  }

  addMonths(date: Date, value: number) {
    var n = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + value);
    date.setDate(Math.min(n, this.getDaysInMonth(date)));
    return date;
  }
}

var myDate = new Date("01/31/2012");
// var result1 = myDate.addMonths(1);

// var myDate2 = new Date("01/31/2011");
// var result2 = myDate2.addMonths(1);
