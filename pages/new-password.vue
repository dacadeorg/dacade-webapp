<template>
  <div>
    <ValidationObserver
      v-slot="{ passes }"
      class="absolute w-full top-0 min-h-screen flex items-center"
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
            <ValidationProvider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <Input
                id="input-1"
                v-model="form.email"
                required
                disabled
                type="email"
                :placeholder="$t('login-page.email.placeholder')"
                :label="$t('login-page.email.label')"
                class="mb-5"
                :error="errors[0]"
              />
            </ValidationProvider>
          </div>

          <div>
            <ValidationProvider
              v-slot="{ errors }"
              name="password"
              rules="required|min:6"
            >
              <Input
                id="text-password"
                v-model="form.password"
                name="password"
                type="password"
                :placeholder="$t('login-page.password.placeholder')"
                :label="$t('login-page.password.label')"
                class="mb-5"
                :error="errors[0]"
              />
            </ValidationProvider>
          </div>

          <div>
            <ValidationProvider
              v-slot="{ errors }"
              name="password"
              rules="required|min:6"
            >
              <Input
                id="text-password"
                v-model="form.password"
                name="password"
                type="password"
                :placeholder="$t('login-page.password.placeholder')"
                :label="$t('login-page.new-password.label')"
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
            >
              {{ $t('password-reset.submit') }}
            </ArrowButton>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
/* eslint-disable no-console */
import ArrowButton from '@/components/ui/button/Arrow'
import Input from '@/components/ui/Input'
import { getMetadataTitle } from '~/utilities/Metadata'

export default {
  components: {
    ArrowButton,
    Input,
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
