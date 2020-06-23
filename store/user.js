/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
const db = firebase.database()

export const state = () => ({
  user: null,
  usersData: null
})
export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  ...vuexfireMutations
}
export const getters = {
  user(state) {
    return state.user
  }
}
