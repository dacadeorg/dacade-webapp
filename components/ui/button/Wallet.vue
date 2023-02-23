<template>
  <button
    :disabled="disabled"
    :link="link"
    :loading="loading"
    :type="type"
    :custom-style="customStyle"
    :target="target"
    :variant="variant"
    class="py-5.5 pl-5 pr-3.5 w-full rounded-none text-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-200"
    v-on="inputListeners"
  >
    <span class="flex h-full text-left items-center justify-between">
      <span class="leading-6 block" :class="{ 'pr-6': !isLeft && hasSlot }"
        ><slot
      /></span>
      <span v-if="!isLeft" class="block">
        <ArrowRightIcon
          v-if="!loading"
          :class="[directionClass, arrowClasses, 'transform']" />
        <Spinner v-else :class="[arrowClasses, 'animate-spin']"
      /></span>
    </span>
  </button>
</template>
<script>
import Spinner from '~/assets/icons/spinner.svg?inline'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'WalletButton',
  components: {
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
    variant: {
      default: 'submit',
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
    arrowClasses: {
      default: '',
      type: String,
    },
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default
    },
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
