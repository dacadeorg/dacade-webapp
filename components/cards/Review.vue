<template>
  <UserCard
    :user="review.user"
    :timestamp="{
      date: review.date,
      text: 'Feedback'
    }"
    :link="link"
    :bordered="!last"
  >
    <p class="text-lg leading-normal">
      {{ review.content }}
    </p>
  </UserCard>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import UserCard from '@/components/cards/User'

export default {
  name: 'ReviewCard',
  components: {
    UserCard
  },
  props: {
    review: {
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
    }
  }
}
</script>
