<template>
  <div
    class="
      cursor-pointer
      flex
      md:flex-row-reverse md:space-x-5
      px-5
      min-h-32
      md:h-auto md:w-full
      justify-between
      hover:bg-secondary
      relative
      rounded-xl
    "
  >
    <div
      class="
        bg-theme-accent
        flex-col
        w-full
        h-full
        justify-between
        md:-space-y-1
        pl-3
        pr-5
        mt-7
        mb-5
      "
    >
      <div
        class="relative w-full md:flex md:justify-between"
        @click="goToChallenge(bounty)"
      >
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
          <Reward type="gray" :reward="reward" />
        </div>
      </div>
      <div
        v-if="bounty.submissions"
        class="mt-4 space-y-0 divide-y divide-y-gray-500"
      >
        <nuxt-link
          v-for="submission in bounty.submissions"
          :key="submission.id"
          :to="`/communities/${bounty.slug}/submissions/${submission.id}`"
          class="flex space-x-1 relative text-sm font-medium py-3"
        >
          <div class="flex justify-between w-full pr-0">
            <div class="flex space-x-1">
              <Avatar
                :user="submission.user"
                size="mini"
                style="font-size: 14px"
              />
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
              {{ $t('bounties.prefix.closes') }}
              {{ convertDate(submission.reviewDeadline) }}
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="self-start relative mt-15 md:mt-7">
      <Avatar
        class="w-15 h-15 rounded-xl overflow-hidden"
        :icon="bounty.icon"
        :image="bounty.image"
        :color="bounty.colors.primary"
        size="medium-fixed"
        shape="rounded"
      />
      <Badge
        v-if="bounty.submissions && bounty.submissions.length"
        class="bottom-0 -right-1"
        :custom-style="{
          bottom: '0',
          right: '-4px',
          fontSize: 14,
          backgroundColor: bounty.colors.accent,
        }"
        size="medium"
        :value="bounty.submissions.length"
      />
    </div>
  </div>
</template>

<script>
import Reward from '@/components/badges/Reward'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DateManager from '@/utilities/DateManager'

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
      if (this.bounty?.submissions?.length) {
        return this.bounty.rewards.find((reward) => reward.type === 'FEEDBACK')
      }
      return this.bounty.rewards.find((reward) => reward.type === 'SUBMISSION')
    },
    type() {
      if (!this.bounty?.submissions?.length) {
        return 'Challenge'
      }
      return 'Waiting for Feedbacks'
    },
  },
  methods: {
    convertDate(date) {
      return DateManager.fromNow(date)
    },
    goToChallenge(bounty) {
      if (bounty.link) {
        window.open(bounty.link)
        return
      }
      return this.$router.push(
        `/communities/${bounty.slug}/challenges/${bounty.challenge}`
      )
    },
  },
}
</script>
