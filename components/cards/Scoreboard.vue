<template>
  <div
    class="relative w-full flex sm:space-x-5 space-y-0 sm:flex-row-reverse sm:space-x-reverse sm:justify-between overflow-hidden bg-gray-50 sm:p-7 py-5 px-6 sm:items-center"
  >
    <div class="sm:flex-none absolute bottom-5 left-6 sm:relative sm:inset-0">
      <div
        class="font-medium text-gray-500 px-2.5 py-0.5 h-6 text-xxs bg-gray-200 rounded-full"
      >
        <Currency :value="value.score" token="REP" />
      </div>
    </div>
    <div class="flex-1">
      <div class="text-lg font-medium">
        {{ value.user.displayName }}
      </div>
      <div class="flex flex-row divide-x divide-solid divide-gray-300">
        <div class="whitespace-nowrap text-base pr-4">
            <span class="font-medium text-xs">
              {{ value.feedbacks }}
              <span class="font-normal text-xs">
                {{ $t(value.feedbacks == 1 ? 'Submission' : 'Submissions') }}
              </span>
            </span>
          </div>
          <div class="whitespace-nowrap text-base px-4">
            <span class="font-medium text-xs">
              {{ value.score }}
              <span class="font-normal text-xs">
                {{ $t(value.score == 1 ? 'Total Point' : 'Total Points') }}
              </span>
            </span>
          </div>
          <div class="whitespace-nowrap text-base px-4">
            <span class="font-medium text-xs">
              {{ value.feedbacks }}
              <span class="font-normal text-xs">
                {{ $t(value.feedbacks == 1 ? 'Feedback' : 'Feedbacks') }}
              </span>
            </span>
          </div>

      </div>
  
    </div>

    <div class="relative sm:flex-none pt-9 sm:p-0">
      <div class="relative sm:inset-0">
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
