import tag from '../models/tag'
import category from '../models/category'

export const state = () => ({
  tags: [],
  categories: [],
})

export const mutations = {
  setTagAndCategories(state, { tags, categories }) {
    state.tags = tags
    state.categories = categories
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
