<template>
  <input
    :id="id"
    v-model="checkedValue"
    class="w-5 h-5 bg-gray-100 rounded border-gray-300 border-gray-200 text-primary cursor-pointer"
    :name="name"
    :required="required"
    :style="styles"
    size="small"
    type="checkbox"
    v-on="inputListeners"
  />
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: 'Checkbox',
  props: {
    checked: {
      default: false,
      type: Boolean,
    },
    value: {
      default: false,
      type: Boolean,
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
      type: Boolean
    }
  },
  data() {
    return {
      checkedValue: this.checked,
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    styles() {
      if (!this.communityStyles) {
        return null;
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
  },
  watch: {
    checkedValue(newValue) {
      this.$emit('input', newValue)
    },
    checked(newValue) {
      this.checkedValue = newValue
    }
  }
}
</script>
