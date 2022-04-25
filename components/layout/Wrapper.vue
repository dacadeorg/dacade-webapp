<template>
  <div class="relative w-full h-full">
    <slot></slot>
    <ReferralPopup v-show="showReferral" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ReferralPopup from '@/components/popups/referral'

export default {
  components: {
    ReferralPopup,
  },
  computed: {
    ...mapGetters({
      showReferral: 'ui/showReferralPopup',
    }),
  },
  created() {
    this.$store.dispatch('ui/unlockBodyScrolling')
  },
}
</script>
