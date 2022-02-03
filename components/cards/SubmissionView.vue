<template>
  <UserCard
    :user="submission.user"
    :timestamp="{
      date: submission.created_at,
      text: 'Submitted',
    }"
  >
    <div class="pb-6">
      <p class="text-base md:text-lg leading-normal text-gray-700">
        {{ submission.text }}
      </p>
    </div>
    <div
      class="
        inline-grid
        space-y-2
        md:space-y-5 md:contents
        mt-6
        space-x-0
        md:space-x-2
      "
    >
      <Button
        v-if="submission.link"
        :padding="false"
        class="action-button py-2 px-5 w-44"
        :link="submission.link"
        target="__blank"
        :custom-style="primaryButtonStyles"
        type="outline-primary"
      >
        <span class="flex text-left items-center">
          GitHub Code
          <span class="absolute right-4 w-3"><ArrowRightIcon /></span>
        </span>
      </Button>

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
import Button from '@/components/ui/Button'
import UserCard from '@/components/cards/User'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'SubmissionViewCard',
  components: {
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
