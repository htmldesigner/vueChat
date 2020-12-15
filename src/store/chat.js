import api from "../api/api";
import axios from "axios";

export default {
 state: {
  rooms: null,
  roomMessage: null
 },

 mutations: {
   SET_ROOMS(state, payload){
    state.rooms = payload
   },
  SET_MESSAGE(state, payload){
    state.roomMessage = payload
   }
 },

 actions: {
  async getRooms({commit}) {
   commit('clearError')
   commit('setLoading', true)
   try {
    const response = await api.getRooms()
     commit('SET_ROOMS', response.data)
    commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    commit('setError', error)
    throw error
   }
  },


  async getMessage({commit}, id) {
   commit('clearError')
   commit('setLoading', true)
   try {
    const response = await api.getMessage(id)
    commit('SET_MESSAGE', response.data)
    commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    commit('setError', error.response.data.error)
   }
  },


  async sendMessage({commit}, param) {
   commit('clearError')
   commit('setLoading', true)
   try {
    await api.sendMessage(param)
    commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    commit('setError', error)
    throw error
   }
  }


 },
 getters: {
  getRooms(state) {
   return state.rooms
  },
  getRoomMessage(state){
   return state.roomMessage
  }
 }
}
