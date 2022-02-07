<template>
  <UserCard
    :user="submission.user"
    :timestamp="{
      date: submission.created_at,
      text: 'Submitted',
    }"
    :link="link"
    :bordered="false"
    class="pt-6"
    box-layout
  >
    <div class="pb-6 border-b border-solid border-gray-200">
      <p
        class="text-base md:text-lg leading-normal text-gray-700 break-all"
        :class="{
          'line-clamp-3': preview,
          'max-w-screen-sm': preview,
        }"
      >
        {{ submission.text }}
      </p>
      <span
        v-if="preview"
        class="
          rounded-full
          bg-gray-100
          px-2
          leading-none
          py-0
          h-5
          items-center
          justify-items-center
        "
        >&#183;&#183;&#183;</span
      >
    </div>
    <div class="flex items-center my-4 w-full">
      <div
        v-if="preview && submission.metadata && submission.metadata.evaluation"
        class="w-full"
      >
        <span class="inline-block mr-2">
          <Badge
            :custom-style="badgeButtonStyles"
            size="medium"
            class="relative left-0"
            :value="submission.metadata.evaluation.points"
          >
          </Badge>
          <span class="text-sm">Points</span>
        </span>
        <span
          class="mr-2 text-sm relative leading-snug text-gray-700 inline-block"
        >
          <span class="font-semibold">{{ submission.metadata.feedbacks }}</span>
          Feedbacks
        </span>

        <span
          class="
            bg-yellow-50
            text-yellow-900 text-sm
            border border-solid border-yellow-50
            rounded
            px-3
            py-2
          "
        >
          <span class="font-semibold">25 cUSD</span> Feedback bounty
        </span>
      </div>

      <div class="text-right ml-auto xl:m-0 w-full hidden md:block">
        <Button
          :padding="false"
          class="
            action-button
            bg-gray-100
            inline-flex
            text-gray-500
            items-center
            justify-center
            w-10
            h-10
            md:w-11 md:h-11
            text-2xl
            rounded-full
          "
          type="none"
          :custom-style="arrowButtonStyles"
        >
          <ArrowRightIcon class="w-full" />
        </Button>
      </div>
    </div>
  </UserCard>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/button'
import UserCard from '@/components/cards/User'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'SubmissionCard',
  components: {
    Badge,
    Button,
    ArrowRightIcon,
    UserCard,
  },
  props: {
    submission: {
      default: () => {
        return {}
      },
      type: Object,
    },
    preview: {
      default: false,
      type: Boolean,
    },
    stats: {
      default: false,
      type: Boolean,
    },
    link: {
      default: '',
      type: String,
    },
    buttons: {
      default: false,
      type: Boolean,
    },
    last: {
      default: false,
      type: Boolean,
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
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    badgeButtonStyles() {
      return {
        backgroundColor: this.colors.textAccent,
        color: this.colors.text,
      }
    },
    primaryButtonStyles() {
      return {
        borderColor: this.colors.textAccent,
        color: this.colors.text,
        backgroundColor: this.colors.textAccent,
        '--button-color--hover': this.colors.text,
        '--button-background-color--hover': this.colors.accent,
        '--button-border-color--hover': this.colors.accent,
      }
    },
    outlineButtonStyles() {
      return {
        borderColor: this.colors.textAccent,
        color: this.colors.textAccent,
        '--button-color--hover': this.colors.text,
        '--button-background-color--hover': this.colors.textAccent,
        '--button-border-color--hover': this.colors.textAccent,
      }
    },
    arrowButtonStyles() {
      return {
        '--button-color--hover': this.colors.text,
        '--button-background-color--hover': this.colors.textAccent,
        '--button-border-color--hover': this.colors.textAccent,
      }
    },
  },
}
</script>
