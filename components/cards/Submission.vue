<template>
  <div class="w-full pl-7.5 relative">
    <div class="absolute left-0 top-0 z-10">
      <Avatar :user="submission.user" size="medium" />
    </div>
    <div
      class="border-l border-solid border-grey-200 relative pl-10.5 z-0 pb-24"
    >
      <div class="pb-4 pt-2">
        <nuxt-link :to="url">
          <span class="text-lg leading-normal font-medium">
            {{ submission.user.displayName }}
          </span>
          <span
            class="text-xs px-2.5 bg-secondary leading-none py-1 rounded-full font-medium"
          >45 REP</span>
          <span
            class="block text-sm leading-snug"
          >Submitted
            <span
              class="font-semi-bold"
              :style="{
                color: colors.textAccent
              }"
            >{{ date }}</span>
          </span>
        </nuxt-link>
      </div>
      <p class="text-lg leading-normal">
        {{ submission.text }}
      </p>
      <div class="flex items-center mt-4">
        <Badge :custom-style="badgeStyles" size="medium" class="relative left-0">
          {{ submission.points }}
        </Badge>
        <span class="ml-3 text-sm">Points</span>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Moment from 'moment'

export default {
  name: 'SubmissionCard',
  components: {
    Avatar,
    Badge
  },
  props: {
    submission: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current'
    }),
    date () {
      return Moment(this.submission.date).fromNow()
    },
    badgeStyles () {
      return {
        backgroundColor: this.colors.textAccent,
        color: this.colors.text
      }
    },
    url () {
      return `/communities/${this.$route.params.slug}/submissions/${this.submission.id}`
    }
  }
}
</script>
