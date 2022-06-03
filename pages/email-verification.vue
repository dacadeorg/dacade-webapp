<template>
  <div v-if="user" class="md:w-7/12 w-full content-wrapper mx-auto">
    <div
      class="relative px-8 border border-solid border-gray-200 py-8 rounded-3.5xl bg-gray-50"
    >
      <div>
        <h1 class="text-3xl font-normal mb-3">
          {{ $t('email-verification.title') }}
        </h1>

        <p class="text-lg">
          <span class="font-normal">{{
            $t('email-verification.subtitle')
          }}</span>
          <span class="font-medium">{{ user.email }}</span>
          <span class="font-normal" v-html="$t('email-verification.message')" />
        </p>
        <p class="text-sm pt-7 pb-5">
          {{ $t('email-verification.foot-note') }}
        </p>
      </div>

      <div class="mt-1">
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
