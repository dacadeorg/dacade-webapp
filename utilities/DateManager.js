import {
  formatDistance,
  millisecondsToMinutes,
  formatDuration,
  format as dateFormatter,
} from 'date-fns'
import { es, enUS } from 'date-fns/locale'

function getLocale(locale) {
  return locale === 'es' ? es : enUS
}
export default class DateManager {
  static fromNow(date) {
    return formatDistance(new Date(date), new Date(), {
      addSuffix: true,
    })
  }

  static millisecondsToMinutes(milliseconds) {
    return millisecondsToMinutes(milliseconds)
  }

  static humanize(milliseconds, locale = 'en') {
    return formatDuration(
      {
        minutes: this.millisecondsToMinutes(milliseconds),
      },
      {
        locale: getLocale(locale),
      }
    )
  }

  static format(date, format, locale = 'en') {
    const dateParsed = date instanceof Date ? date : new Date(date)
    return dateFormatter(dateParsed, format, {
      locale: getLocale(locale),
    })
  }
}
