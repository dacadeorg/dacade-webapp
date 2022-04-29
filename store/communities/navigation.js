/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

export const state = () => ({
  menus: [],
})

export const mutations = {
  setList(state, payload) {
    state.menus = payload
  },
}

export const actions = {
  communityPath(_, link) {
    return `/communities/${this.$route.params.slug}/courses/${this.$route.params.course_slug}/${link}`
  },
  learningModulePath(_, link) {
    return `/communities/${this.$route.params.slug}/courses/${this.$route.params.course_slug}/${link}`
  },
  init({ commit, dispatch, getters }) {
    const course = this.getters['communities/courses/current']
    const community = this.getters['communities/current']
    const menus = this.$navigation.community.init({
      course,
      community,
    })
    commit('setList', menus)
  },
}

export const getters = {
  list(state) {
    return state.menus
  },
}
