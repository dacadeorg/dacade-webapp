<template>
  <input
    :id="id"
    ref="input"
    v-model="vModalValue"
    :value="data"
    :class="[
      'w-5 h-5 bg-gray-100 rounded border-gray-200 text-primary rounded-full',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    ]"
    :name="name"
    :required="required"
    :style="styles"
    size="small"
    type="radio"
    :disabled="disabled"
  />
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Radio',
  props: {
    checked: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    value: {
      default: false,
      type: [Boolean, String, Object, Array, Number],
    },
    data: {
      default: true,
      type: [Boolean, String, Object, Array, Number],
    },
    required: {
      default: false,
      type: Boolean,
    },
    id: {
      default: null,
      type: String,
    },
    name: {
      default: null,
      type: String,
    },
    communityStyles: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    styles() {
      if (!this.communityStyles) {
        return null
      }
      return {
        color: this.colors.textAccent,
      }
    },
    inputListeners() {
      // const vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign(
        {},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {}
      )
    },
    vModalValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  watch: {
    checked(newValue) {
      // this.checkedValue = newValue
      this.$refs.input.checked = newValue
    },
  },
  mounted() {
    this.$refs.input.checked = this.checked
  },
}
</script>
