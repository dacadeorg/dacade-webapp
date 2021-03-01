/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  list: [
    {
      slug: 'intro-to-blockchain',
      title: 'Introduction to Blockchain',
      subtitle: 'Learn the most important concepts of blockchain technology',
      rewards: 5,
      icon: require('~/assets/icons/communities/blockchain.svg?data'),
      colors: {
        primary: '#01464C',
        accent: '#34E256'
      },
      url: ''
    },
    {
      slug: 'ae-dev-101',
      title: 'Aeternity Development 101',
      subtitle: 'Learn how to build a voting dApp on top of Aeternity',
      rewards: 20,
      icon: require('~/assets/icons/communities/aeternity.svg?data'),
      colors: {
        primary: '#FF3A02',
        accent: '#47110A'
      },
      url: ''
    },
    {
      slug: 'web-dev-101',
      title: 'Web Development 101',
      subtitle: 'Learn how to build and host a website with bootstrap',
      rewards: 20,
      icon: require('~/assets/icons/communities/web.svg?data'),
      colors: {
        primary: '#381B84',
        accent: '#24DAD9'
      },
      url: ''
    }
  ],
  count: 0
})

export const getters = {
  list (state) {
    return state.list
  },
  count (state) {
    return state.list.length
  }
}
