import {
  get
} from '@/services/http/axios'

class Blog {
  // 获取所有友情链接
  async getFriends() {
    const res = await get('v1/blog/blog/friend/friends')
    return res
  }
}

export default new Blog()
