<template>
  <Wrapper>
    <div class="py-4 flex flex-col space-y-8 text-gray-700">
      <Header
        :title="community.name"
        :subtitle="$t('communities.submission.title')"
      />
      <div v-if="submission">
        <SubmissionCard :submission="submission" :buttons="true" />
        <Evaluation v-if="submission.evaluation" />
        <Feedback />
      </div>
    </div>
  </Wrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionCard from '@/components/cards/Submission'
import Wrapper from '@/components/sections/communities/courses/Wrapper'
import Header from '@/components/sections/communities/_partials/Header'
import Feedback from '@/components/sections/communities/courses/challenge/submissions/feedback'
import Evaluation from '@/components/sections/communities/courses/challenge/submissions/Evaluation'

export default {
  components: {
    Header,
    SubmissionCard,
    Feedback,
    Evaluation,
    Wrapper,
  },
  scrollToTop: true,
  props: {
    evaluation: {
      default: () => {
        return {
          content:
            "Your website is working great, the only problem is that you didn't host it correctly on GitHub, as mentioned by your peers.",
          user: { displayName: 'Moritz Felipe' },
        }
      },
      type: Object,
    },
  },
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
      community: 'communities/current',
      submission: 'communities/challenges/submissions/current',
    }),
  },
}
</script>
