<template>
  <div>
    <Navigation />
    <notification-bar />
    <a href="#">
      <nuxt-link to="/signup">
        Signup
      </nuxt-link>
    </a>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        />
      </b-form-group>

      <b-form-group>
        <label for="text-password">Password</label>
        <b-input
          id="text-password"
          v-model="form.password"
          type="password"
        />
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        :disabled="busy"
      >
        Submit
      </b-button>
    </b-form>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Navigation from '@/components/Navigation'
import apiJobMixin from '@/mixins/apiJobMixin'
import NotificationBar from '@/components/NotificationBar'

export default {
  components: {
    Navigation,
    NotificationBar: NotificationBar
  },
  mixins: [apiJobMixin],
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters.loginStatus
    }
  },
  methods: {
    onLogin() {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            const loginData = {
              email: this.form.email,
              password: this.form.password
            }
            this.$store.dispatch('loginUser', loginData)
          }
        })
    },
    jobsDone() {
      this.removeErrors()
      let nextRoute = '/'
      const forwardRoute = this.$store.getters.forwardRoute
      if (forwardRoute !== null) {
        nextRoute = forwardRoute
        this.$store.commit('setForwardRoute', null)
      }
      this.$router.replace(nextRoute)
    }
  }
}
</script>
