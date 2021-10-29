import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listPokemon: [],
    favoritesPokemon: [],
    showModal: false
  },
  mutations: {
    sendListPokemon(state, val){
      state.listPokemon = val
    },
    sendFavoritesPokemon(state, val){
      state.favoritesPokemon = val
    },
    sendShowModal(state, val){
      state.showModal = val
    }
  },
  actions: {
    clearData({commit}){
    commit('sendListPokemon', null)
    commit('sendFavoritesPokemon', null)
    commit('sendShowModal', null)
    }
  }
})
