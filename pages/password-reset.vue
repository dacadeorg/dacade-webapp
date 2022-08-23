<template>
  <div>
    <ValidationObserver
      v-slot="{ passes }"
      class="absolute w-full top-0 min-h-screen flex items-center justify-center"
    >
      <form
        class="content-wrapper"
        @submit.prevent="passes(onPasswordResetRequest)"
      >
        <div class="lg:w-98 xl:w-98 mx-auto">
          <h3 class="text-5xl my-5">
            {{ $t('password-reset.title') }}
          </h3>
          <div label-for="input-1">
            <label for="input-2" class="text-sm">{{
              $t('password-reset.description')
            }}</label>
            <ValidationProvider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
              mode="passive"
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
            <ArrowButton
              :loading="loading"
              type="submit"
              :disabled="loading"
              min-width-class="min-w-40"
              >{{ $t('password-reset.submit') }}
            </ArrowButton>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
/* eslint-disable no-console */

import Input from '@/components/ui/Input'
import ArrowButton from '@/components/ui/button/Arrow'
import { getMetadataTitle } from '~/utilities/Metadata'

export default {
  components: {
    Input,
    ArrowButton,
  },
  layout: 'withoutFooter',
  middleware: 'guest',
  data() {
    return {
      form: {
        email: '',
      },
      loading: false,
    }
  },
  head() {
    return {
      title: getMetadataTitle(this.$t('password-reset.title')),
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
          this.$router.push(this.localePath('/login'))
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>
