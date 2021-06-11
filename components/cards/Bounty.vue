<template>
  <nuxt-link :to="`/communities/${bounty.slug}/challenges/${bounty.challenge}`">
    <div
      class="
        sm:flex
        md:flex-row-reverse
        md:space-x-5
        px-5
        md:px-0
        pt-5
        min-h-32
        md:h-auto
        md:w-full
        justify-between
        relative
      "
    >
      <div
        class="flex-col w-full h-full justify-between md:-space-y-1 pl-3 pr-5"
      >
        <div class="relative w-full md:flex md:justify-between">
          <div class="font-medium text-md mb-2">
            {{ bounty.name }}
          </div>
        </div>
        <div
          class="
            inline-flex
            md:flex
            h-2/3
            md:flex-row
            flex-col-reverse
            justify-between
          "
        >
          <div class="text-sm pt-8 md:pt-2 md:pb-4 text-gray-600">
            {{ type }}
          </div>
          <div>
            <Reward :value="reward.amount" :denom="reward.token" />
          </div>
        </div>
        <div
          v-if="bounty.submissions"
          class="
            mt-4
            space-y-0
            divide-y divide-y-gray-500
            border-t border-t-gray-500
          "
        >
          <nuxt-link
            v-for="submission in bounty.submissions"
            :key="submission.id"
            :to="`/communities/${bounty.slug}/submissions/${submission.id}`"
            class="flex space-x-1 relative text-sm font-medium py-3"
          >
            <div class="flex justify-between w-full pr-0">
              <div class="flex space-x-1">
                <Avatar :user="submission.user" size="mini" />
                <div>{{ submission.user.displayName }}</div>
                <div
                  class="
                    flex
                    align-middle
                    text-gray-500 text-middle
                    bg-gray-200
                    px-2
                    text-xxs
                    rounded-xl
                    m-0
                    h-5
                  "
                >
                  {{ submission.feedbacks }}
                </div>
              </div>
              <div class="text-gray-500 text-base font-normal">
                closes {{ convertDate(submission.reviewDeadline) }}
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div
        class="
          self-start
          md:relative
          absolute
          right-8
          top-15
          md:top-0
          md:right-0
        "
      >
        <Avatar
          class="w-15 h-15"
          :icon="bounty.icon"
          :color="bounty.colors.primary"
          size="medium-fixed"
          shape="rounded"
        />
        <Badge
          v-if="bounty.submissions.length"
          :custom-style="{
            bottom: '2px',
            right: '-4px',
            fontSize: 14,
            backgroundColor: bounty.colors.accent,
          }"
          size="medium"
          :value="bounty.submissions.length"
        />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import Reward from '@/components/badges/Reward'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Moment from 'moment'

export default {
  name: 'Bounty',
  components: {
    Reward,
    Avatar,
    Badge,
  },
  props: {
    bounty: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    reward() {
      if (this.bounty.submissions.length) {
        return this.bounty.rewards.find((reward) => reward.type === 'FEEDBACK')
      }
      return this.bounty.rewards.find((reward) => reward.type === 'SUBMISSION')
    },
    type() {
      if (!this.bounty.submissions.length) {
        return 'Challenge'
      }
      return 'Waiting for Feedbacks'
    },
  },
  methods: {
    convertDate(date) {
      return Moment(date).fromNow()
    },
  },
}
</script>
