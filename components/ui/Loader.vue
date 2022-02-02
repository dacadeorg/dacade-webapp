<template>
  <div
    class="
      h-15
      w-15
      rounded-full
      border border-solid
      cursor-pointer
      flex
      items-center
      justify-center
      text-gray-400
    "
    :class="{ 'bg-gray-50': loading, 'hover:bg-gray-200': !loading }"
    v-on="inputListeners"
  >
    <RefreshIcon :class="{ 'spinning-animation': loading }" />
  </div>
</template>
<script>
import RefreshIcon from '~/assets/icons/refresh.svg?inline'
export default {
  name: 'DALoader',
  components: {
    RefreshIcon,
  },
  props: {
    loading: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    inputListeners() {
      const vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          input(event) {
            vm.$emit('input', event.target.value)
          },
          click(event) {
            if (!vm.link) {
              vm.$emit('click', event)
              return
            }
            vm.navigate()
          },
        }
      )
    },
  },
}
</script>
