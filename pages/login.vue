<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <b-card class="bg-dark big-shadow">
          <b-tabs card align="center">
            <b-tab title="Signup" @click="goToSignup()" />
            <b-tab title="Login" active>
              <div class="p-4">
                <ValidationObserver v-slot="{ passes }">
                  <form
                    class="content-wrapper text-center"
                    @submit.prevent="passes(onLogin)"
                  >
                    <div label-for="input-1">
                      <label for="input-1">Email address</label>
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="email"
                        rules="required|email"
                      >
                        <input
                          id="input-1"
                          v-model="form.email"
                          type="email"
                          required
                          placeholder="Enter email"
                        />
                        <span class="help">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                    <div>
                      <label for="text-password">Password</label>
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="password"
                        rules="required|min:6"
                      >
                        <input
                          id="text-password"
                          v-model="form.password"
                          type="password"
                          placeholder="Enter password"
                        />
                        <span class="help">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div>
                      <i class="muted-dark">
                        <NuxtLink to="/password-reset" class="fs-1 dark-white">
                          Forgot password?
                        </NuxtLink>
                      </i>
                    </div>
                    <button
                      type="submit"
                      :disabled="loading"
                      class="mt-4 btn-primary btn-lg"
                    >
                      Login
                    </button>
                  </form>
                </ValidationObserver>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {
  middleware: 'guest',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    onLogin() {
      const loginData = {
        email: this.form.email,
        password: this.form.password,
      }
      this.loading = true
      this.$store
        .dispatch('auth/login', loginData)
        .then(() => {
          this.$router.replace('/bounties')
        })
        .catch(() => {
          this.loading = false
        })
    },
    goToSignup() {
      this.$router.push('/signup')
    },
  },
}
</script>
