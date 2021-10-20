<template>
  <div class="relative">
    <div class="floating-input relative">
      <label
        class="
          text-gray-400
          scale-75
          -translate-y-3
          translate-x-1
          absolute
          top-0
          left-0
          text-lg
          px-5
          py-5
          z-10
          h-full
          pointer-events-none
          transform
          origin-left
          transition-all
          duration-100
          ease-in-out
          items-center
        "
      >
        {{ label }}
      </label>
      <Button
        type="outline-primary"
        class="absolute top-0 right-0 z-20 items-center mr-2 mt-4"
      >
        copy
      </Button>
      <input
        :class="{
          'text-gray-200 scale-75 -translate-y-3 translate-x-1 bg-gray-400':
            disabled,
          'border-red-100': error,
          'focus:border-gray-200': !error,
        }"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="rounded-md focus:outline-none focus:shadow-sm text-lg w-full"
        :disabled="disabled"
      />
    </div>
    <div v-if="error" class="bg-red-50 help text-sm text-red-900 px-5 py-1.5">
      <p>
        {{ error }}
      </p>
    </div>
  </div>
</template>
<script>
import Button from './ButtonCopy.vue'
export default {
  components: { Button },
  props: {
    type: {
      default: 'text',
      type: String,
    },

    value: {
      default: 'https://www.dacade.org/invite/paul-123',
      type: [String, Number],
    },

    label: {
      default: null,
      type: String,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      default: null,
      type: String,
    },

    error: {
      default: null,
      type: String,
    },
  },

  data() {
    return {
      isFocused: false,
    }
  },

  computed: {
    isFilled() {
      return String(this.value)?.trim().length > 0
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
          input(props) {
            vm.$emit('input', props.value)
          },
        }
      )
    },
  },
}
</script>
