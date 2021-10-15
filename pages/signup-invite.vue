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
        <div class="lg:w-98 xl:w-150 mx-auto">
          <div>
            <h1 class="text-5xl my-5">
              <div v-for="community in communities" :key="community.key">
                {{ community }}
              </div>
              [name of invitor]
              {{ $t('signup-invite-page.title.invitation') }}
              {{ $t('app.name') }}
            </h1>
          </div>
          <div>
            <h1 class="text-xl font-extralight my-5">
              {{ $t('signup-invite-page.signup.ref-text') }}
            </h1>
          </div>
          <div class="flex justify-between">
            <p>ACTIVE BOUNTIES</p>
            <p>Challenge reward</p>
          </div>
          <Referral
            v-for="referral in referrals"
            :key="referral.name"
            :referral="referral"
          />

          <div label-for="input-1" class="mb-5 mt-5 relative">
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

          <div class="flex justify-between mt-4 mb-40">
            <div class="flex flex-col self-start">
              <div class="flex flex-row max-w-xm space-x-3">
                <input
                  id="agree1"
                  v-model="checkedterms"
                  class="w-5 h-5"
                  name="agree"
                  required
                  size="small"
                  type="checkbox"
                  target="_blank"
                />
                <span class="max-w-none test">
                  I agree to {{ $t('app.name') }}'s
                  <nuxt-link class="underline" to="/terms-conditions">{{
                    $t('signup-page.terms')
                  }}</nuxt-link>
                </span>
                <span v-if="warningterms" class="form-text-red"
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
import { mapGetters } from 'vuex'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Referral from '@/components/cards/Referral.vue'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'
// import Upload from '~/assets/icons/upload.svg?inline'
import Spinner from '~/assets/icons/spinner.svg?inline'

export default {
  components: {
    Button,
    Input,
    ArrowRight,
    Spinner,
    // Upload,
    Referral,
  },
  layout: 'withoutFooter',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        refCode: '',
      },
      loading: false,
      checkedterms: false,
      checkedprivacy: false,
      warningterms: false,
      // warningprivacy: false,
    }
  },
  computed: {
    ...mapGetters({
      communities: 'communities/list',
    }),
    referrals() {
      return [
        {
          name: 'Celo Development 101',
          icon: '/img/communities/celo.svg',
          type: 'Referral',
          colors: {
            text: '#fff',
            accent: '#2E3337',
            textAccent: '#34b276',
            primary: '#35C07D',
          },
          reward: {
            amount: 25,
            token: 'cUSD',
          },
          url: 'https://forms.gle/PLjPugvJpj9m2Qn7A',
        },
        {
          name: 'Tezos Starter Course',
          image: '/img/communities/tacode.webp',
          type: 'Challenge',
          colors: {
            text: '#0D61FF',
            accent: '#0D61FF',
            textAccent: '#fff',
            primary: '#0D61FF',
          },
          reward: {
            amount: 12,
            token: 'tez',
          },
          url: 'https://tacode.dev/courses/dev-starter',
        },
      ]
    },
  },
  methods: {
    onSignUp() {
      this.warningterms = !this.checkedterms
      // this.warningprivacy = !this.checkedprivacy

      if (this.warningterms) return

      this.loading = true
      this.$store
        .dispatch('auth/signUp', {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          refcode: this.form.refcode,
        })
        .then(() => {
          this.$router.replace('/profile')
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
