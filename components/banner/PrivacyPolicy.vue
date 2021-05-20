<template>
  <div v-if="show" class="fixed bottom-0 z-999 left-0 right-0">
    <div
      variant="warning"
      class="bg-primary text-white py-8 text-center relative z-10"
    >
      We use browser cookies to give you the best possible experience. Learn
      more about our
      <a href="http://policy.dacade.org/" class="underline">Privacy Policy</a>.
    </div>

    <div
      class="
        absolute
        top-5
        right-5
        z-50
        h-8
        w-8
        flex
        items-center
        justify-center
        text-white
        rounded-full
        border-solid border border-white
      "
      @click="dismiss"
    >
      <CloseIcon />
    </div>
  </div>
</template>
<script>
import CloseIcon from '~/assets/icons/close-icon.svg?inline'
export default {
  name: 'PrivacyPolicyBanner',
  components: {
    CloseIcon,
  },
  data() {
    return {
      show: false,
      cookieName: 'privacy-policy-banner',
    }
  },
  created() {
    const cookieRes = this.$cookies.get(this.cookieName)
    if (!cookieRes) {
      this.show = true
    }
  },
  methods: {
    dismiss() {
      this.show = false
      this.$cookies.set(this.cookieName, 'cookie-value', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      })
    },
  },
}
</script>
