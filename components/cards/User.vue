<template>
  <div
    class="group bg-gradient-to-trw-full relative"
    :class="[
      boxLayout ? 'sm:p-6' : 'pl-5 sm:pl-7.5',
      { 'cursor-pointer': link, 'flex space-x-3': boxLayout },
    ]"
  >
    <div
      class="z-10"
      :class="[boxLayout ? 'relative flex-none' : 'absolute top-0 left-0']"
    >
    <Skeleton circle :loading="loading">
      <Avatar :user="user" size="medium" />
    </Skeleton>

    <Skeleton pill :loading="loading">
      <Badge
        v-if="badge"
        :value="badge"
        class="absolute"
        size="medium"
        :custom-style="{
          bottom: '-1px',
          right: '-3px',
          backgroundColor: colors.textAccent,
        }"
      />
    </Skeleton>
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
      @click="goToLink"
    >
      <div class="pb-4">
        <div class="flex items-center space-x-1.5 pb-1.5 pt-1">
          <Skeleton :loading="loading">
          <div class="text-lg leading-tight font-medium">
            {{ user.displayName }}
          </div>
          </Skeleton>
          <Skeleton pill :loading="loading" height="14px">
          <Tag v-if="user.reputation" type="light-gray" class="leading-tight"
            ><Currency :value="user.reputation" token="REP"
          /></Tag>
          </Skeleton>
        </div>
        <Skeleton :loading="loading">
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
        </Skeleton>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DateManager from '@/utilities/DateManager'
import Currency from '@/components/ui/Currency'
import Tag from '@/components/ui/Tag.vue'
import Skeleton from '@/components/ui/Skeleton.vue'

export default {
  name: 'UserCard',
  components: {
    Avatar,
    Currency,
    Badge,
    Tag,
    Skeleton
  },
  props: {
    loading: {
      default: true,
      type: Boolean
    },
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
      return DateManager.fromNow(this.timestamp.date, this.$i18n.locale)
    },
  },
  methods: {
    goToLink() {
      if (!this.link) return
      this.$router.push(this.localePath(this.link))
    },
  },
}
</script>
