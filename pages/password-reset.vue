<template>
  <div class="content-wrapper mx-auto">
    <ValidationObserver v-slot="{ passes }">
      <form class="mb-24" @submit.prevent="passes(onPasswordResetRequest)">
        <div class="lg:w-98 xl:w-98 mx-auto">
          <h3 class="text-5xl my-5">
            {{ $t('login-page.password-reset.title') }}
          </h3>
          <div label-for="input-1">
            <label for="input-2" class="text-sm">{{
              $t('login-page.password-reset.Description')
            }}</label>
            <ValidationProvider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <Input
                id="input-1"
                v-model="form.email"
                required
                type="email"
                :placeholder="$t('login-page.email.placeholder')"
                :label="$t('login-page.email.label')"
                class="mb-5"
                :error="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="text-right">
            <Button
              :padding="false"
              type="submit"
              :disabled="loading"
              class="btn-primary btn-lg py-2 px-5"
            >
              <span class="inline-block text-sm">{{
                $t('login-page.signin.button')
              }}</span>
              <span class="inline-block text-white lg:pl-12 pl-8"
                ><ArrowRight
              /></span>
            </Button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
/* eslint-disable no-console */

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'

export default {
  layout: 'withoutFooter',

  components: {
    Button,
    Input,
    ArrowRight,
  },

  data() {
    return {
      form: {
        email: '',
      },
      loading: false,
    }
  },
  methods: {
    onPasswordResetRequest() {
      const data = {
        email: this.form.email,
      }
      this.loading = true
      this.$store
        .dispatch('auth/passwordResetRequest', data)
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
