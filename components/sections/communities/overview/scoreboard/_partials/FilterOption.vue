<template>
  <!-- <div class="mt-2 mb-2"> -->
  <div class="mt-2 mb-2">
    <label class="inline-flex items-center">
      <Radio
        id="radio btn"
        v-model="vModalValue"
        :data="data"
        :required="true"
        :name="name"
        class="w-8"
      />
      <span :class="value ? 'font-medium' : 'font-normal'" class="ml-4">{{
        label
      }}</span>
    </label>
  </div>
</template>

<script>
import Radio from '~/components/ui/Radio.vue'
export default {
  name: 'FilterOption',
  components: { Radio },
  props: {
    label: {
      default: null,
      type: String,
    },
    value: {
      default: false,
      type: [Boolean, String, Object, Array, Number],
    },
    data: {
      default: "",
      type: String,
    },
    name: {
      default: null,
      type: String,
    },
  },
  computed: {
    vModalValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
}
</script>
