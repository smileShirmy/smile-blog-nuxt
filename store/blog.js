import blog from '../models/blog'

export const state = () => ({
  friends: [],
})

export const mutations = {
  setFriends(state, friends) {
    state.friends = friends
  }
}

export const actions = {
  async getFriends({ commit }) {
    try {
      const friends = await blog.getFriends()
      commit('setFriends', friends)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
