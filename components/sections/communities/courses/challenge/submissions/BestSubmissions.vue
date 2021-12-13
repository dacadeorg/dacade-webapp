<template>
  <Section :title="bestSubmission.title">
    <p class="leading-normal text-sm capitalize w-64 pt-3">
      {{ bestSubmission.subtitle }}
    </p>
    <div class="text-xl md:text-.5xl px-0">
      <div class="md:grid grid-cols-2 gap-5 pt-7 flex-wrap">
        <SubmissionCard />
        <SubmissionCard />
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
  data() {
    return {
      user: {
        name: 'lorovani',
        text: 'AEQuiz is a web æpp that engages the audience in a unique and fun way and connects them to the learning material. It also gives immediate results to participants...',
      },
      bestSubmission: {
        title: 'Best submissions',
        subtitle:
          'Molestiae ad quibusdam illo amet odit est. Est minima aut eligendi explicabo dicta.',
      },
      timestamp: {
        text: 'Submitted',
        date: '3 days ago',
      },
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
  },
}
</script>
