<template>
  <div
    class="flex items-center justify-center absolute min-h-screen top-0 w-full"
  >
    <div class="relative p-6 text-center">
      <div v-if="!verified">
        <Loader />
        <p class="mt-5">Verifying email</p>
      </div>
      <div v-else>
        <div>
          <h1 class="text-3xl font-medium mb-7">
            {{ $t('email-verification.success.title') }}
          </h1>
          <p class="text-lg">
            {{ $t('email-verification.success.subtitle') }}
          </p>
          <p class="text-lg">
            {{ $t('email-verification.success.message') }}
          </p>
        </div>

        <div class="text-center pt-8">
          <ArrowButton @click="goHome()"
            >{{ $t('email-verification.success.button') }}
          </ArrowButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/ui/Loader.vue'
import ArrowButton from '@/components/ui/button/Arrow'
/* eslint-disable no-console */

export default {
  components: {
    Loader,
    ArrowButton,
  },
  layout: 'withoutFooter',
  data() {
    return {
      verified: false,
    }
  },
  created() {
    this.verify()
  },
  methods: {
    async verify() {
      const { code } = this.$route.query

      if (!code)
        return this.$nuxt.error({
          statusCode: 403,
          message: 'The email verification code was not provided',
        })

      try {
        await this.$store.dispatch('auth/verifyEmail', { code })
        this.verified = true
      } catch (e) {
        this.$nuxt.error({
          statusCode: 403,
          message: 'The email verification code has expired',
        })
      }
    },
    goHome() {
      window.location.href = this.localePath('/login')
    },
  },
}
</script>
