<template>
  <div
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
        <Button
          :loading="loading"
          :padding="false"
          :disabled="loading"
          class="inline-flex btn-primary btn-lg py-2 px-5 align-middle"
          @click="resendEmail()"
        >
          <span class="text-sm">{{
            $t('email-verification.buttons.resend')
          }}</span>
          <span v-if="!loading" class="text-white mt-0.5 lg:pl-12 pl-8">
            <ArrowRight />
          </span>
          <span v-else class="text-white lg:pl-12 pl-8">
            <Spinner class="animate-spin" />
          </span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '@/components/ui/button'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'
import Spinner from '~/assets/icons/spinner.svg?inline'
/* eslint-disable no-console */

export default {
  components: {
    Button,
    ArrowRight,
    Spinner,
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
  resendPassword() {},
}
</script>
