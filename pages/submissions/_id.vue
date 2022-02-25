<template>
  <Section>
    <div class="py-4 lg:px-10 xl:px-20 flex flex-col space-y-8 text-gray-700">
      <Header
        :title="course.name"
        :subtitle="$t('communities.submission.title')"
      />
      <SubmissionView />
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionView from '@/components/sections/submissions/View'
import Section from '@/components/ui/Section'
import Header from '@/components/sections/communities/_partials/Header'

export default {
  components: {
    Header,
    Section,
    SubmissionView,
  },
  scrollToTop: true,
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch(
        'communities/challenges/submissions/findWithRelations',
        params.id
      ),
    ]).catch((e) => {
      error(e)
    })
  },
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
      submission: 'communities/challenges/submissions/current',
    }),
  },
}
</script>
