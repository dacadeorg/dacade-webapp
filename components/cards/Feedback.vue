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
    <p class="text-base md:text-lg max-w-screen-sm leading-normal">
      {{ value.text }}
    </p>
  </UserCard>
</template>
<script>
/* eslint-disable no-console */
import UserCard from '@/components/cards/User'

export default {
  name: 'FeedbackCard',
  components: {
    UserCard,
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
}
</script>
