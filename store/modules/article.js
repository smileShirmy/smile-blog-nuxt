import article from '../../models/article'
import Utils from '../../services/utils/util'

export const state = () => ({
  articles: [],
  total: 0,
  starArticles: [],
  loading: false,
  archive: []
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
  },

  setArchive(state, archive) {
    state.archive = archive
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
  },

  async getArchive({ commit }) {
    try {
      let res = await article.getArchive()
      res.forEach(v => {
        v.created_date = Utils.timestampToTime(v.created_date)
      })

      let archive = []
      // 按年份月份重新组合
      let curYear = ''
      let curMonth = 0
      let yearIndex = -1
      let monthIndex = 0
      res.forEach(v => {
        let year = v.created_date.split('-')[0]
        let month = parseInt(v.created_date.split('-')[1])
        if (year === curYear) {
          if (month === curMonth) {
            archive[yearIndex].monthList[monthIndex].articles.push(v)
          } else {
            archive[yearIndex].monthList.push({
              month,
              articles: [v]
            })
            monthIndex++
            curMonth = month
          }
        } else {
          archive.push({
            year,
            monthList: [{
              month,
              articles: [v]
            }]
          })
          yearIndex++
          monthIndex = 0
          curMonth = month
          curYear = year
        }
      })
      commit('setArchive', archive)
    } catch (e) {
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
