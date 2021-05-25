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
        <div class="mt-4">
          <span class="text-primary text-sm">
            <NuxtLink to="/password-reset" class="fs-1 dark-white">
              {{ $t('login-page.forget-password') }}
            </NuxtLink>
          </span>
        </div>
        <div class="text-right">
          <Button
            :padding="false"
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
</template>

<script>
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'
/* eslint-disable no-console */

export default {
  components: {
    Button,
    Input,
    ArrowRight,
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

  created() {
    console.log(this.$router)
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
