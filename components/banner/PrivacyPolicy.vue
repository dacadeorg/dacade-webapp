<template>
  <div
    v-if="showBanner"
    class="
      fixed
      bottom-0
      left-0
      right-0
      z-999
      flex flex-row
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
        text-center
        lg:text-base
        text-sm
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
        absolute
        lg:relative
        lg:p-6
        md:py-0
        lg:justify-center
        top-0
        lg:right-0
        right-1
        items-center
      "
      @click="acceptCookiePolicy"
    >
      <div
        class="
          z-50
          h-8
          lg:w-8
          w-5
          flex
          items-center
          text-white
          rounded-full
          lg:border-solid lg:border lg:border-white
          hover:bg-blue-700
          bg-transparent
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
