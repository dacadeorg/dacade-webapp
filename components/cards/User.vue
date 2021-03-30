<template>
  <div class="w-full pl-7.5 relative">
    <div class="absolute left-0 top-0 z-10">
      <Avatar :user="user" size="medium" />
    </div>
    <div
      class="relative pl-10.5 z-0 pb-24"
      :class="{'border-l border-solid border-grey-200': bordered}"
    >
      <div class="pb-4 pt-2">
        <nuxt-link :to="link">
          <span class="text-lg leading-normal font-medium">
            {{ user.displayName }}
          </span>
          <span
            class="text-xs px-2.5 bg-secondary leading-none py-1 rounded-full font-medium"
          >45 REP</span>
          <span
            class="block text-sm leading-snug"
          >
            {{ timestamp.text }}
            <span
              class="font-semi-bold"
              :style="{
                color: colors.textAccent
              }"
            >{{ date }}</span>
          </span>
        </nuxt-link>
      </div>
      <slot />
    </div>
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
    Avatar
  },
  props: {
    user: {
      default: () => {
        return {}
      },
      type: Object
    },
    timestamp: {
      default: () => {
        return {
          text: '',
          date: ''
        }
      },
      type: Object
    },
    link: {
      default: '',
      type: String
    },
    bordered: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current'
    }),
    date () {
      return Moment(this.timestamp.date).fromNow()
    }
  }
}
</script>
