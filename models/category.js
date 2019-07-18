import {
  get
} from '@/services/http/axios'

class Category {
  // 获取所有标签
  async getCategories() {
    const res = await get('v1/blog/category/categories')
    return res
  }

  // 获取标签详情
  async getCategory(id) {
    const res = await get('v1/blog/category', {
      id
    })
    return res
  }
}

export default new Category()
