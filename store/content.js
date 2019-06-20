/* eslint-disable no-console */
import fireApp from '@/plugins/firebase'

export const state = () => ({
  communityData: [],
  chapterData: []
})

export const mutations = {
  loadCommunityData(state, payload) {
    state.communityData.push(payload)
  }
}

export const actions = {
  getCommunityData({ commit }) {
    fireApp.database().ref('communityData').on('child_added',
      (snapShot) => {
        const item = snapShot.val()
        item.key = snapShot.key
        commit('loadCommunityData', item)
      }
    )
  }
}

export const getters = {
  communityData(state) {
    return state.communityData
  }
}
