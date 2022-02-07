<template>
  <div
    class="group bg-gradient-to-trw-full relative"
    :class="[boxLayout ? 'p-6' : 'pl-5 md:pl-7.5']"
  >
    <nuxt-link :to="localePath(link)" :class="{ 'flex space-x-3': boxLayout }">
      <div
        class="z-10"
        :class="[boxLayout ? 'relative flex-none' : 'absolute top-0 left-0']"
      >
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
        class="relative z-0 flex-1"
        :class="[
          {
            'group-hover:border-gray-50 border-l border-solid border-gray-200':
              bordered,
            'pl-10.5 pb-12': !boxLayout,
          },
        ]"
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
import DateManager from '@/utilities/DateManager'
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
    boxLayout: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    date() {
      return DateManager.fromNow(this.timestamp.date)
    },
  },
}
</script>
