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

import Header from '@/components/sections/communities/partials/Header'
import List from '@/components/sections/communities/submissions/List'
import Wrapper from '@/components/sections/communities/Wrapper'

export default {
  components: {
    Header,
    List,
    Wrapper,
  },
  scrollToTop: true,
  async fetch({ store, params }) {
    await store.dispatch('communities/find', params.slug)
    await store.dispatch('communities/submissions/all', {
      slug: params.slug,
    })
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      submissions: 'communities/submissions/list',
    }),
  },
}
</script>
