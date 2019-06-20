<template>
  <div>
    <b-form @submit.prevent="onLogin">
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
/* eslint-disable no-console */
export default {
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
  watch: {
    userLoggedIn(value) {
      if (value) {
        console.log('logged in')
        this.$router.replace('/community-selection')
      }
    }
  },
  methods: {
    onLogin() {
      const loginData = {
        email: this.form.email,
        password: this.form.password
      }
      this.$store.dispatch('loginUser', loginData)
    }
  }
}
</script>
