import {
  get,
  post
} from '@/services/http/axios'

class Message {
  // 获取所有留言
  async getMessages(params) {
    const res = await get('v1/blog/message/messages', params)
    return res
  }

  // 新增一条留言
  async createMessage(message) {
    const res = await post('v1/blog/message', message)
    return res
  }
}

export default new Message()
