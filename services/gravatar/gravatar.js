import defaultAvatar from '@/assets/image/default.png'
import Utils from '../utils/util'
import gravatar from '@/plugins/gravatar'

/**
 * gravatar 头像服务
 */
export default (email) => {
  if (!email) {
    return defaultAvatar
  }
  if (!Utils.validateEmail(email)) {
    return defaultAvatar
  }
  return gravatar.url(email, {
    protocol: 'https'
  })
}
