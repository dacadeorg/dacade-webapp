<template>
  <Wrapper>
    <div class="py-4 flex flex-col space-y-8 text-gray-700">
      <Header
        :title="course.name"
        :subtitle="$t('communities.submission.title')"
      />
      <SubmissionView />
    </div>
  </Wrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionView from '@/components/sections/communities/courses/challenge/submissions/View'
import Wrapper from '@/components/sections/communities/courses/Wrapper'
import Header from '@/components/sections/communities/_partials/Header'

export default {
  components: {
    Header,
    Wrapper,
    SubmissionView,
  },
  scrollToTop: true,
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/find', params.course_slug),
      store.dispatch(
        'communities/challenges/submissions/find',
        params.submission_id
      ),
    ]).catch((e) => {
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      communityData: 'content/communityData',
      course: 'communities/courses/current',
      submission: 'communities/challenges/submissions/current',
    }),
  },
}
</script>
