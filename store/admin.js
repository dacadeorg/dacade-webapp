/* eslint-disable no-console */
import fireApp from '@/plugins/firebase'

export const state = () => ({
  groups: []
})

export const mutations = {
  loadGroups(state, payload) {
    state.groups.push(payload)
  }
}

export const actions = {
  createGroup({ commit }, payload) {
    fireApp.database().ref('groups').push(payload)
      .then(() => {
        console.log('success')
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
  getGroups({ commit }) {
    fireApp.database().ref('groups').on('child_added',
      (snapShot) => {
        const item = snapShot.val()
        item.key = snapShot.key
        commit('loadGroups', item)
      }
    )
  }
}

export const getters = {
  groups(state) {
    return state.groups
  }
}
