import author from '../models/author'

export const state = () => ({
  authors: []
})

export const mutations = {
  setAuthors(state, authors) {
    state.authors = authors
  }
}

export const actions = {
  async getAuthors({ commit }) {
    try {
      const authors = await author.getAuthors()
      commit('setAuthors', authors)
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
