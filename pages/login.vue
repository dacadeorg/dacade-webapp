<template>
  <ValidationObserver
    v-slot="{ passes }"
    class="absolute w-full top-0 min-h-screen flex items-center"
  >
    <form class="content-wrapper" @submit.prevent="passes(onLogin)">
      <div class="lg:w-98 xl:w-98 mx-auto">
        <div>
          <h1 class="text-5xl my-5">{{ $t('login-page.signin.title') }}</h1>
        </div>
        <div label-for="input-1" class="mb-5 relative">
          <ValidationProvider
            v-slot="{ errors }"
            name="email"
            rules="required|email"
            mode="passive"
          >
            <div>
              <Input
                id="input-1"
                v-model="form.email"
                required
                type="email"
                :placeholder="$t('login-page.email.placeholder')"
                :label="$t('login-page.email.label')"
                :error="errors[0]"
              />
            </div>
          </ValidationProvider>
        </div>

        <div class="">
          <ValidationProvider
            v-slot="{ errors }"
            name="password"
            rules="required|min:6"
            mode="passive"
          >
            <div class="">
              <Input
                id="text-password"
                v-model="form.password"
                type="password"
                :placeholder="$t('login-page.password.placeholder')"
                :label="$t('login-page.password.label')"
                :error="errors[0]"
              />
            </div>
          </ValidationProvider>
        </div>
        <div class="flex flex-col justify-between mt-4">
          <div>
            <span class="text-primary text-sm">
              <nuxt-link :to="localePath('/password-reset')" class="fs-1 dark-white">
                {{ $t('login-page.forget-password') }}
              </nuxt-link>
            </span>
          </div>
          <div class="text-right self-end">
            <ArrowButton
              :loading="loading"
              type="submit"
              :disabled="loading"
              min-width-class="min-w-40"
              >{{ $t('login-page.signin.button') }}
            </ArrowButton>
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import ArrowButton from '@/components/ui/button/Arrow'
import Input from '@/components/ui/Input'
import { getMetadataTitle } from '~/utilities/Metadata'
/* eslint-disable no-console */

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
        name: '',
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  head() {
    return {
      title: getMetadataTitle(this.$t('login-page.signin.title')),
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
          this.$router.replace(this.localePath('/bounties'))
        })
        .catch(() => {
          this.loading = false
        })
    },
    goToSignup() {
      this.$router.push(this.localePath('/signup'))
    },
  },
}
</script>
