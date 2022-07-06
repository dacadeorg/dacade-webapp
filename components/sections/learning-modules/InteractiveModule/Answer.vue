<template>
  <div
    :class="['my-5 relative border-2 rounded cursor-pointer select-none flex flex-col divide-y-2 divide-solid', borderColor]"
    role="button"
    @click="$emit('select', true)">
    <div
      class="flex items-center space-x-3 relative z-50 w-full md:p-4.5 p-4 border-solid bg-transparent checked-color"
    >
      <span><Checkbox :checked="selected" community-styles /></span>
      <span class="text-gray-500"
      >{{ data.text }}</span
      >
    </div>
    <div
      v-if="selected"
      :class="['w-full p-2.5 px-4 md:px-4.5 z-10 text-sm', bannerColor]"
    >
      {{ correct ? 'Well done!' : 'This answer is wrong. Try again.' }}
    </div>
  </div>
</template>
<script>
import Checkbox from "~/components/ui/Checkbox";

export default {
  name: 'InteractiveModuleAnswer',
  components: {
    Checkbox,
  },
  props: {
    checked: {
      default: false,
      type: Boolean,
    },
    correct: {
      default: false,
      type: Boolean,
    },
    selected: {
      default: false,
      type: Boolean,
    },
    data: {
      default: null,
      type: Object
    }
  },
  computed: {
    borderColor() {
      if (!this.selected) {
        return 'border-gray-200';
      }
      if (this.correct) {
        return 'border-green-200 divide-green-200';
      }
      return 'border-red-200 divide-red-200';
    },
    bannerColor(){
      if (!this.selected) {
        return null;
      }
      if (this.correct) {
        return 'bg-green-100 text-green-600';
      }
      return 'bg-red-100 text-red-900';
    }
  }
}
</script>
