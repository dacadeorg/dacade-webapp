<template>
  <div
    class="relative w-full flex sm:space-x-5 space-y-0 sm:flex-row-reverse sm:space-x-reverse sm:justify-between overflow-hidden bg-gray-50 sm:p-7 py-5 px-6 sm:items-center"
  >
    <div class="sm:flex-none absolute bottom-5 left-6 sm:relative sm:inset-0">
      <Skeleton :loading="loading" pill>
      <div
        class="font-medium text-gray-500 px-2.5 py-0.5 h-6 text-xxs bg-gray-200 rounded-full"
      >
        <Currency :value="value.score" token="REP" />
      </div>
      </Skeleton>
    </div>
    <div class="flex-1">
      <Skeleton :loading="loading">
      <div class="text-lg font-medium">
        {{ value.user.displayName }}
      </div>
      </Skeleton>
      <div class="whitespace-nowrap text-base">
        <Skeleton :loading="loading">
        <span class="font-medium text-xs">
          {{ value.feedbacks }}
          <span class="font-normal text-xs">
            {{ $t(value.feedbacks == 1 ? 'feedback' : 'feedbacks') }}
          </span>
        </span>
        </Skeleton>
      </div>
    </div>

    <div class="relative sm:flex-none pt-9 sm:p-0">
      <div class="relative sm:inset-0">
        <Skeleton :loading="loading" circle>
          <Avatar :user="value.user" size="large" />
        </Skeleton>
        <Skeleton circle :loading="loading">
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
        </Skeleton>
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
import Skeleton from '~/components/ui/Skeleton.vue'

export default {
  name: 'ScoreboardCard',
  components: {
    Avatar,
    Currency,
    Badge,
    Skeleton
  },
  props: {
    loading:{
      default: true,
      type: Boolean
    },
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
