<template>
  <div class="relative">
    <FeedbackCard
      v-for="(feedback, k) in feedbacks"
      :key="feedback.id"
      :value="feedback"
      :last="k === feedbacks.length - 1"
    />
    <Section>
      <Criteria />
      <Form @save="fetchList()" />
    </Section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import FeedbackCard from '@/components/cards/Feedback'
import Section from '@/components/sections/communities/partials/Section'
import Form from './Form'
import Criteria from './Criteria'

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
      submission: 'communities/submissions/current',
      feedbacks: 'communities/submissions/feedbacks/list',
    }),
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.$store.dispatch(
        'communities/submissions/feedbacks/all',
        this.submission.id
      )
    },
  },
}
</script>
