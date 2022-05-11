<template>
  <div
    v-if="user"
    class="flex items-center justify-center absolute min-h-screen top-0 w-full"
  >
    <div class="relative p-6 text-center">
      <div>
        <h1 class="text-3xl font-medium mb-7">
          {{ $t('email-verification.title') }}
        </h1>
        <p class="text-lg">
          {{ $t('email-verification.subtitle') }}
        </p>
        <p class="text-base font-bold mb-4">{{ user.email }}</p>
        <p class="text-lg py-4" v-html="$t('email-verification.message')" />
        <p class="text-sm py-4">{{ $t('email-verification.foot-note') }}</p>
      </div>

      <div class="text-center mt-1">
        <ArrowButton :loading="loading" @click="resendEmail()">
          {{ $t('email-verification.buttons.resend') }}
        </ArrowButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ArrowButton from '@/components/ui/button/Arrow'
/* eslint-disable no-console */

export default {
  components: {
    ArrowButton,
  },
  layout: 'withoutFooter',
  middleware: 'not-verified',
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
  },
  methods: {
    async resendEmail() {
      this.loading = true
      try {
        const data = await this.$store.dispatch('auth/resendEmailVerification')
        console.log(data)
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
