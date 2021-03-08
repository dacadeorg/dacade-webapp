/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import firebase from '@/plugins/firebase'

const db = firebase.database()

export const state = () => ({
  samples: [
    {
      slug: 'intro-to-blockchain',
      name: 'Introduction to Blockchain',
      summary: 'Learn the most important concepts of blockchain technology',
      rewards: 5,
      icon: require('~/assets/icons/communities/blockchain.svg?data'),
      colors: {
        primary: '#01464C',
        accent: '#34E256',
        text: '#fff'
      },
      url: ''
    },
    {
      slug: 'ae-dev-101',
      name: 'Aeternity Development 101',
      summary: 'Learn how to build a voting dApp on top of Aeternity',
      rewards: 20,
      icon: require('~/assets/icons/communities/aeternity.svg?data'),
      colors: {
        primary: '#FF3A02',
        accent: '#47110A',
        text: '#47110A'
      },
      url: ''
    },
    {
      slug: 'web-dev-101',
      name: 'Web Development 101',
      summary: 'Learn how to build and host a website with bootstrap',
      rewards: 20,
      icon: require('~/assets/icons/communities/web.svg?data'),
      colors: {
        primary: '#381B84',
        accent: '#24DAD9',
        text: '#fff'
      },
      url: ''
    }
  ],
  list: [],
  count: 0,
  content: null,
  current: null
})

export const mutations = {
  setCurrent (state, payload) {
    const { slug, data } = payload
    const current = state.samples.find(community => community.slug === slug)
    this.commit('ui/setColors', {
      ...current.colors
    })
    state.current = {
      ...current,
      ...data
    }
  },
  setList (state, payload) {
    const communities = payload
    const list = Object.keys(communities).map((slug) => {
      const current = state.samples.find(c => c.slug === slug)
      return {
        ...current,
        ...communities[slug]
      }
    })
    console.log(list)
    state.list = list
  },
  setContent (state, payload) {
    state.content = payload
  }
}

export const actions = {
  find ({ commit }, slug) {
    return db
      .ref(`communityDataPreview/${slug}`)
      .once('value')
      .then((snapShot) => {
        const data = snapShot.val()
        commit('setCurrent', {
          slug,
          data
        })
      })
  },
  all ({ commit }) {
    return db
      .ref('communityDataPreview')
      .once('value')
      .then((snapShot) => {
        const data = snapShot.val()
        commit('setList', data)
      })
  },
  content ({ commit }, payload) {
    return db
      .ref(`communityData/${payload}`)
      .once('value')
      .then((snapShot) => {
        const communityData = snapShot.val()
        commit('setContent', communityData)
      })
  }
}

export const getters = {
  list (state) {
    return state.list
  },
  current (state) {
    return state.current
  },
  content (state) {
    return state.content
  }
}
