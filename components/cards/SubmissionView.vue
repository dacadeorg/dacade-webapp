<template>
  <UserCard
    :user="submission.user"
    :timestamp="{
      date: submission.created_at,
      text: $t('submissions.submitted'),
    }"
  >
    <TranslationBox
      class="pb-5"
      :text="submission.text"
      :default-locale="language"
      text-css-classes="text-base md:text-lg leading-normal text-gray-700"
    />
    <div
      class="inline-grid space-y-2 md:space-y-5 md:contents space-x-0 md:space-x-2"
    >
      <ArrowButton
        v-if="submission.link"
        :link="submission.link"
        target="__blank"
        :custom-style="primaryButtonStyles"
        type="outline-primary"
      >
        {{ $t('submissions.link.github') }}
      </ArrowButton>
    </div>
  </UserCard>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import ArrowButton from '@/components/ui/button/Arrow'
import UserCard from '@/components/cards/User'
import TranslationBox from '~/components/cards/TranslationBox'

export default {
  name: 'SubmissionViewCard',
  components: {
    TranslationBox,
    UserCard,
    ArrowButton,
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
    language() {
      return this.submission?.metadata?.language || 'en'
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
