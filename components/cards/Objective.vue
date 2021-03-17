<template>
  <div class="flex">
    <div
      class="mr-2 pt-px mt-px"
      :style="{
        color: colors.textAccent
      }"
    >
      <Checkmark />
    </div>
    <div class="text-sm text-gray-700 leading-5">
      {{ objective }}
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Checkmark from '~/assets/icons/checkmark.svg?inline'

export default {
  name: 'ObjectiveCard',
  components: {
    Checkmark
  },
  props: {
    objective: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors'
    })
  }
}
</script>
