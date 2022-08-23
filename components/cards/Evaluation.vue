<template>
  <UserCard
    :user="evaluation.evaluator"
    :timestamp="{
      date: evaluation.created_at,
      text: $t('submissions.evaluation.evaluated'),
    }"
    :link="link"
    :bordered="!last"
  >
    <TranslationBox
      :text="evaluation.comment"
      text-css-classes="text-base md:text-lg leading-normal"
      :default-locale="language"/>
    <slot/>
  </UserCard>
</template>
<script>
/* eslint-disable no-console */
import {mapGetters} from 'vuex'
import UserCard from '@/components/cards/User'
import TranslationBox from "~/components/cards/TranslationBox";

export default {
  name: 'EvaluationCard',
  components: {
    TranslationBox,
    UserCard,
  },
  props: {
    evaluation: {
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
    language() {
      return this.evaluation?.metadata?.language || 'en'
    },
  },
}
</script>
