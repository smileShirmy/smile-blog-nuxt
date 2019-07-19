import tag from '../models/tag'
import category from '../models/category'
import article from '../models/article'

export const state = () => ({
  tags: [],
  categories: [],

  // 标签 或 分类 详情
  loading: false,
  articles: [],
  total: 0,

  category: {}
})

export const mutations = {
  setTagAndCategories(state, { tags, categories }) {
    state.tags = tags
    state.categories = categories
  },

  setArticles(state, { articles, total }) {
    state.articles = articles
    state.total = total
  },

  setLoading(state, loading = false) {
    state.loading = loading
  },

  setCategory(state, category) {
    state.category = category
  },

  setMoreArticles(state, { articles }) {
    state.articles = state.articles.concat(articles)
  }
}

export const actions = {
  async getTagAndCategories({ commit }) {
    try {
      const tags = await tag.getTags()
      const categories = await category.getCategories()
      commit('setTagAndCategories', { tags, categories })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getMoreArticles({ commit }, params) {
    try {
      commit('setLoading', true)
      const { articles } = await article.getArticles(params)
      commit('setMoreArticles', { articles })
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getArticles({ commit }, params) {
    try {
      const { articles, total } = await article.getArticles(params)
      commit('setArticles', { articles, total })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getCategory({ commit }, id) {
    try {
      const result = await category.getCategory(id)
      commit('setCategory', result)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
