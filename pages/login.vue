<template>
  <div>
    <Navigation />
    <notification-bar />
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <ul class="nav nav-pills justify-content-center">
            <li class="nav-item">
              <span class="nav-link active" href="#">Login</span>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/signup">
                Signup
              </nuxt-link>
            </li>
          </ul>
          <ValidationObserver v-slot="{ invalid, passes }">
            <b-form @submit.prevent="passes(onLogin)">
              <b-form-group
                id="input-group-1"
                label-for="input-1"
              >
              <label for="input-1">Email address</label>
                <ValidationProvider
                  name="email"
                  rules="required|email"
                  v-slot="{ errors }"
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
                  name="password"
                  rules="required|min:6"
                  v-slot="{ errors }"
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

              <b-button
                type="submit"
                variant="primary"
                :disabled="busy"
                class="mt-4"
              >
                Submit
              </b-button>
            </b-form>
          </ValidationObserver>
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
      const loginData = {
        email: this.form.email,
        password: this.form.password
      }
      this.$store.dispatch('loginUser', loginData)
    },
    jobsDone() {
      this.removeErrors()
      let nextRoute = '/communities'
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
<style scoped>
a{
  color:white;
  font-size: 19px;
  font-weight:700;
}
a:hover{
  color:#53d1af;
  font-size: 19px;
  font-weight:700;
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
.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    color: #fff;
    background-color: #53d1af;
  font-size: 19px;
  font-weight:700;
}
</style>
