import api from "../api/api";
import axios from 'axios'

export default {
 state: {
  user: null,
  userBackground: null
 },
 mutations: {
  SET_USER(state, payload) {
   state.user = payload
  },

  SET_USER_BACKGROUND(state, payload) {
   state.userBackground = payload
  }
 },

 actions: {
  async loginUser({commit, dispatch}, payload) {
   commit('clearError')
   commit('setLoading', true)
   try {
    const response = await api.loginUser(payload)
    const token = await response.data.token
    const user = await response.data.user
    await localStorage.setItem('token', token)
    await localStorage.setItem('user', JSON.stringify(user))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    commit('SET_USER', user)
    commit('setLoading', false)
   } catch (error) {
    // localStorage.removeItem('token')
    // localStorage.removeItem('user')
    // delete axios.defaults.headers.common['Authorization']
    commit('setLoading', false)
    commit('setError', 'Неверный логин или пароль.')
    throw error
   }
  },

 async checkAuth({commit}) {
   try {
    const token = localStorage.getItem('token') || ''
    const user = JSON.parse(localStorage.getItem('user')) || null
    if (token?.length && user?.username?.length) {
     commit('SET_USER', user)
    }
   }catch (e) {
    commit('setLoading', false)
    commit('setError', 'Неверный логин или пароль.')
    throw error
   }
  },

  async getBackground({commit}) {
   try {
    const response = await api.getBackground()
    commit('SET_USER_BACKGROUND', response.data)
    console.log(response.data)
   }catch (e) {
    commit('setLoading', false)
    commit('setError')
    throw error
   }
  },



  logOut({commit}) {
   localStorage.removeItem('token')
   localStorage.removeItem('user')
   delete axios.defaults.headers.common['Token']
   commit('SET_USER', null)
  }
 },
 getters: {
  user(state) {
   return state.user
  },
  userBackground(state) {
   return state.userBackground
  },
  isUserLoggedIn(state) {
   return state.user !== null
  }
 }
}