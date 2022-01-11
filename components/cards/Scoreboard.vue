<template>
  <div
    class="
      h-36
      w-full
      md:h-24 md:flex
      space-x-5 space-y-0
      md:flex-row-reverse
      overflow-hidden
      bg-gray-50
      px-3
      items-center
    "
  >
    <div
      class="
        relative
        flex flex-row-reverse
        md:w-full md:justify-items-stretch md:relative md:text-right md:right-0
      "
    >
      <div
        class="
          absolute
          md:relative md:top-0
          -bottom-28
          md:-bottom-24
          font-medium
          text-gray-500
          left-5
          md:left-auto md:right-5
          px-2.5
          py-0.5
          h-6
          text-xxs
          bg-gray-200
          rounded-full
        "
      >
        <Currency :value="value.score" token="REP" />
      </div>
    </div>
    <div class="w-full md:w-auto">
      <div class="text-lg font-medium">
        {{ value.user.displayName }}
      </div>
      <div class="whitespace-nowrap text-base">
        <span class="font-medium text-xs">
          {{ value.feedbacks }}
          <span class="font-normal text-xs">
            {{ $t(value.feedbacks == 1 ? 'feedback' : 'feedbacks') }}
          </span>
        </span>
      </div>
    </div>

    <div class="relative">
      <div
        class="absolute md:relative right-2 md:-bottom-10 -bottom-14 md:top-0"
      >
        <Avatar :user="value.user" size="large" />
        <Badge
          class="absolute left-9 top-10 w-6 h-6 bg-theme-accent text-white"
          :value="index"
          :custom-style="{
            bottom: '-1px',
            right: '-3px',
            color: '#fff',
            backgroundColor: colors.textAccent,
          }"
        />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Currency from '@/components/ui/Currency'

export default {
  name: 'ScoreboardCard',
  components: {
    Avatar,
    Currency,
    Badge,
  },
  props: {
    value: {
      default: () => {
        return {}
      },
      type: Object,
    },
    index: {
      default: 0,
      type: Number,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
  },
}
</script>
