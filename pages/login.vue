<template>
  <div>
    <Navigation />
    <notification-bar />
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <b-card class="bg-dark big-shadow">
            <b-tabs card align="center">
              <b-tab title="Signup" @click="goToSignup()" />
              <b-tab title="Login" active>
                <div class="p-4">
                  <ValidationObserver v-slot="{ invalid, passes }">
                    <b-form @submit.prevent="passes(onLogin)">
                      <b-form-group id="input-group-1" label-for="input-1">
                        <label for="input-1">Email address</label>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="email"
                          rules="required|email"
                        >
                          <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="Enter email"
                          />
                          <span class="help">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </b-form-group>

                      <b-form-group>
                        <label for="text-password">Password</label>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="password"
                          rules="required|min:6"
                        >
                          <b-input
                            id="text-password"
                            v-model="form.password"
                            type="password"
                            placeholder="Enter password"
                          />
                          <span class="help">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </b-form-group>
                      <div>
                        <i class="muted-dark">
                          <NuxtLink
                            to="/password-reset"
                            class="fs-1 dark-white"
                          >
                            Forgot password?
                          </NuxtLink>
                        </i>
                      </div>
                      <b-button
                        type="submit"
                        :disabled="loading"
                        class="mt-4 btn-primary btn-lg"
                      >
                        Login
                      </b-button>
                    </b-form>
                  </ValidationObserver>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Navigation from '@/components/Navigation'
import NotificationBar from '@/components/NotificationBar'

export default {
  components: {
    Navigation,
    NotificationBar
  },
  middleware: 'guest',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    onLogin () {
      const loginData = {
        email: this.form.email,
        password: this.form.password
      }
      this.loading = true
      this.$store.dispatch('auth/login', loginData).then(() => {
        this.$router.replace('/bounties')
      }).catch(() => { this.loading = false })
    },
    goToSignup () {
      this.$router.push('/signup')
    }
  }
}
</script>
<style scoped>
a {
  color: rgba(255, 255, 255, 0.3);
  font-size: 19px;
  text-decoration: underline;
}

a:hover {
  color: #53d1af;
  font-size: 19px;
  font-weight: 700;
}

.card {
  border: none;
}

.card-body {
  padding: 0rem;
}

.container {
  padding-top: 4em;
}

form {
  margin: 2em 0;
}

label {
  font-size: 19px;
}

.p-4 {
  padding: 0 1.5rem !important;
}
</style>
