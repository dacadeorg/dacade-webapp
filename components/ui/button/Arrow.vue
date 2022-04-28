<template>
  <Button
    :padding="false"
    :community-styles="communityStyles"
    :class="['py-2 pl-5 pr-3.5', minWidthClass]"
    :disabled="disabled"
    :link="link"
    :loading="loading"
    :type="type"
    :custom-style="customStyle"
    :target="target"
    v-on="inputListeners"
  >
    <span class="flex text-left items-center justify-between">
      <span class="leading-6 pr-6"><slot /></span>
      <span>
        <ArrowRightIcon
          v-if="!loading"
          class="transform"
          :class="directionClass" />
        <Spinner v-else class="animate-spin"
      /></span>
    </span>
  </Button>
</template>
<script>
import Button from './index.vue'
import Spinner from '~/assets/icons/spinner.svg?inline'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'DAButton',
  components: {
    Button,
    Spinner,
    ArrowRightIcon,
  },
  props: {
    text: {
      default: '',
      type: [Number, String],
    },
    loading: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    rounded: {
      default: true,
      type: Boolean,
    },
    type: {
      default: 'primary',
      type: String,
    },
    padding: {
      default: true,
      type: [Boolean, String],
    },
    margin: {
      default: '',
      type: String,
    },
    customStyle: {
      default: null,
      type: Object,
    },
    link: {
      default: null,
      type: String,
    },
    target: {
      default: '_self',
      type: String,
    },
    communityStyles: {
      default: false,
      type: Boolean,
    },
    minWidthClass: {
      default: 'min-w-44',
      type: String,
    },
    direction: {
      default: 'right',
      type: String,
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
    directionClass() {
      switch (this.direction.toLowerCase()) {
        case 'left':
          return '-rotate-180'
        case 'down':
          return 'rotate-90'
        case 'up':
          return '-rotate-90'
        default:
          return ''
      }
    },
  },
}
</script>
