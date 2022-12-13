<template>
  <!-- <div class="mt-2 mb-2"> -->
  <div class="mt-2 mb-2">
    <label class="inline-flex items-center">
      <Radio
        id="filter-month"
        v-model="checked"
        :required="true"
        name="month"
        class="w-8"
      />
      <span :class="!checked ? 'font-normal' : 'font-medium'" class="ml-4">{{ label }}</span>
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
  },
  data() {
    return {
      checked: false,
    }
  },
}
</script>