/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { logEvent, setUserId } from 'firebase/analytics'
import { analytics } from '~/plugins/firebase'
export const actions = {
  create({ commit }, { name, attributes }) {
    const user = this.getters['user/get']
    setUserId(analytics, user && user.uid ? user.uid : null)
    return logEvent(analytics, name, attributes || {})
  },
}

export const getters = {
  colors(state) {
    return state.colors
  },
}
