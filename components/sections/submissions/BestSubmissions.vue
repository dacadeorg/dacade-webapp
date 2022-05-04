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
      <div class="text-right ml-auto xl:m-0 pt-6">
        <nuxt-link :to="localePath($navigation.community.submissionsPath())">
          <ArrowButton :community-styles="true" type="outline-primary">
            {{ $t('challenge.best-submissions.button') }}
          </ArrowButton>
        </nuxt-link>
      </div>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import SubmissionCard from './_partials/SubmissionCard.vue'
import Section from '@/components/sections/communities/_partials/Section.vue'
import ArrowButton from '@/components/ui/button/Arrow'
export default {
  name: 'BestSubmissions',
  components: {
    Section,
    SubmissionCard,
    ArrowButton,
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
      challenge: 'communities/challenges/current',
    }),
    outlineButtonStyles() {
      return {
        borderColor: this.colors.textAccent,
        color: this.colors.textAccent,
        '--button-color--hover': this.colors.text,
        '--button-background-color--hover': this.colors.textAccent,
        '--button-border-color--hover': this.colors.textAccent,
      }
    },
  },
}
</script>
