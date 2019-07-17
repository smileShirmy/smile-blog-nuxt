import article from '../../models/article'

export const state = () => ({
  articles: []
})

export const mutations = {

}

export const actions = {
  // 获取文章列表
  async getArticles({ commit, state }, params) {
    const { articles, total } = await article.getArticles(params)
    console.log({articles, total})
    // console.log(articles)
    // commit('FETCH_ART');
    // const res = await service.getArts({
    //   ...data,
    //   page_size: data.page_size || 6
    // });
    // if (res && res.code === 1) {
    //   if (!process.client) {
    //     commit('SET_ART_SUCCESS', res.result);
    //   } else
    //     setTimeout(() => {
    //       commit('SET_ART_SUCCESS', res.result);
    //     }, 200);
    // } else commit('SET_ART_FILE');
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
