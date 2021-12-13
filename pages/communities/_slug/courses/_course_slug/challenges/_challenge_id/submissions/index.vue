<template>
  <Wrapper>
    <div class="py-4 flex flex-col space-y-8 text-gray-700">
      <Header
        :title="community.name"
        :subtitle="$t('communities.submission.title')"
      />
      <List />
    </div>
  </Wrapper>
</template>
<script>
import { mapGetters } from 'vuex'

import Header from '@/components/sections/communities/_partials/Header'
import List from '@/components/sections/communities/courses/challenge/submissions/List'
import Wrapper from '@/components/sections/communities/courses/Wrapper'

export default {
  components: {
    Header,
    List,
    Wrapper,
  },
  scrollToTop: true,
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/courses/find', params.course_slug),
      store.dispatch('communities/challenges/submissions/all', {
        challengeId: params.challenge_id,
      }),
    ])
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      submissions: 'communities/challenges/submissions/list',
    }),
  },
}
</script>
