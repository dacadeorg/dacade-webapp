<template>
  <div class="cookieAlert">
    <b-alert
      v-if="show"
      show
      variant="warning"
      dismissible
      class="cookieAlert__container"
      @dismissed="dismiss"
    >
      We use browser cookies to give you the best possible experience. Learn more about our
      <a href="http://policy.dacade.org/" class="alert-link">Privacy Policy</a>.
    </b-alert>
  </div>
</template>
<script>
export default {
  name: 'PrivacyPolicyBanner',
  data () {
    return {
      show: false,
      cookieName: 'privacy-policy-banner'
    }
  },
  created () {
    const cookieRes = this.$cookies.get(this.cookieName)
    if (!cookieRes) {
      this.show = true
    }
  },
  methods: {
    dismiss () {
      this.$cookies.set(this.cookieName, 'cookie-value', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.cookieAlert{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  text-align: center;
  &__container{
    display: inline-block;
  }
}
</style>
