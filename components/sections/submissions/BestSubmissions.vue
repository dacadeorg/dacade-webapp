<template>
  <Section
    v-if="challenge.bestSubmissions && challenge.bestSubmissions.length"
    :title="$t('communities.challenge.best-submissions.title')"
  >
    <p class="leading-normal text-sm capitalize w-64 pt-3">
      {{ $t('communities.challenge.best-submissions.description') }}
    </p>
    <div class="text-xl md:text-.5xl px-0">
      <div class="md:grid grid-cols-2 gap-5 pt-7 flex-wrap">
        <SubmissionCard
          v-for="submission in challenge.bestSubmissions"
          :key="submission.id"
          :submission="submission"
        />
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionCard from './_partials/SubmissionCard.vue'
import Section from '@/components/sections/communities/_partials/Section.vue'
export default {
  name: 'BestSubmissions',
  components: {
    Section,
    SubmissionCard,
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
      challenge: 'communities/challenges/current',
    }),
  },
}
</script>
