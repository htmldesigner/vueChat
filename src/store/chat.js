import api from "../api/api";
import axios from "axios";

export default {
 state: {
  rooms: null,
  roomMessage: null,
  recipients: null,
  can_finish: null,
  can_hold: null,
 },

 mutations: {
  SET_ROOMS(state, payload) {
   state.rooms = payload
  },
  SET_MESSAGE(state, payload) {
   state.roomMessage = payload
  },

  SET_RECIPIENTS(state, payload) {
   state.recipients = payload
  }
 },

 actions: {
  async getRooms({commit}) {
   commit('clearError')
   commit('setLoading', true)
   try {
    const response = await api.getRooms()
    if (response) {
     localStorage.removeItem('localRoom')
     localStorage.setItem('localRoom', JSON.stringify(response.data))
     commit('SET_ROOMS', response.data)
    }
    commit('setLoading', false)
   } catch (error) {
    //  localStorage.removeItem('token')
    //  localStorage.removeItem('user')
    // commit('SET_USER', null)
    commit('setLoading', false)
    commit('setError', error)
    throw error
   }
  },


  async createRoom({commit}, payload) {
   commit('clearError')
   commit('setLoading', true)
   try {
    await api.createRoom(payload)
    commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    commit('setError', error)
    throw error
   }
  },


  async getRecipients({commit}) {
   commit('clearError')
   commit('setLoading', true)
   try {
    const response = await api.getRecipients()
    commit('SET_RECIPIENTS', response.data)
    commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    commit('setError', error.response.data.error)
   }
  },


  async satStatus({commit}, param) {
   commit('clearError')
   commit('setLoading', true)
   try {
    console.log(param)
    if (param.type === 'hold') {
     const response = await api.setHoldStatus(param)
    }
    if (param.type === 'close') {
     const response = await api.setFinishStatus(param)
    }
    await commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    commit('setError', error.response?.data.error)
   }
  },


  async getMessage({commit, state}, id) {
   commit('clearError')
   commit('setLoading', true)
   try {
    const response = await api.getMessage(id)
    await commit('SET_MESSAGE', response.data)
    // if(response){
    //  await commit('SET_MESSAGE', response.data)
    //  // let localMessages = JSON.parse(localStorage.getItem('localMessages'))
    //  // console.log(localMessages)
    //  // localMessages.push(response.data)
    //  // localStorage.setItem('localMessages', JSON.stringify(localMessages))
    // }

    state.rooms.forEach((el) => {
     if (el.id === id) {
      state.can_finish = el.can_finish
      state.can_hold = el.can_hold
     }
    })

    await commit('setLoading', false)
   } catch (error) {
    commit('setLoading', false)
    commit('setError', error.response?.data.error)
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
    commit('setError', error.response.data.error)
    throw error
   }
  }


 },
 getters: {
  getRooms(state) {
   return state.rooms || localStorage.getItem('localRoom') != null ? JSON.parse(localStorage.getItem('localRoom')) : ''
  },
  getRoomMessage(state) {
   return state.roomMessage
  },
  getRecipients(state) {
   return state.recipients
  },
  getCanHold(state) {
   return state.can_hold
  },
  getCanFinish(state) {
   return state.can_finish
  }

 }
}
