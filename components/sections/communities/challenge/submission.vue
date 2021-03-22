<template>
  <Section :title="$t('communities.challenge.submission')" />
</template>
<script>
import { mapGetters } from 'vuex'
import Section from '../partials/Section.vue'

export default {
  name: 'Submission',
  components: {
    Section
  },
  computed: {
    ...mapGetters({
      community: 'communities/current'
    }),
    rewards () {
      return this.community.rewards.filter(
        reward => reward.type === 'SUBMISSION'
      )
    }
  }
}
</script>
