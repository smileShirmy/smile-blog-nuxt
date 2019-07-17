import Utils from '../utils/util'

export default {
  filterTime(date, formats) {
    if (!date) {
      return ''
    }
    return Utils.timestampToTime(date, formats)
  }
}
