<template>
  <Wrapper>
    <div class="py-4 flex flex-col space-y-8 text-gray-700">
      <Header
        :title="course.name"
        :subtitle="$t('communities.submission.title')"
      />
      <List />
    </div>
    <SubmissionPopup
      :show="!!selectedSubmission"
      :submission-id="selectedSubmission"
      @close="closeSubmission()"
    />
  </Wrapper>
</template>
<script>
import { mapGetters } from 'vuex'

import Header from '@/components/sections/communities/_partials/Header'
import List from '@/components/sections/submissions/List'
import Wrapper from '@/components/sections/courses/Wrapper'
import SubmissionPopup from '~/components/popups/submission'

export default {
  components: {
    Header,
    List,
    Wrapper,
    SubmissionPopup,
  },
  beforeRouteLeave(to, from, next) {
    if (to?.name?.includes('submission_id')) {
      return this.displaySubmission(to)
    }
    next()
  },
  scrollToTop: true,
  data() {
    return {
      selectedSubmission: '',
    }
  },
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/find', params.course_slug),
      store.dispatch('communities/challenges/submissions/all', {
        challengeId: params.challenge_id,
      }),
    ]).catch((e) => {
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
      submissions: 'communities/challenges/submissions/list',
    }),
  },
  methods: {
    displaySubmission(route) {
      this.selectedSubmission = route.params.submission_id
      this.$store.dispatch(
        'communities/challenges/submissions/show',
        this.selectedSubmission
      )
      window.history.pushState({}, null, route.path)
    },
    closeSubmission() {
      this.selectedSubmission = ''
      window.history.pushState({}, null, this.$route.path)
    },
  },
}
</script>
