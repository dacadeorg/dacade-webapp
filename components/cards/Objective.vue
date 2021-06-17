<template>
  <div class="flex">
    <div
      class="mr-2 py-0 pt-px mt-px"
      :style="{ color: iconcolor || colors.primary }"
    >
      <div v-if="crossmark">
        <Crossmark />
      </div>
      <div v-else>
        <Checkmark />
      </div>
    </div>
    <div class="text-sm font-normal leading-5" v-html="objective" />
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Checkmark from '~/assets/icons/checkmark.svg?inline'
import Crossmark from '~/assets/icons/crossmark.svg?inline'

export default {
  name: 'ObjectiveCard',
  components: {
    Checkmark,
    Crossmark,
  },
  props: {
    iconcolor: {
      type: String,
      default: '',
    },
    crossmark: {
      type: Boolean,
      default: false,
    },
    objective: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
  },
}
</script>
