<template>
  <div>
    <Navigation />
    <notification-bar />
    <a href="#">
      <nuxt-link to="/login">
        Login
      </nuxt-link>
    </a>
    <b-form @submit.prevent="onSignUp">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          v-validate="'required|email'"
          type="email"
          name="email"
          required
          placeholder="Enter email"
        />
        <p v-show="errors.has('email')" class="help is-danger">
          {{ errors.first('email') }}
        </p>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          v-validate="'required|min:4'"
          name="username"
          required
          placeholder="Enter name"
        />
        <p v-show="errors.has('username')" class="help is-danger">
          {{ errors.first('username') }}
        </p>
      </b-form-group>

      <b-form-group>
        <label for="text-password">Password</label>
        <b-input
          id="text-password"
          v-model="form.password"
          v-validate="'required|min:6'"
          name="password"
          type="password"
        />
        <p v-show="errors.has('password')" class="help is-danger">
          {{ errors.first('password') }}
        </p>
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
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSignUp() {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            const signUpData = {
              name: this.form.name,
              email: this.form.email,
              password: this.form.password
            }
            this.$store.dispatch('signUpUser', signUpData)
          }
        })
    },
    jobsDone() {
      this.removeErrors()
      let nextRoute = '/community-selection'
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
