<template>
  <div class="py-4 flex flex-col text-gray-700">
    <Header
      :title="community.name"
      :subtitle="$t('communities.navigation.scoreboard')"
    />
    <div
      class="
        my-24
        w-full
        divide-y divide-gray-200
        space-y-4
        bg-gray-50
        lg:max-w-2xl
        rounded-3.5xl
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '@/components/sections/communities/_partials/Header'
import ScoreboardCard from '@/components/cards/Scoreboard'

export default {
  name: 'ScoreboardList',
  components: {
    ScoreboardCard,
    Header,
  },
  props: {
    badgeStyles: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/scoreboard/all', params.slug),
    ])
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
      list: 'communities/scoreboard/list',
    }),
  },
}
</script>
