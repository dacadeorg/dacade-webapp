<template>
  <div>
    <div
      v-click-outside="externalClick"
      class="inline-block opacity-70 hover:opacity-100 text-sm ml-3 cursor-pointer"
      @click="toggle"
    >
      <span class="inline-block uppercase">{{
        currentLocale
      }}</span>
      <span class="inline-block"><ArrowDown /></span>
    </div>

    <DropdownPopup v-show="show" @close="externalClick"
      ><LanguageList
    /></DropdownPopup>
    <div v-if="show" class="opacity-25 fixed inset-0 z-30 bg-black" />
  </div>
</template>
<script>
import LanguageList from '@/components/list/Language'
import DropdownPopup from '@/components/ui/DropdownPopup'
import ArrowDown from '~/assets/icons/down-icon-arrow.svg?inline'

export default {
  name: 'LanguageSwitcherPopup',

  components: {
    ArrowDown,
    DropdownPopup,
    LanguageList,
  },

  data() {
    return {
      show: false,
    }
  },

  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
  },

  methods: {
    toggle() {
      this.show = !this.show
      this.$store.dispatch('ui/toggleBodyScrolling', this.show)
    },
    toggleInvite() {
      this.$emit('close')
      this.$store.dispatch('ui/toggleShowReferralPopup', true)
    },
    externalClick() {
      if (this.show) {
        this.show = false
        this.$store.dispatch('ui/toggleBodyScrolling', this.show)
      }
    },
  },
}
</script>

