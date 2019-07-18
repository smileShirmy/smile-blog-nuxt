import {
  get
} from '@/services/http/axios'

class Author {
  // 获取所有作者
  async getAuthors() {
    const res = await get('v1/blog/author/authors')
    return res
  }

  async getAuthorDetail(id) {
    const res = await get('v1/blog/author/detail', {
      id
    })
    return res
  }
}

export default new Author()
