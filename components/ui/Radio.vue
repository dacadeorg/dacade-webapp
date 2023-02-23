<template>
  <input
    :id="id"
    ref="input"
    v-model="vModalValue"
    :value="data"
    :class="[
      'w-9 h-9 rounded border-gray-400 text-primary rounded-full',
      disabled ? 'cursor-not-allowed border-4' : 'cursor-pointer',
    ]"
    :name="name"
    :required="required"
    :style="styles"
    size="medium"
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
    this.handleCheck()
  },
  methods: {
    handleCheck() {
      if (this.checked) {
        this.$refs.input.checked = this.checked
        return
      }
      if (this.value === this.data) {
        this.$refs.input.checked = true
      }
    },
  },
}
</script>
