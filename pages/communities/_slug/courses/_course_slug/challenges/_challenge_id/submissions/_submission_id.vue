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
import SubmissionView from '@/components/sections/submissions/View'
import Wrapper from '@/components/sections/courses/Wrapper'
import Header from '@/components/sections/communities/_partials/Header'
import { getMetadataTitle } from '~/utilities/Metadata'

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
  head() {
    return {
      title: getMetadataTitle(
        this.$t('communities.submission.title'),
        this.course?.name
      ),
      // meta: getMetadataDescription(this.challenge.description)
    }
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
      submission: 'communities/challenges/submissions/current',
    }),
  },
}
</script>
