<template>
  <div class="relative">
    <div class="floating-input relative">
      <label
        :class="{
          'text-gray-400 flex items-center': !isFilled && !isFocused,
          'text-gray-400 scale-75 -translate-y-3 translate-x-1':
            isFocused || isFilled,
          'text-red-600': error,
          'text-blue-500': isFocused && !error,
        }"
        class="absolute top-0 left-0 text-lg px-5 py-5 z-10 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out items-center"
      >
        {{ label }}
      </label>
      <input
        :class="{
          'text-gray-400 scale-75 -translate-y-3 translate-x-1 bg-gray-50':
            disabled,
          'border-red-100': error,
          'focus:border-gray-200 border-gray-200': !error,
        }"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        class="rounded-md focus:outline-none focus:shadow-sm text-lg w-full"
        autocomplete="off"
        :disabled="disabled"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-on="inputListeners"
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
export default {
  props: {
    type: {
      default: 'text',
      type: String,
    },

    value: {
      default: '',
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
          input(event) {
            vm.$emit('input', event.target.value)
          },
        }
      )
    },
  },
}
</script>
