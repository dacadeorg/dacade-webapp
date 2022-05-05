<template>
  <div class="relative">
    <FeedbackCard
      v-for="(feedback, k) in feedbacks"
      :key="feedback.id"
      :value="feedback"
      :last="k === feedbacks.length - 1"
    />
    <Loader v-if="loading" :loading="loading" />
    <Section v-if="isAuthenticated && submission.challenge.feedbackInfo">
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
import Loader from '@/components/ui/button/Loader'

export default {
  name: 'Feedback',
  components: {
    FeedbackCard,
    Section,
    Form,
    Criteria,
    Loader,
  },
  data() {
    return {
      loading: true,
    }
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
      this.loading = true

      this.$store
        .dispatch(
          'communities/challenges/submissions/feedbacks/all',
          this.submission.id
        )
        .finally(() => (this.loading = false))
    },
  },
}
</script>
