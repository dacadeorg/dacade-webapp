<template>
  <Section>
    <ScoreboardList :users="users" />
  </Section>
</template>
<script>
import Section from '../_partials/Section.vue'
import ScoreboardList from '@/components/list/Scoreboard'

export default {
  name: 'SubmissionList',
  components: {
    Section,
    ScoreboardList,
  },
  computed: {
    users() {
      return [
        {
          displayName: 'Justin',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Hret',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Haeiligh',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Cierra',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Benny',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Tito',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Kayla',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Justin',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Colten',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Mckenzie',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
        {
          displayName: 'Bieber',
          link: 'http://',
          reputation: '45REP',
          feedbacks: 157,
        },
      ]
    },
    // ...mapGetters({
    //   users: 'scoreboard/users/list'
    // })
  },
}
</script>
