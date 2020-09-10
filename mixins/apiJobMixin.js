/* eslint-disable no-console */
export default {
  methods: {
    removeErrors() {
      this.$store.commit('clearError')
    }
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    busy() {
      return this.$store.getters.busy
    },
    jobDone() {
      return this.$store.getters.jobDone
    }
  },
  watch: {
    jobDone(value) {
      if (value) {
        this.$store.commit('setJobDone', false)
        this.jobsDone()
      }
    }
  }
}
