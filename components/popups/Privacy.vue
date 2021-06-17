<template>
  <div>
    <span>
      <div
        v-show="show"
        :style="{
          width: '100%',
          height: '80px',
          overflow: 'hidden scroll',
        }"
        class="
          z-50
          fixed
          bottom-0
          bg-blue-600
          text-white
          no-scrollbar
          text-xs
          flex flex-row
          justify-between
          content-center
        "
      >
        <div></div>
        <div div class="flex self-center justify-self-right">
          <span>
            We use browser cookies to give you the best possible experience.
            Learn about our
            <nuxt-link class="underline" to="/privacy-policy">{{
              $t('signup-page.privacy')
            }}</nuxt-link>
          </span>
        </div>

        <div class="flex justify-self-end pr-4">
          <Button @click="closeModal">
            <font-awesome-icon
              :icon="['far', 'times-circle']"
              class="flex text-3xl outline-none bg-transparent opacity-50"
            />
          </Button>
        </div>
      </div>
    </span>
    <div v-if="show" class="opacity-25 fixed inset-0 z-30 bg-black" />
  </div>
</template>

<script>
export default {
  name: 'NotificationPopup',
  fetchOnServer: false,
  data() {
    return {
      show: true,
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
    closeModal(event) {
      if (this.show) {
        this.show = false
        this.$cookies.set(this.cookieName, 'cookie-value', {
          path: '/',
          maxAge: 60 * 60 * 24 * 365,
        })
      }
    },
  },
}
</script>
