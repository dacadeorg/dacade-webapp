<template>
  <div>
    <Section :key="page">
      <SubmissionCard
        v-for="(submission, i) in submissions"
        :key="submission.id"
        :preview="true"
        :link="`/communities/${$route.params.slug}/submissions/${submission.id}`"
        :submission="submission"
        :last="i === submissions.length - 1 && !showLoadMore"
      />
      <div
        v-if="showLoadMore"
        class="
          h-15
          w-15
          rounded-full
          border border-solid
          cursor-pointer
          flex
          items-center
          justify-center
          text-gray-400
        "
        :class="{ 'bg-gray-50': loading, 'hover:bg-gray-200': !loading }"
        @click="nextPage()"
      >
        <RefreshIcon :class="{ 'spinning-animation': loading }" />
      </div>
      <InfiniteLoading
        class="invisible"
        :distance="1000"
        @infinite="nextPage"
      ></InfiniteLoading>
    </Section>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import Section from '../partials/Section.vue'
import SubmissionCard from '@/components/cards/Submission'
import RefreshIcon from '~/assets/icons/refresh.svg?inline'
// import RewardsSection from './partials/overview/Rewards'

export default {
  name: 'SubmissionList',
  components: {
    Section,
    SubmissionCard,
    RefreshIcon,
    InfiniteLoading,
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
      submissions: 'communities/submissions/list',
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
      const list = await this.$store.dispatch('communities/submissions/all', {
        slug: this.community.slug,
        startAfter: submissionId,
      })
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
