<template>
  <div>
    <ValidationObserver
      ref="form"
      v-slot="{ passes }"
      class="absolute w-full top-0 min-h-screen flex items-center"
    >
      <form
        class="content-wrapper pt-24"
        target="_blank"
        @submit.prevent="passes(onSignUp)"
      >
        <div class="lg:w-98 xl:w-98 mx-auto">
          <div v-if="referrer" class="p-px">
            <h1 class="text-.5xl mb-2.5 font-medium leading-6 text-gray-900">
              <span class="capitalize">{{ referrer }}</span>
              {{ $t('signup-page.referrer.title') }}
              {{ $t('app.name') }}
            </h1>
            <p class="my-px text-gray-700">
              {{ $t('signup-page.referrer.subtitle') }}
            </p>
            <div class="my-8">
              <ReferralList bounty />
            </div>
          </div>
          <div v-else>
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
                  v-model="form.email"
                  required
                  type="email"
                  :placeholder="$t('login-page.email.placeholder')"
                  :label="$t('login-page.email.label')"
                  class="mb-5"
                  :error="errors[0]"
                />
              </div>
            </ValidationProvider>
          </div>

          <div label-for="input-2">
            <ValidationProvider
              v-slot="{ errors }"
              name="username"
              rules="required|min:3|username"
              mode="aggressive"
            >
              <Input
                id="input-2"
                v-model="form.username"
                name="username"
                :placeholder="$t('login-page.username.placeholder')"
                :label="$t('login-page.username.label')"
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
              mode="passive"
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

          <div v-if="!referrer">
            <ValidationProvider
              v-slot="{ errors }"
              name="referralCode"
              rules="min:3|username"
              mode="aggressive"
            >
              <Input
                v-model="form.referralCode"
                name="referralCode"
                type="text"
                :placeholder="$t('login-page.refcode.placeholder')"
                :label="$t('login-page.refcode.label')"
                class="mb-5"
                :error="errors[0]"
              />
            </ValidationProvider>
          </div>

          <div class="flex justify-between mt-4">
            <div class="flex flex-col self-start">
              <div class="flex flex-row max-w-xm space-x-3">
                <input
                  id="agree1"
                  v-model="checkedTerms"
                  class="w-5 h-5"
                  name="agree"
                  required
                  size="small"
                  type="checkbox"
                  target="_blank"
                />
                <span class="max-w-none test">
                  I agree to {{ $t('app.name') }}'s
                  <nuxt-link
                    class="underline"
                    :to="localePath('/terms-conditions')"
                    >{{ $t('signup-page.terms') }}</nuxt-link
                  >
                </span>
                <span v-if="warningTerms" class="form-text-red"
                  >{{ $t('signup-page.terms.warning') }}
                </span>
              </div>
            </div>

            <div class="flex text-right self-start">
              <Button
                :loading="loading"
                :padding="false"
                :disabled="loading"
                class="flex btn-primary btn-lg py-2 px-5 align-middle"
              >
                <span class="text-sm">{{
                  $t('login-page.signup.button')
                }}</span>
                <span
                  v-if="loading === false"
                  class="text-white mt-0.5 lg:pl-12 pl-8"
                >
                  <ArrowRight />
                </span>
                <span v-else class="text-white lg:pl-12 pl-8">
                  <Spinner class="animate-spin" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Button from '@/components/ui/button'
import Input from '@/components/ui/Input'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'
// import Upload from '~/assets/icons/upload.svg?inline'
import ReferralList from '@/components/popups/referral/List'
import Spinner from '~/assets/icons/spinner.svg?inline'

export default {
  components: {
    Button,
    Input,
    ArrowRight,
    Spinner,
    ReferralList,
    // Upload,
  },
  layout: 'withoutFooter',
  middleware: 'guest',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        referralCode: '',
      },
      loading: false,
      checkedTerms: false,
      checkedPrivacy: false,
      warningTerms: false,
      // warningPrivacy: false,
    }
  },
  fetch({ store }) {
    return store.dispatch('referrals/all')
  },
  computed: {
    referrer() {
      // console.log(this.$route.query)
      return this.$route.query?.invite
    },
  },
  methods: {
    onSignUp() {
      this.warningTerms = !this.checkedTerms
      // this.warningPrivacy = !this.checkedPrivacy

      if (this.warningTerms) return

      this.loading = true
      this.$store
        .dispatch('auth/signUp', {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          referralCode: this.form.referralCode,
          referrer: this.referrer,
        })
        .then(() => {
          this.$router.replace(this.localePath('/profile'))
        })
        .catch((error) => {
          this.loading = false
          if (error.details) {
            this.$refs.form.setErrors(error.details)
          }
        })
    },
    goToLogin() {
      this.$router.push(this.localePath('/login'))
    },
  },
}
</script>

<style scoped>
.form-checkbox {
  height: 1rem;
}

.form-text {
  width: 40rem;
}

.form-text-red {
  color: red;
  font-size: 0.6rem;
}

.link {
  text-decoration: underline;
}
.link:hover {
  color: blue;
}

.test {
  width: 12rem;
}
</style>
