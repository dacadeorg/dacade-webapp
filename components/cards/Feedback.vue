<template>
  <UserCard
    :user="value.user"
    :timestamp="{
      date: value.created_at,
      text: 'Feedback',
    }"
    :link="link"
    :bordered="!last"
  >
    <p class="text-base md:text-lg max-w-screen-sm leading-normal relative">
      {{ value.text }}
    </p>
    <div
      v-if="value.link"
      class="
        inline-grid
        space-y-2
        md:space-y-5 md:contents
        space-x-0
        md:space-x-2
      "
    >
      <a :href="value.link" target="__blank" class="mt-6 block">
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
      </a>
    </div>
  </UserCard>
</template>
<script>
import { mapGetters } from 'vuex'
/* eslint-disable no-console */
import UserCard from '@/components/cards/User'
import Button from '@/components/ui/Button'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'FeedbackCard',
  components: {
    UserCard,
    Button,
    ArrowRightIcon,
  },
  props: {
    value: {
      default: () => {
        return {}
      },
      type: Object,
    },
    stats: {
      default: false,
      type: Boolean,
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
    }),
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
  },
}
</script>
