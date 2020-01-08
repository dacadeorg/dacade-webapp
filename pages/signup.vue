<template>
  <div>
    <Navigation />
    <notification-bar />
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <b-card class="bg-dark big-shadow">
            <b-tabs card align="center">
              <b-tab title="Signup" active>
                <div class="p-4">
                  <ValidationObserver v-slot="{ invalid, passes }">
                    <b-form @submit.prevent="passes(onSignUp)">
                      <b-form-group
                        id="input-group-1"
                        label-for="input-1"
                      >
                        <label for="input-2">Email Address</label>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="email"
                          rules="required|email"
                        >
                          <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            name="email"
                            placeholder="Enter email"
                          />
                          <span class="help">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </b-form-group>

                      <b-form-group id="input-group-2" label-for="input-2">
                        <label for="input-2">Username</label>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="username"
                          rules="required|min:4"
                        >
                          <b-form-input
                            id="input-2"
                            v-model="form.name"
                            name="username"
                            placeholder="Enter name"
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
                            name="password"
                            type="password"
                            placeholder="Enter password"
                          />
                          <span class="help">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </b-form-group>

                      <div>
                        <i class="muted-dark">
                          Click "Signup" below to accept dacade's
                          <a href="http://policy.dacade.org/" class="fs-1 dark-white">
                            Privacy Policy.
                          </a>
                        </i>
                      </div>

                      <b-button
                        type="submit"
                        variant="primary"
                        :disabled="busy"
                        class="mt-4 btn-primary btn-lg"
                      >
                        Signup
                      </b-button>
                    </b-form>
                  </ValidationObserver>
                </div>
              </b-tab>
              <b-tab title="Login" @click="goToLogin()" />
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
        name: '',
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
    onSignUp() {
      const signUpData = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      this.$store.dispatch('signUpUser', signUpData)
    },
    goToLogin() {
      this.$router.push('/login')
    },
    jobsDone() {
      this.removeErrors()
      const nextRoute = '/notifications'
      // const forwardRoute = this.$store.getters.forwardRoute
      // if (forwardRoute !== null) {
      //   nextRoute = forwardRoute
      //   this.$store.commit('setForwardRoute', null)
      // }
      this.$router.replace(nextRoute)
    }
  }
}
</script>
<style scoped>
a{
  color:rgba(255, 255, 255, 0.3);
  font-size: 19px;
  text-decoration: underline;
}
a:hover{
  color:#53d1af;
  font-size: 19px;
  font-weight:700;
}
.card {
  border: none;
}
.card-body {
  padding: 0rem;
}
.container{
  padding-top:4em;
}
form{
  margin: 2em 0;
}
label{
  font-size:19px;
}
.p-4{
  padding: 0 1.5rem!important;
}
</style>
