import article from '../models/article'
import comment from '../models/comment'
import Utils from '../services/utils/util'
import marked from '../plugins/marked'

export const state = () => ({
  // 文章列表
  articles: [],
  total: 0,

  // 归档
  starArticles: [],
  archive: [],
  archiveTotal: 0,

  loading: false,

  // 详情
  article: null,
  comments: []
})

export const mutations = {
  setHomeArticles(state, { articles, total, starArticles }) {
    state.articles = articles
    state.total = total
    state.starArticles = starArticles
  },

  setMoreArticles(state, { articles }) {
    state.articles = state.articles.concat(articles)
  },

  setLoading(state, loading = false) {
    state.loading = loading
  },

  setArchive(state, { archive, total }) {
    state.archive = archive
    state.archiveTotal = total
  },

  setComments(state, comments) {
    comments.forEach(v => {
      v.content = marked(v.content)
      if (v.parent_id !== 0) {
        const reply = comments.find(target => target.id === v.parent_id)
        if (reply) {
          v.replyName = reply.nickname
          v.replyContent = marked(reply.content)
        } else {
          v.replyName = ''
          v.replyContent = '该评论已被删除'
        }
      }
    })
    state.comments = comments
  },

  setArticleDetail(state, article) {
    state.article = article
  },

  setLikeComment(state, id) {
    state.comments.forEach(v => {
      if (v.id === id) {
        v.like ++
      }
    })
  }
}

export const actions = {
  // 获取首页文章列表
  async getHomeArticles({ commit }, params) {
    try {
      const { articles, total } = await article.getArticles(params)
      const starArticles = await article.getStarArticles()
      commit('setHomeArticles', { articles, total, starArticles })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getMoreArticles({ commit }, params) {
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

      function format(month, day) {
        return month.toString().padStart(2, '0') + '.' + day.padStart(2, '0')
      }

      const total = res.length
      let archive = []
      // 按年份月份重新组合
      let curYear = ''
      let curMonth = 0
      let yearIndex = -1
      let monthIndex = 0
      res.forEach(v => {
        let dateArr = v.created_date.split('-')
        let year = dateArr[0]
        let month = parseInt(dateArr[1])
        let time = dateArr[2].split(' ')[0]
        if (year === curYear) {
          if (month === curMonth) {
            v.created_date = format(month, time)
            archive[yearIndex].monthList[monthIndex].articles.push(v)
          } else {
            v.created_date = format(month, time)
            archive[yearIndex].monthList.push({
              month,
              articles: [v]
            })
            monthIndex++
            curMonth = month
          }
        } else {
          v.created_date = format(month, time)
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
      commit('setArchive', { archive, total })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getComments({ commit }, params) {
    try {
      const comments = await comment.getComments(params)
      commit('setComments', comments)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async getArticleDetail({ commit }, params) {
    try {
      const result = await article.getArticleDetail(params)
      commit('setArticleDetail', result)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },

  async likeArticle(_, id) {
    return await article.likeArticle(id)
  },

  async likeComment({ commit}, id) {
    const res = await comment.likeComment(id)
    if (res.errorCode === 0) {
      commit('setLikeComment', id)
      return res
    }
  },

  async createComment(_, params) {
    return await comment.createComment(params)
  },

  async replyComment(_, params) {
    return await comment.replyComment(params)
  }
}
