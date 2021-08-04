import {
  formatDistance,
  millisecondsToMinutes,
  formatDuration,
  format as dateFormatter,
} from 'date-fns'

export default class DateManager {
  static fromNow(date) {
    return formatDistance(new Date(date), new Date(), {
      addSuffix: true,
    })
  }

  static millisecondsToMinutes(milliseconds) {
    return millisecondsToMinutes(milliseconds)
  }

  static humanize(milliseconds) {
    return formatDuration({
      minutes: this.millisecondsToMinutes(milliseconds),
    })
  }

  static format(date, format) {
    const dateParsed = date instanceof Date ? date : new Date(date)
    return dateFormatter(dateParsed, format)
  }
}
