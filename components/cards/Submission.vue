<template>
  <UserCard
    :user="submission.user"
    :timestamp="{
      date: submission.created_at,
      text: 'Submitted',
    }"
    :link="link"
    :bordered="!last"
    class="max-w-3xl hover:bg-gray-50 rounded-3.5xl"
  >
    <p
      class="text-base md:text-lg max-w-screen-sm leading-normal text-gray-700"
    >
      {{ submission.text }}
    </p>
    <div v-if="stats" class="flex items-center mt-4">
      <Badge
        :custom-style="badgeButtonStyles"
        size="medium"
        class="relative left-0"
      >
        {{ submission.points }}
      </Badge>
      <span class="ml-3 text-sm">Points</span>
    </div>
    <div
      v-if="buttons"
      class="
        inline-grid
        space-y-2
        md:space-y-5
        md:contents
        mt-6
        space-x-0
        md:space-x-2
      "
    >
      <a v-if="submission.link" :href="submission.link" target="__blank">
        <Button
          :padding="false"
          class="action-button py-2 px-5 w-44"
          :custom-style="primaryButtonStyles"
          type="outline-primary"
        >
          <span class="flex text-left items-center">
            GitHub Code
            <span class="absolute right-4 w-3"><ArrowRightIcon /></span>
          </span>
        </Button>
      </a>

      <!-- <Button
        :padding="false"
       class="action-button py-2 px-5 w-44"
        :custom-style="outlineButtonStyles"
        type="outline-primary"
      >
        <span class="flex text-left items-center">
          Website
          <span class="absolute right-4 w-3"><ArrowRightIcon /></span>
        </span>
      </Button> -->
    </div>
  </UserCard>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
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
  },
}
</script>
