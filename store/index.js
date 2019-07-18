import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import article from './modules/article'
import tag from './modules/tag'
import about from './modules/about'
import message from './modules/message'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    app,
    article,
    tag,
    about,
    message
  }
})

export default store
