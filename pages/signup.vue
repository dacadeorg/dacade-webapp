<template>
  <ValidationObserver
    ref="form"
    v-slot="{ passes }"
    class="absolute w-full top-0 min-h-screen flex items-center"
  >
    <form class="content-wrapper pt-24" @submit.prevent="passes(onSignUp)">
      <div class="lg:w-98 xl:w-98 mx-auto">
        <div
          class="
            w-32
            h-32
            rounded-full
            bg-gray-50
            mx-auto
            mb-5.5
            relative
            pt-16
          "
        >
          <div
            class="
              absolute
              text-lg
              top-8
              text-gray-400
              left-0
              right-0
              text-center
            "
          >
            <p class="w-1/2 mx-auto relative">
              {{ $t('login-page.signup.upload-title') }}
            </p>
          </div>
          <a class="cursor-pointer">
            <div
              class="
                bg-primary
                w-10
                h-10
                rounded-full
                bottom-0
                right-0
                absolute
              "
            >
              <Upload />
            </div>
          </a>
        </div>
        <div>
          <h1 class="text-5xl my-5">
            {{ $t('login-page.signup.title') }}
          </h1>
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
                required
                type="email"
                :placeholder="$t('login-page.email.placeholder')"
                :label="$t('login-page.email.label')"
                class="mb-5"
                :error="errors[0]"
                :value="form.email"
                @input="form.email = $event"
              />
            </div>
          </ValidationProvider>
        </div>

        <div label-for="input-2">
          <ValidationProvider
            v-slot="{ errors }"
            name="username"
            rules="required|min:4"
            mode="passive"
          >
            <Input
              id="input-2"
              name="username"
              :placeholder="$t('login-page.username.placeholder')"
              :label="$t('login-page.username.label')"
              class="mb-5"
              :error="errors[0]"
              :value="form.username"
              @input="form.username = $event"
            />
          </ValidationProvider>
        </div>

        <div>
          <ValidationProvider
            v-slot="{ errors }"
            name="password"
            rules="required|min:6"
            mode="passive"
          >
            <Input
              id="text-password"
              name="password"
              type="password"
              :placeholder="$t('login-page.password.placeholder')"
              :label="$t('login-page.password.label')"
              class="mb-5"
              :error="errors[0]"
              :value="form.password"
              @input="form.password = $event"
            />
          </ValidationProvider>
        </div>

        <div class="text-right">
          <Button
            :padding="false"
            :disabled="loading"
            class="mt-4 btn-primary btn-lg"
          >
            <span class="inline-block text-sm">{{
              $t('login-page.signup.button')
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
/* eslint-disable no-console */
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'
import Upload from '~/assets/icons/upload.svg?inline'

export default {
  components: {
    Button,
    Input,
    ArrowRight,
    Upload,
  },
  layout: 'withoutFooter',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  methods: {
    onSignUp() {
      this.loading = true
      this.$store
        .dispatch('auth/signUp', {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
        })
        .then(() => {
          this.$router.replace('/profile/notifications')
        })
        .catch((error) => {
          this.loading = false
          if (error.details) {
            this.$refs.form.setErrors(error.details)
          }
        })
    },
    goToLogin() {
      this.$router.push('/login')
    },
  },
}
</script>
