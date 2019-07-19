import {
  get
} from '@/services/http/axios'

class Category {
  // 获取所有分类
  async getCategories() {
    const res = await get('v1/blog/category/categories')
    return res
  }

  // 获取分类详情
  async getCategory(id) {
    const res = await get('v1/blog/category', {
      id
    })
    return res
  }
}

export default new Category()
