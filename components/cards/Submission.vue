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
    <div class="divide-y divide-gray-200 flex flex-col">
      <div class="pb-6">
        <p
          class="
            text-base
            sm:text-lg
            line-clamp-3
            leading-normal
            text-gray-700
            break-all
          "
        >
          {{ submission.text }}
        </p>
      </div>
      <div class="flex items-center py-4 w-full justify-between">
        <div class="flex space-x-4 items-center">
          <div
            v-if="submission.reward && submission.reviewable"
            class="
              bg-yellow-50
              text-yellow-900 text-sm
              border border-solid border-yellow-100
              rounded
              px-3
              py-0.5
              inline-block
            "
          >
            <span class="font-semibold"
              >{{ submission.reward.amount }}
              {{ submission.reward.token }}</span
            >
            {{ $t('submission.feedback.bounty') }}
          </div>
          <div
            v-if="submission.metadata && submission.metadata.evaluation"
            class="inline-flex flex-1 items-center space-x-1"
          >
            <Badge
              :custom-style="badgeButtonStyles"
              size="medium"
              class="relative"
              :value="submission.metadata.evaluation.points"
            >
            </Badge>
            <span class="text-sm leading">{{
              $t('submission.evaluation.points')
            }}</span>
          </div>
          <div
            v-if="submission.metadata && submission.metadata.feedbacks"
            class="
              mr-2
              text-sm
              relative
              leading-snug
              text-gray-700
              inline-block
            "
          >
            <span class="font-semibold">{{
              submission.metadata.feedbacks
            }}</span>
            {{ $t('submission.feedback.feedbacks') }}
          </div>
        </div>

        <div class="text-right ml-auto xl:m-0 hidden sm:block">
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
              sm:w-11 sm:h-11
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
      <slot />
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
