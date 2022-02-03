<template>
  <Section :key="page">
    <div class="border border-gray-200 border-solid rounded-3.5xl divide-y">
      <SubmissionCard
        v-for="(submission, i) in submissions"
        :key="submission.id"
        :preview="true"
        :link="$navigation.community.submissionPath(submission.id)"
        :submission="submission"
        :last="i === submissions.length - 1 && !showLoadMore"
      />
      <Loader v-if="showLoadMore" :loading="loading" @click="nextPage()" />
    </div>
    <InfiniteLoading
      class="invisible"
      :distance="1000"
      @infinite="nextPage"
    ></InfiniteLoading>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import Section from '@/components/sections/communities/_partials/Section.vue'
import SubmissionCard from '@/components/cards/Submission'
import Loader from '@/components/ui/Loader'

export default {
  name: 'SubmissionList',
  components: {
    Section,
    SubmissionCard,
    InfiniteLoading,
    Loader,
  },
  data() {
    return {
      showButton: true,
      page: 0,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      submissions: 'communities/challenges/submissions/list',
      community: 'communities/current',
    }),
    showLoadMore() {
      return this.showButton && this.submissions.length >= 30
    },
  },
  methods: {
    async nextPage($state) {
      if (this.loading || !this.showButton) {
        $state.complete()
        return
      }
      this.loading = true
      const submissionId =
        this.submissions[this.submissions.length - 1]?.id || null
      const list = await this.$store.dispatch(
        'communities/challenges/submissions/all',
        {
          slug: this.community.slug,
          startAfter: submissionId,
          challengeId: this.$route.params.challenge_id,
        }
      )
      this.page = this.page + 1
      this.loading = false

      if (!list.length) {
        this.showButton = false
        $state.complete()
        return
      }

      $state.loaded()
    },
  },
}
</script>
