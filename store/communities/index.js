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
      description: '',
      icon: require('~/assets/icons/communities/blockchain.svg?data'),
      introduction: {
        text: ''
      },
      trailer: {
        duration: 300000,
        summary:
          'In this video, we discuss currencies and the challenges that needing to trust authorities might pose.',
        video: 'https://www.youtube.com/embed/zh0wuD2dT3Q?showinfo=0&rel=0'
      },
      colors: {
        primary: '#01464C',
        accent: '#34E256',
        textAccent: '#31C24D',
        text: '#fff'
      },
      url: '',
      objectives: [
        'Know what Bitcoin is and why it is considered to be so revolutionary.',
        'Have a basic knowledge of how Blockchain technology works',
        'Understand in which cases, other than digital money, Blockchain technology can be applied.'
      ],
      chapters: [
        {
          title: 'What is Bitcoin?',
          description: 'Now In this chapter, you will get an introduction to HTML, Atom, Bootstrap and start to build your own website.',
          duration: 600000,
          objectives: [
            'Get to know the challenges that our current financial system is facing.',
            'Understand what Bitcoin is and gain insights into how it works.',
            'Know what advantages Bitcoin has over traditional currencies as well as what challenges it currently faces.'
          ],
          materials: [
            {
              title: 'Challenges of fiat money',
              subtitle: 'Youtube Video by dacade',
              description:
                'In this video, we discuss currencies and the challenges that needing to trust authorities might pose.',
              link:
                'https://www.youtube.com/embed/g4FxZJqA1nw?showinfo=0&rel=0',
              duration: 180000,
              type: 'EMBEDDED-VIDEO'
            },
            {
              title: 'Introducing Bitcoin',
              subtitle: 'Youtube Video by dacade',
              description:
                "In this video, we will give you a brief history of Bitcoin and introduce you to the most important concepts of this 'decentralized' currency.",
              link:
                'https://www.youtube.com/embed/Nkvetaoa7UY?showinfo=0&rel=0',
              duration: 180000,
              type: 'EMBEDDED-VIDEO'
            },
            {
              title: 'Advantages and challenges of Bitcoin',
              subtitle: 'Youtube Video by dacade',
              description:
                'In this video, we discuss the advantage and challenges of Bitcoin.',
              link:
                'https://www.youtube.com/embed/0wfoS-3bQC0?showinfo=0&rel=0',
              duration: 300000,
              type: 'EMBEDDED-VIDEO'
            },
            {
              type: 'ADDITIONAL',
              list: [
                {
                  title: 'Andreas Antonopoulos explains Bitcoin',
                  subtitle: 'Video',
                  link: 'https://www.youtube.com/watch?v=c2CsJ2HMA2I',
                  duration: 1200000

                },
                {
                  title: 'Explain Bitcoin Like I’m Five',
                  subtitle: 'Text',
                  link:
                  'https://medium.freecodecamp.org/explain-bitcoin-like-im-five-73b4257ac833',
                  duration: 6
                },
                {
                  title: 'Bitcoin Whitepaper annotated',
                  link: 'http://fermatslibrary.com/s/bitcoin',
                  subtitle: 'Text',
                  duration: 30
                }
              ]
            }
          ]
        },
        {
          title: 'What is a Blockchain?',
          duration: 600000,
          objectives: [
            'Understand that the enormous potential of Bitcoin is based in its distributed ledger technology: aka the “Blockchain”.',
            'Learn how Blockchain technology works.',
            'Get to know why Bitcoin wasn’t hacked yet.'
          ]
        },
        {
          title: 'Blockchain applications?',
          duration: 600000, // time in milliseconds
          objectives: [
            'Learn what smart contracts are and when they can be used.',
            'Get to know what smart contract platforms like Ethereum or aeternity do.',
            'Understand what a dApp is and have an idea when building one makes sense.'
          ]
        }
      ],
      rewards: [
        {
          amount: 20,
          denom: 'CGLD',
          type: 'SUBMISSION'
        },
        {
          amount: 20,
          denom: 'CGLD',
          type: 'FEEDBACK'
        }
      ],
      challenge: {
        points: [],
        format: {},
        description:
          'In the challenge of this community you need to envision a problem that Blockchain technology could solve. You can earn 0$ worth of aeternity Token in this challenge and additional tokens for helping your peers.'
      }
    },
    {
      slug: 'ae-dev-101',
      name: 'Aeternity Development 101',
      summary: 'Learn how to build a voting dApp on top of Aeternity',
      icon: require('~/assets/icons/communities/aeternity.svg?data'),
      colors: {
        primary: '#FF3A02',
        accent: '#47110A',
        textAccent: '#47110A',
        text: '#47110A'
      },
      url: '',
      objectives: [
        'Know what Bitcoin is and why it is considered to be so revolutionary.',
        'Have a basic knowledge of how Blockchain technology works',
        'Understand in which cases, other than digital money, Blockchain technology can be applied.'
      ],
      rewards: [
        {
          amount: 20,
          denom: 'CGLD',
          type: 'SUBMISSION'
        },
        {
          amount: 20,
          denom: 'CGLD',
          type: 'FEEDBACK'
        }
      ]
    },
    {
      slug: 'web-dev-101',
      name: 'Web Development 101',
      summary: 'Learn how to build and host a website with bootstrap',
      icon: require('~/assets/icons/communities/web.svg?data'),
      colors: {
        primary: '#381B84',
        accent: '#24DAD9',
        textAccent: '#24DAD9',
        text: '#fff'
      },
      url: '',
      objectives: [
        'Know what Bitcoin is and why it is considered to be so revolutionary.',
        'Have a basic knowledge of how Blockchain technology works',
        'Understand in which cases, other than digital money, Blockchain technology can be applied.'
      ],
      rewards: [
        {
          amount: 20,
          denom: 'CGLD',
          type: 'SUBMISSION'
        },
        {
          amount: 20,
          denom: 'CGLD',
          type: 'FEEDBACK'
        }
      ]
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
