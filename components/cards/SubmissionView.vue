<template>
  <UserViewCard
    :user="submission.user"
    :timestamp="{
      date: submission.created_at,
      text: 'Submitted',
    }"
    :link="link"
    :bordered="!last"
    class="max-w-3xl hover:bg-gray-50 rounded-3.5xl"
  >
    <div class="pb-6">
      <p
        class="
          text-base
          md:text-lg
          max-w-screen-sm
          leading-normal
          text-gray-700
        "
      >
        {{ text }}
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
    <div
      v-if="preview && submission.metadata && submission.metadata.evaluation"
      class="flex items-center mt-4"
    >
      <Badge
        :custom-style="badgeButtonStyles"
        size="medium"
        class="relative left-0"
        :value="submission.metadata.evaluation.points"
      >
      </Badge>
      <span class="ml-3 text-sm">Points</span>
    </div>
    <div
      v-if="buttons"
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
  </UserViewCard>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Truncate from 'lodash.truncate'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import UserViewCard from '@/components/cards/UserView'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'SubmissionViewCard',
  components: {
    Badge,
    Button,
    ArrowRightIcon,
    UserViewCard,
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
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    text() {
      if (!this.preview) return this.submission.text
      return Truncate(this.submission.text, {
        length: 220,
        omission: '',
        separator: ' ',
      })
    },
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
