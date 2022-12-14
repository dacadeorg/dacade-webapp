<template>
  <!-- <div class="mt-2 mb-2"> -->
  <div class="mt-2 mb-2">
    <label class="inline-flex items-center">
      <Radio
        id="radio btn"
        v-model="checked"
        :required="true"
        name="radio btn"
        class="w-8"
      />
      <span :class="checked ? 'font-medium' : 'font-normal'" class="ml-4">{{ label }}</span>
      <!-- <span :class="checked ? 'font-medium' : 'font-normal'" class="ml-4">{{ checked }}</span> -->

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
      select: {
      default: false,
      type: Boolean,
    }
  },
  data() {
    return {
      checked: !this.select,
    }
  },
}
</script>