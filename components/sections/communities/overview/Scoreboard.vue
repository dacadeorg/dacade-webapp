<template>
  <SectionWrapperCol
    v-if="list && list.length"
    :title="$t('communities.overview.scoreboard.title')"
    :description="$t('communities.overview.scoreboard.description')"
  >
    <div class="w-full flex flex-row mt-10">
      <ScoreboardFilter/>
      <div
        class="w-full flex flex-col divide-y divide-solid divide-gray-200 border border-gray-200 border-solid rounded-3xl overflow-hidden"
      >
        <ScoreboardCard
          v-for="(item, i) in list.slice(0, items)"
          :key="i"
          :index="i + 1"
          :value="item"
        />
        <div
          v-if="items < list.length"
          class="flex w-full sm:flex space-x-5 space-y-0 sm:flex-row-reverse overflow-hidden bg-gray-50 p-6 sm:px-4 sm:py-7 items-center sm:justify-center"
        >
          <ArrowButton
            :community-styles="true"
            type="outline-primary"
            direction="down"
            @click="loadMore"
          >
            {{ $t('course.scoreboard.button') }}
          </ArrowButton>
        </div>
      </div>
    </div>
  </SectionWrapperCol>
</template>
<script>
import { mapGetters } from 'vuex'
import SectionWrapperCol from './scoreboard/index.vue'
import ScoreboardCard from '@/components/cards/Scoreboard'
import ArrowButton from '@/components/ui/button/Arrow'
import ScoreboardFilter from '@/components/sections/communities/overview/scoreboard/Filter.vue'


export default {
  name: 'ScoreboardOverview',
  components: {
    ScoreboardCard,
    SectionWrapperCol,
    ArrowButton,
    ScoreboardFilter,
  },
  data() {
    return {
      items: 3,
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      list: 'communities/scoreboard/list',
      colors: 'ui/colors',
      submissions: 'communities/challenges/submissions/list'
    }),
  },
  methods: {
    loadMore() {
      this.items = this.items + 10
    },
  },
}
</script>
