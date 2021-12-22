<template>
  <div class="pt-8 pb-4 flex justify-between">
    <span
      class="
        w-1/5
        py-4
        mr-16
        flex flex-col
        text-gray-700 text-primary
        group-gover:bg-text-primary
        group-hover:text-black
      "
    >
      <span class="font-medium">{{
        $t('communities.navigation.scoreboard')
      }}</span>
      <span class="text-xs font-light mt-2">
        here you can see the courses available and bla bla bla so on and so
        forth</span
      ></span
    >

    <div class="w-4/5 flex justify-center">
      <div class="overflow-hidden rounded-2xl divide-y divide-gray-200 w-11/12">
        <ScoreboardCard
          v-for="(item, i) in list"
          :key="i"
          :index="i + 1"
          :value="item"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ScoreboardCard from '@/components/cards/Scoreboard'

export default {
  name: 'ScoreboardList',
  components: {
    ScoreboardCard,
  },
  props: {
    badgeStyles: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('communities/find', params.slug),
      store.dispatch('communities/scoreboard/all', params.slug),
    ]).catch((e) => {
      error(e)
    })
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
