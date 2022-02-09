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
      <div class="relative w-full" @click="goToChallenge(bounty)">
        <div class="font-medium text-md mb-2">
          {{ bounty.course ? bounty.course.name : bounty.name }}
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
        @click="goToChallenge(bounty)"
      >
        <div class="text-sm pt-8 md:pt-2 md:pb-4 text-gray-600">
          {{ type }}
        </div>
        <div>
          <Reward type="gray" :reward="bounty.reward" />
        </div>
      </div>
      <div
        v-if="bounty.submissions && bounty.submissions.length"
        class="
          mt-4
          space-y-0
          divide-y divide-gray-200
          border-t border-t-solid border-gray-200
        "
      >
        <nuxt-link
          v-for="submission in bounty.submissions"
          :key="submission.id"
          :to="
            localePath(
              $navigation.community.submissionsPath(
                submission.id,
                bounty.challenge,
                bounty.course.slug,
                bounty.slug
              )
            )
          "
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
                {{ submission.metadata ? submission.metadata.feedbacks : 0 }}
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
    <div
      class="self-start relative mt-15 md:mt-7"
      @click="goToChallenge(bounty)"
    >
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
        class="bottom-0 -right-1 absolute"
        :custom-style="{
          bottom: '0',
          right: '-4px',
          fontSize: 14,
          backgroundColor: bounty.colors.accent,
        }"
        size="medium"
        :value="bounty.totalSubmissions"
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
    type() {
      if (this.bounty.reward.type === 'SUBMISSION') {
        return this.$t('bounties.reward.challenge')
      }
      return this.$t('bounties.reward.feedback')
    },
    isChallenge() {
      return this.bounty.reward.type === 'SUBMISSION'
    },
  },
  methods: {
    convertDate(date) {
      return DateManager.fromNow(date)
    },
    goToChallenge(bounty) {
      if (bounty.link) {
        this.$router.push(this.localePath(bounty.link))
        return
      }
      if (this.isChallenge) {
        return this.$router.push(
          this.localePath(
            this.$navigation.community.challengePath(
              bounty.challenge,
              bounty.course.slug,
              bounty.slug
            )
          )
        )
      }
      return this.$router.push(
        this.localePath(
          this.$navigation.community.submissionsPath(
            bounty.challenge,
            bounty.course.slug,
            bounty.slug
          )
        )
      )
    },
  },
}
</script>
