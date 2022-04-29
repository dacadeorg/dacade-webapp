<template>
  <div class="flex items-center w-full">
    <div class="flex-none pl-3.75">
      <GithubIcon
        class="relative flex-none text-gray-400 m-0 p-0 block -mt-0.5"
      />
    </div>
    <div class="relative flex-1 pl-2 pr-10.75">
      <label
        :class="{
          'text-gray-400 flex items-center': !isFilled && !isFocused,
          'text-gray-400 scale-75 -translate-y-3 translate-x-1':
            isFocused || isFilled,
          'text-red-600': error,
          'text-blue-500': isFocused && !error,
        }"
        class="absolute top-0 left-0 text-lg px-0 py-5 z-10 w-full h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out outline-none border-none items-center"
      >
        {{ label }}
      </label>
      <!-- 'focus:border-gray-200': !error, -->
      <input
        :class="{
          'text-gray-400 scale-75 -translate-y-3 translate-x-1 bg-gray-50':
            disabled,
          'border-red-100': error,
        }"
        :value="value"
        type="text"
        :placeholder="placeholder"
        class="rounded-b w-full focus:outline-none active:outline-none active:shadow-none focus:shadow-none px-0 h-16.25 border-none focus:border-none outline-none active:border-none text-lg active:border-0 leading-7"
        autocomplete="off"
        :disabled="disabled"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-on="inputListeners"
      />
      <div v-if="error" class="absolute -bottom-7 help text-sm text-red-900">
        <p>
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import GithubIcon from '~/assets/icons/github.svg?inline'
export default {
  components: {
    GithubIcon,
  },
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

    isGithubLink: {
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
