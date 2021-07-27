/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '~/plugins/firebase'
export const actions = {
  create({ commit }, { name, attributes }) {
    const user = this.getters['user/get']
    firebase.analytics().setUserId(user && user.uid ? user.uid : null)
    return firebase.analytics().logEvent(name, attributes || {})
  },
}

export const getters = {
  colors(state) {
    return state.colors
  },
}
