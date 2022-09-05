<template>
  <div
    :style="{
      width: 'calc(100vw - 40px)',
      maxWidth: '340px',
      maxHeight: 'calc(100vh - 100px)',
      overflow: 'hidden scroll',
      padding: '16px',
    }"
    class="absolute top-14 right-0 z-40 bg-white rounded-3.5xl no-scrollbar text-gray-900"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DropdownPopup',
  methods: {
    toggleInvite() {
      this.$emit('close')
      this.$store.dispatch('ui/toggleShowReferralPopup', true)
    },
  },
}
</script>
