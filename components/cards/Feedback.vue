<template>
  <UserCard
    :user="value.user"
    :timestamp="{
      date: value.created_at,
      text: 'Feedback',
    }"
    :link="link"
    :bordered="!last"
    :badge="value.ranking"
    :box-layout="preview"
  >
    <TranslateBox
      class="pb-3"
      :text="value.text"
      :default-locale="language"
      :disabled="preview"
      text-css-classes="text-base md:text-lg leading-normal relative break-words"
      :text-container-css-classes="{ 'line-clamp-3': preview }"
    />
    <div
      v-if="
          value.metadata &&
          value.metadata.evaluation &&
          value.metadata.evaluation.points
        "
      class="pt-5 flex space-x-1"
    >
      <Reward
        v-if="value.metadata.evaluation.reward"
        type="light-gray"
        :reward="value.metadata.evaluation.reward"
      />
      <Tag
        :value="`${value.metadata.evaluation.points} REP`"
        class="text-sm font-bold"
        type="light-gray"
      />
    </div>
    <div v-if="!preview && value.link" class="pt-6">
      <ArrowButton
        :link="value.link"
        target="__blank"
        :custom-style="primaryButtonStyles"
      >
        {{ $t('submissions.feedback.link.github') }}
      </ArrowButton>
    </div>
  </UserCard>
</template>
<script>
import {mapGetters} from 'vuex'
/* eslint-disable no-console */
import UserCard from '@/components/cards/User'
import ArrowButton from '@/components/ui/button/Arrow'
import Reward from '@/components/badges/Reward'
import Tag from '@/components/ui/Tag'
import TranslateBox from '~/components/cards/TranslateBox'

export default {
  name: 'FeedbackCard',
  components: {
    UserCard,
    ArrowButton,
    Tag,
    Reward,
    TranslateBox,
  },
  props: {
    value: {
      default: () => {
        return {}
      },
      type: Object,
    },
    preview: {
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
    link: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      loading: false,
    }
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
    language() {
      return this.value?.metadata?.language || 'en'
    },
  },
}
</script>
