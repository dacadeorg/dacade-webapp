<template>
  <Section :key="page">
    <div v-if="submissions && submissions.length">
      <div
        class="
          sm:border sm:border-gray-200 sm:border-solid
          rounded-3.5xl
          relative
        "
      >
        <div class="flex flex-col divide-y">
          <SubmissionCard
            v-for="(submission, i) in submissions"
            :key="submission.id"
            :preview="true"
            :link="$navigation.community.submissionPath(submission.id)"
            :submission="submission"
            :last="i === submissions.length - 1 && !showLoadMore"
          />
        </div>
        <Loader
          v-if="showLoadMore"
          :loading="loading"
          class="sm:absolute sm:left-6 sm:-bottom-7.5"
          @click="nextPage()"
        />
      </div>
      <InfiniteLoading
        class="invisible"
        :distance="1000"
        @infinite="nextPage"
      ></InfiniteLoading>
    </div>
    <div v-else class="lg:w-2/3">
      <EmptyState
        :title="$t('submissions.empty-state.title')"
        :subtitle="$t('submissions.empty-state.subtitle')"
      />
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import Section from '@/components/sections/communities/_partials/Section.vue'
import SubmissionCard from '@/components/cards/Submission'
import Loader from '@/components/ui/Loader'
import EmptyState from '@/components/ui/EmptyState'

export default {
  name: 'SubmissionList',
  components: {
    Section,
    SubmissionCard,
    InfiniteLoading,
    Loader,
    EmptyState,
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
