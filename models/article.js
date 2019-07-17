import {
  get,
  put
} from '../services/http/axios'

class Article {
  // 获取所有文章
  async getArticles(params = {}) {
    let query = {
      categoryId: params.categoryId ? params.categoryId : 0,
      authorId: params.authorId ? params.authorId : 0,
      tagId: params.tagId ? params.tagId : 0,
      page: params.page ? params.page : 0
    }
    if (params.search) {
      query.search = params.search
    }
    const res = await get('v1/blog/article/blog/articles', query)
    return res
  }

  // 获取所有精选文章
  async getStarArticles() {
    const res = await get('v1/blog/article/star/articles')
    return res
  }

  // 获取历史归档
  async getArchive() {
    const res = await get('v1/blog/article/archive')
    return res
  }

  // 获取某篇文章详情
  async getArticleDetail(query) {
    const res = await get('v1/blog/article', query)
    return res
  }

  // 获取这篇文章下的所有评论
  async getComments(query) {
    const res = await get('v1/blog/article/get/comment', query)
    return res
  }

  // 点赞文章
  async likeArticle(id) {
    const res = await put('v1/blog/article/like', {id})
    return res
  }

  // 搜索文章
  async searchArticles(params) {
    let query = {
      page: params.page ? params.page : 0,
      search: params.search
    }
    const res = await get('v1/blog/article/search/articles', query)
    return res
  }
}

export default new Article()
