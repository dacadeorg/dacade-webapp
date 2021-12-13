<template>
  <div class="relative">
    <FeedbackCard
      v-for="(feedback, k) in feedbacks"
      :key="feedback.id"
      :value="feedback"
      :last="k === feedbacks.length - 1"
    />
    <Section v-if="isAuthenticated">
      <Criteria />
      <Form @save="fetchList()" />
    </Section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Form from './Form'
import Criteria from './Criteria'
import FeedbackCard from '@/components/cards/Feedback'
import Section from '@/components/sections/communities/_partials/Section'

export default {
  name: 'Feedback',
  components: {
    FeedbackCard,
    Section,
    Form,
    Criteria,
  },
  computed: {
    ...mapGetters({
      submission: 'communities/challenges/submissions/current',
      feedbacks: 'communities/challenges/submissions/feedbacks/list',
      isAuthenticated: 'auth/check',
    }),
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.$store.dispatch(
        'communities/challenges/submissions/feedbacks/all',
        this.submission.id
      )
    },
  },
}
</script>
