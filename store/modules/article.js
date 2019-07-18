import article from '../../models/article'

export const state = () => ({
  articles: [],
  total: 0,
  starArticles: [],
  loading: false
})

export const mutations = {
  setHomeArticles(state, { articles, total, starArticles }) {
    state.articles = articles
    state.total = total
    state.starArticles = starArticles
  },

  setMoreArticles(state, { articles, total}) {
    state.articles = state.articles.concat(articles)
    state.total = total
  },

  setLoading(state, loading = false) {
    state.loading = loading
  }
}

export const actions = {
  // 获取首页文章列表
  async getHomeArticles({ commit, state }, params) {
    try {
      const { articles, total } = await article.getArticles(params)
      const starArticles = await article.getStarArticles()
      commit('setHomeArticles', { articles, total, starArticles })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getMoreArticles({ commit, state }, params) {
    try {
      commit('setLoading', true)
      const { articles, total } = await article.getArticles(params)
      commit('setMoreArticles', { articles, total })
      commit('setLoading', false)
    } catch (e) {
      commit('setLoading', false)
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
