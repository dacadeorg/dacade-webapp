<template>
  <div class="group bg-gradient-to-trw-full pl-5 md:pl-7.5 relative">
    <nuxt-link :to="link">
      <div class="absolute top-0 left-0 z-10">
        <Avatar :user="user" size="medium" />
        <Badge
          v-if="badge"
          :value="badge"
          size="medium"
          :custom-style="{
            bottom: '-1px',
            right: '-3px',
            backgroundColor: colors.textAccent,
          }"
        />
      </div>
      <div
        class="relative pl-10.5 z-0 pb-12"
        :class="{
          'group-hover:border-gray-50 border-l border-solid border-gray-200':
            bordered,
        }"
      >
        <div class="pb-4">
          <span class="text-lg leading-loose font-medium">
            {{ user.displayName }}
          </span>
          <span
            v-if="user.reputation"
            class="
              text-xs
              px-2.5
              bg-secondary
              leading-none
              py-1
              rounded-full
              font-medium
            "
            ><Currency :value="user.reputation" token="REP"
          /></span>
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
import Badge from '@/components/ui/Badge'
import Moment from 'moment'
import Currency from '@/components/ui/Currency'

export default {
  name: 'UserCard',
  components: {
    Avatar,
    Currency,
    Badge,
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
    badge: {
      default: 0,
      type: Number,
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
