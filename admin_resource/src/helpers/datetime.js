import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

export const fromNow = (time) => {
  return moment(time, 'YYYY-MM-DD HH:mm:ss').fromNow()
}

export const calendar = (time, format) => {
  return moment(time, 'YYYY-MM-DD HH:mm:ss').calendar(null, format)
}

export const format = (time, format) => {
  return moment(time, 'YYYY-MM-DD HH:mm:ss').format(format)
}

export const today = (format) => {
  return moment().format(format)
}

export const todayMorning = (date) => {
    return format(date, 'DD/MM/YYYY')
}

export const tonight = (date) => {
    return format(date, 'DD/MM/YYYY')
}

export const yesterMorning = (date) => {
    date.setDate(date.getDate() - 1)
    return format(date, 'DD/MM/YYYY')
}

export const lastNight = (date) => {
    date.setDate(date.getDate() - 1)
    return format(date, 'DD/MM/YYYY')
}

export const startThisWeek = (date) => {
    date.setDate(date.getDate() - date.getDay())
    return format(date, 'DD/MM/YYYY')
}

export const endThisWeek = (date) => {
    date.setDate(date.getDate() + (6 - date.getDay()))
    return format(date, 'DD/MM/YYYY')
}

export const startLastWeek = (date) => {
    date.setDate(date.getDate() - date.getDay())
    return format(date, 'DD/MM/YYYY')
}

export const endLastWeek = (date) => {
    date.setDate(date.getDate() + (6 - date.getDay()))
    return format(date, 'DD/MM/YYYY')
}

export const startThisMonth = (date) => {
    date.setDate(1)
    return format(date, 'DD/MM/YYYY')
}

export const endThisMonth = (date) => {
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    return format(date, 'DD/MM/YYYY')
}

export const startLastMonth = (date) => {
    date.setMonth(date.getMonth() - 1)
    date.setDate(1)
    return format(date, 'DD/MM/YYYY')
}

export const endLastMonth = (date) => {
    date.setDate(0)
    return format(date, 'DD/MM/YYYY')
}

export const startThisYear = (date) => {
    date.setMonth(0)
    date.setDate(1)
    return format(date, 'DD/MM/YYYY')
}

export const endThisYear = (date) => {
    date.setMonth(12)
    date.setDate(0)
    return format(date, 'DD/MM/YYYY')
}

export const startLastYear = (date) => {
    date.setYear(date.getFullYear() - 1)
    date.setMonth(0)
    date.setDate(1)
    return format(date, 'DD/MM/YYYY')
}

export const endLastYear = (date) => {
    date.setYear(date.getFullYear() - 1)
    date.setMonth(12)
    date.setDate(0)
    return format(date, 'DD/MM/YYYY')
}
