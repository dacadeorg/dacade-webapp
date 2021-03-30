<template>
  <UserCard
    :user="evaluation.user"
    :timestamp="{
      date: evaluation.date,
      text: 'Evaluation'
    }"
    :link="link"
    :bordered="!last"
  >
    <p class="text-lg leading-normal">
      {{ evaluation.content }}
    </p>
  </UserCard>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import UserCard from '@/components/cards/User'

export default {
  name: 'EvaluationCard',
  components: {
    UserCard
  },
  props: {
    evaluation: {
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
