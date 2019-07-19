
import author from '../models/author'
import article from '../models/article'
import category from '../models/category'

export const state = () => ({
  authors: [],
  categories: [],
  articles: [],
  loading: false,
  total: 0
})

export const mutations = {
  setAuthorsAndCategories(state, { authors, categories }) {
    state.authors = authors
    state.categories = categories
  },

  setLoading(state, loading = false) {
    state.loading = loading
  },

  setArticles(state, { articles, total }) {
    state.articles = articles
    state.total = total
  }
}

export const actions = {
  async getSearchData({ commit }) {
    try {
      const authors = await author.getAuthors()
      const categories = await category.getCategories()
      commit('setAuthorsAndCategories', { authors, categories })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async searchArticles({ commit }, params) {
    try {
      commit('setLoading', true)
      const { articles, total } = await article.searchArticles(params)
      commit('setArticles', { articles, total })
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
