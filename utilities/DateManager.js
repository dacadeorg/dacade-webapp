import {
  formatDistance,
  millisecondsToMinutes,
  formatDuration,
  format as dateFormatter,
  // formatISO9075 as formatterISO9075,
  intlFormat,
} from 'date-fns'
import { es, enUS, hr, bg, fr } from 'date-fns/locale'

function getLocale(locale) {
  switch (locale) {
    case 'es':
      return es
    case 'hr':
      return hr
    case 'bg':
      return bg
    case 'fr':
      return fr
    default:
      return enUS
  }
}
export default class DateManager {
  static getDate(date) {
    return date instanceof Date ? date : new Date(date)
  }

  static fromNow(date, locale = 'en') {
    return formatDistance(this.getDate(date), new Date(), {
      addSuffix: true,
      locale: getLocale(locale),
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
    return dateFormatter(this.getDate(date), format, {
      locale: getLocale(locale),
    })
  }

  static intlFormat(
    date,
    locale = 'en',
    options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    }
  ) {
    return intlFormat(this.getDate(date), options, {
      locale: getLocale(locale).code,
    })
  }

  static getTimezone(locale = 'en') {
    return intlFormat(
      new Date(),
      {
        timeZoneName: 'short',
      },
      {
        locale: getLocale(locale).code,
      }
    )
  }
}
