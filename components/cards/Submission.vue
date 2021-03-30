<template>
  <UserCard
    :user="submission.user"
    :timestamp="{
      date: submission.date,
      text: 'Submitted'
    }"
    :link="link"
    :bordered="!last"
  >
    <p class="text-lg leading-normal">
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
    <div v-if="buttons" class="mt-6 space-x-2">
      <Button
        :padding="false"
        class="outline-submission-button py-2 px-5"
        :custom-style="primaryButtonStyles"
        type="outline-primary"
      >
        GitHub Code
      </Button>
      <Button
        :padding="false"
        class="outline-submission-button py-2 px-5"
        :custom-style="outlineButtonStyles"
        type="outline-primary"
      >
        Website
      </Button>
    </div>
  </UserCard>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import UserCard from '@/components/cards/User'

export default {
  name: 'SubmissionCard',
  components: {
    Badge,
    Button,
    UserCard
  },
  props: {
    submission: {
      default: () => {
        return {}
      },
      type: Object
    },
    stats: {
      default: false,
      type: Boolean
    },
    link: {
      default: '',
      type: String
    },
    buttons: {
      default: false,
      type: Boolean
    },
    last: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current'
    }),
    badgeButtonStyles () {
      return {
        backgroundColor: this.colors.textAccent,
        color: this.colors.text
      }
    },
    primaryButtonStyles () {
      return {
        borderColor: this.colors.textAccent,
        color: this.colors.text,
        backgroundColor: this.colors.textAccent,
        '--button-color--hover': this.colors.text,
        '--button-background-color--hover': this.colors.accent,
        '--button-border-color--hover': this.colors.accent
      }
    },
    outlineButtonStyles () {
      return {
        borderColor: this.colors.textAccent,
        color: this.colors.textAccent,
        '--button-color--hover': this.colors.text,
        '--button-background-color--hover': this.colors.textAccent,
        '--button-border-color--hover': this.colors.textAccent
      }
    }
  }
}
</script>

<style lang="scss">
.outline-submission-button:hover,
.outline-submission-button:focus {
  color: var(--button-color--hover) !important;
  background-color: var(--button-background-color--hover) !important;
  border-color: var(--button-border-color--hover) !important;
}
</style>
