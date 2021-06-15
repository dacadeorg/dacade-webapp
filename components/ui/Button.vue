<template>
  <button
    class="
      outline-none
      focus:outline-none
      hover:outline-none
      cursor-pointer
      relative
    "
    type="submit"
    :class="{
      'bg-primary hover:bg-primary-dark  text-white': type == 'primary',
      'lg:px-7 px-5': padding,
      'bg-secondary text-primary': type == 'secondary',
      'text-primary border border-solid border-primary bg-transparent hover:bg-primary hover:text-white':
        type == 'outline-primary',
      'text-secondary border border-solid border-secondary bg-transparent hover:bg-secondary hover:text-gray-900':
        type == 'outline-secondary',
      'text-white border border-solid border-white bg-transparent hover:bg-white hover:text-primary':
        type == 'outline-white',
      'text-gray-400 border border-solid border-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-200':
        type == 'outline-gray',
      'bg-transparent text-primary': type == 'link',
      'rounded-full': rounded,
    }"
    :padding="[padding]"
    :margin="[margin]"
    :style="customStyle"
    v-on="inputListeners"
  >
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
