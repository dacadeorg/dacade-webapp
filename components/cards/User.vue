<template>
  <div class="group bg-gradient-to-trw-full pl-5 md:pl-7.5 relative">
    <nuxt-link :to="link">
      <div class="absolute left-1 top-1 z-10">
        <Avatar :user="user" size="medium" />
      </div>
      <div
        class="relative pl-10.5 z-0 pb-12"
        :class="{
          'group-hover:border-gray-50 border-l border-solid border-gray-200':
            bordered,
        }"
      >
        <div class="pb-4 pt-2">
          <span class="text-lg leading-loose font-medium">
            {{ user.displayName }}
          </span>
          <span
            class="
              text-xs
              px-2.5
              bg-secondary
              leading-none
              py-1
              rounded-full
              font-medium
            "
            >{{ Number(user.reputation || 0).toFixed(1) }} REP</span
          >
          <span class="block text-sm leading-snug text-gray-700">
            {{ timestamp.text }}
            <span
              class="font-medium"
              :style="{
                color: colors.textAccent,
              }"
              >{{ date }}</span
            >
          </span>
        </div>
        <slot />
      </div>
    </nuxt-link>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import Moment from 'moment'

export default {
  name: 'UserCard',
  components: {
    Avatar,
  },
  props: {
    user: {
      default: () => {
        return {}
      },
      type: Object,
    },
    timestamp: {
      default: () => {
        return {
          text: '',
          date: '',
        }
      },
      type: Object,
    },
    link: {
      default: '',
      type: String,
    },
    bordered: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    date() {
      return Moment(this.timestamp.date).fromNow()
    },
  },
}
</script>
