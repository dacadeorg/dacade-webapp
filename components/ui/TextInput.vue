<template>
  <div>
    <div class="floating-input relative">
      <label
        v-if="label"
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
      <!-- :placeholder="$t('communities.challenge.submission.placeholder.text')" -->
      <textarea
        :value="value"
        :placeholder="placeholder"
        autocomplete="off"
        :disabled="disabled"
        class="w-full border border-solid border-gray-200 h-56 resize-none m-0 pt-5 md:pt-7.5 pl-15 pr-2 md:px-10.75 block text-lg focus:outline-none placeholder-gray-400 placeholder-opacity-100"
        :class="[inputClass]"
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
      type: String,
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
    inputClass: {
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
      return this.value.trim().length > 0
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
