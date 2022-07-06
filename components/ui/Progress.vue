<template>
  <div class="bg-green-100 h-3 rounded-lg">
    <div
      :style="{
        backgroundColor: colors.textAccent,
      }"
      class="h-full w-24 rounded-lg"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Progress',
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
  },
}
</script>
