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
  >
    <div
      class="text-base md:text-lg max-w-screen-sm leading-normal relative"
      v-html="value.text"
    />
    <div
      v-if="
        value.metadata &&
        value.metadata.evaluation &&
        value.metadata.evaluation.points
      "
      class="mt-5"
    >
      <div
        v-if="value.metadata.evaluation.reward"
        class="bg-gray-100 inline-block rounded-2xl relative px-2"
      >
        <span class="absolute top-0.5">
          <Coin :token="value.metadata.evaluation.reward.token"
        /></span>
        <Tag
          :value="`${value.metadata.evaluation.reward.amount} ${value.metadata.evaluation.reward.token}`"
          class="text-sm font-bold text-gray-500 mt-0 ml-4"
          style="background-color: transparent; margin-top: 0"
        />
      </div>
      <div class="bg-gray-100 inline-block rounded-2xl w-16 text-center">
        <Tag
          :value="`${value.metadata.evaluation.points} REP`"
          class="text-sm font-bold text-gray-500"
          style="background-color: transparent; margin-top: 0"
        />
      </div>
    </div>

    <div
      v-if="value.link"
      class="flex space-y-2 md:space-y-5 space-x-0 md:space-x-2 mt-6"
    >
      <Button
        :link="value.link"
        target="__blank"
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
    </div>
  </UserCard>
</template>
<script>
import { mapGetters } from 'vuex'
/* eslint-disable no-console */
import UserCard from '@/components/cards/User'
import Button from '@/components/ui/Button'
import Coin from '@/components/ui/Coin'
import Tag from '@/components/ui/Tag'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'FeedbackCard',
  components: {
    UserCard,
    Button,
    Coin,
    Tag,
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
  },
}
</script>
