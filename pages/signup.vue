<template>
  <div>
    <Navigation />
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
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        />
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        />
      </b-form-group>

      <b-form-group>
        <label for="text-password">Password</label>
        <b-input id="text-password" v-model="form.password" type="password" aria-describedby="password-help-block" />
        <b-form-text id="password-help-block">
          Your password must be 8-20 characters long, contain letters and numbers, and must not
          contain spaces, special characters, or emoji.
        </b-form-text>
      </b-form-group>

      <b-button type="submit" variant="primary">
        Submit
      </b-button>
    </b-form>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: ''
      }
    }
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters.loginStatus
    }
  },
  watch: {
    userLoggedIn(value) {
      if (value) {
        this.$router.replace('/community-selection')
      }
    }
  },
  methods: {
    onSignUp() {
      const signUpData = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      this.$store.dispatch('signUpUser', signUpData)
    }
  }
}
</script>
