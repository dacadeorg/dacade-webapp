<template>
  <SectionWrapper
    :title="$t('communities.navigation.scoreboard')"
    description=" here you can see the courses available and bla bla bla so on and so
        forth"
  >
    <div
      class="
        w-full
        flex flex-col
        divide-y divide-solid divide-gray-200
        border border-gray-200 border-solid
        rounded-3xl
        overflow-hidden
      "
    >
      <ScoreboardCard
        v-for="(item, i) in list"
        :key="i"
        :index="i + 1"
        :value="item"
      />
    </div>
  </SectionWrapper>
</template>
<script>
import { mapGetters } from 'vuex'
import SectionWrapper from './_partials/SectionWrapper'
import ScoreboardCard from '@/components/cards/Scoreboard'

export default {
  name: 'ScoreboardOverview',
  components: {
    ScoreboardCard,
    SectionWrapper,
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      list: 'communities/scoreboard/list',
    }),
  },
}
</script>
