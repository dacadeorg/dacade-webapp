<template>
  <div
    class="
      flex
      h-36
      w-full
      md:h-24 md:flex
      space-x-5 space-y-0
      md:flex-row-reverse
      overflow-hidden
      bg-gray-50
      px-3
      items-center
      justify-center
    "
  >
    <Button class="py-2 leading-tight px-5" :custom-style="buttonStyle">
      <span class="inline-block align-middle text-sm">{{
        $t('course.scoreboard.button')
      }}</span>
      <span class="inline-block align-middle">
        <ArrowRightIcon class="ml-7 text-accent group-hover:text-white" />
      </span>
    </Button>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Button from '@/components/ui/Button'
import ArrowRightIcon from '~/assets/icons/arrow-down.svg?inline'

export default {
  name: 'ScoreboardCard',
  components: {
    Button,
    ArrowRightIcon,
  },
  props: {
    // value: {
    //   default: () => {
    //     return {}
    //   },
    //   type: Object,
    // },
    // index: {
    //   default: 0,
    //   type: Number,
    // },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),

    buttonStyle() {
      return {
        color: this.colors.textAccent,
        borderColor: this.colors.textAccent,
        border: '1px solid',
        backgroundColor: 'transparent',
      }
    },
  },
}
</script>
