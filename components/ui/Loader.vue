<template>
  <div
    class="flex items-center justify-center"
    :class="{ 'text-primary': !communityStyles }"
    :style="{
      ...(communityStyles ? styles : {}),
    }"
    v-on="inputListeners"
  >
    <Spinner class="animate-spin h-12 w-12" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Spinner from '~/assets/icons/spinner.svg?inline'
export default {
  name: 'Loader',
  components: {
    Spinner,
  },
  props: {
    communityStyles: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
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
    styles() {
      return {
        color: this.colors.textAccent,
      }
    },
  },
}
</script>
