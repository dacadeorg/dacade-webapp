<template>
  <button
    class="
      outline-none
      focus:outline-none
      hover:outline-none
      cursor-pointer
      relative
    "
    :class="{
      'bg-primary text-white': type == 'primary',
      'lg:px-7 px-5': padding,
      'bg-secondary text-primary': type == 'secondary',
      'text-primary border border-solid border-primary bg-transparent hover:bg-primary hover:text-white':
        type == 'outline-primary',
      'text-secondary border border-solid border-secondary bg-transparent hover:bg-secondary hover:text-gray-900':
        type == 'outline-secondary',
      'text-white border border-solid border-white bg-transparent hover:bg-white hover:text-primary':
        type == 'outline-white',
      'rounded-full': rounded,
    }"
    :padding="[padding]"
    :margin="[margin]"
    :style="customStyle"
    v-on="inputListeners"
  >
    <!-- {{ text }} -->
    <slot />
  </button>
</template>

<script>
export default {
  name: 'DAButton',
  props: {
    text: {
      default: '',
      type: [Number, String],
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
      type: Boolean,
    },
    margin: {
      default: '',
      type: String,
    },
    customStyle: {
      default: null,
      type: Object,
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
        }
      )
    },
  },
}
</script>
