<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <b-card class="bg-dark big-shadow">
            <div class="p-4">
              <ValidationObserver v-slot="{ invalid, passes }">
                <b-form @submit.prevent="passes(onPasswordResetRequest)">
                  <h3 class="mb-5">
                    Password reset
                  </h3>
                  <b-form-group id="input-group-1" label-for="input-1">
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
                  <b-button
                    type="submit"
                    variant="primary"
                    :disabled="loading"
                    class="mt-4 btn-primary btn-lg"
                  >
                    Submit
                  </b-button>
                </b-form>
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
