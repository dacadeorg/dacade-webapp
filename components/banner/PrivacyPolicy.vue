<template>
  <div
    v-if="showBanner"
    class="
      fixed
      bottom-0
      left-0
      right-0
      z-999
      flex flex-col
      md:flex-row
      justify-center
      md:justify-between
      bg-primary
    "
  >
    <div></div>
    <div
      variant="warning"
      class="
        text-white
        py-8
        text-center text-base
        md:text-lg
        justify-center
        md:max-w-none
        px-6
      "
    >
      We use browser cookies to give you the best possible experience. Learn
      more about our
      <a href="/privacy-policy" class="underline">{{
        $t('signup-page.privacy')
      }}</a
      >.
    </div>
    <div
      class="
        flex
        md:text-center
        md:content-center
        md:mr-6
        mb-6
        md:mb-0
        md:mt-6
        justify-center
      "
      @click="acceptCookiePolicy"
    >
      <div
        class="
          z-50
          h-8
          w-8
          flex
          items-center
          text-white
          rounded-full
          border-solid border border-white
          hover:bg-blue-700
          cursor-pointer
          place-content-center
        "
      >
        <CloseIcon />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CloseIcon from '~/assets/icons/close-icon.svg?inline'
export default {
  name: 'PrivacyPolicyBanner',
  components: {
    CloseIcon,
  },
  computed: {
    ...mapGetters({
      showBanner: 'banners/showCookiePolicy',
    }),
  },
  created() {
    this.checkCookiePolicy()
  },
  methods: {
    ...mapActions({
      checkCookiePolicy: 'banners/checkCookiePolicy',
      acceptCookiePolicy: 'banners/acceptCookiePolicy',
    }),
  },
}
</script>
