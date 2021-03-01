<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <b-card class="bg-dark big-shadow">
            <div class="p-4">
              <ValidationObserver v-slot="{ invalid, passes }">
                <form class="content-wrapper text-center" @submit.prevent="passes(onPasswordResetRequest)">
                  <h3 class="mb-5">
                    Password reset
                  </h3>
                  <div label-for="input-1">
                    <label for="input-2">Email Address</label>
                    <ValidationProvider
                      v-slot="{ errors }"
                      name="email"
                      rules="required|email"
                    >
                      <input
                        id="input-1"
                        v-model="form.email"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                      >
                      <span class="help">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <button
                    type="submit"
                    variant="primary"
                    :disabled="loading"
                    class="mt-4 btn-primary btn-lg"
                  >
                    Submit
                  </button>
                </form>
              </ValidationObserver>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {
  data () {
    return {
      form: {
        email: ''
      },
      loading: false
    }
  },
  methods: {
    onPasswordResetRequest () {
      const data = {
        email: this.form.email
      }
      this.loading = true
      this.$store.dispatch('auth/passwordResetRequest', data).then(() => {
        this.$router.push('/login')
      }).catch(() => { this.loading = false })
    }
  }
}
</script>
