<template>
  <SectionWrapperCol
    v-if="list && list.length"
    :title="$t('communities.overview.scoreboard.title')"
    :description="$t('communities.overview.scoreboard.description')"
  >
  <div class="w-full flex flex-row mt-10">
<div class="flex flex-col w-2/4 mr-8 divide-y divide-solid divide-gray-200">
<div></div>
<div class="divide-y divide-gray-200">
  <div class="block mt-6 mb-6">
  <span class="text-gray-700 mb-4">Filter by</span>
  <div class="mt-6 mb-6">
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only" checked/>
        <span class="form-checkbox text-blue-400 rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Month</span>
      </label>
    </div>
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only"/>
        <span class="form-checkbox text-blue-400 rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Quarter</span>
      </label>
    </div>
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only"/>
        <span class="form-checkbox text-blue-400 rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Year</span>
      </label>
    </div>
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only"/>
        <span class="form-checkbox text-blue-400 rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">All time</span>
      </label>
    </div>
  </div>
 </div>
</div> 

<!------------------------>

<div class="pt-4">
  <div class="block">
  <span class="text-gray-700 mb-4">Sort</span>
  <div class="mt-6 mb-6">
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only" checked/>
        <span class="form-checkbox text-transparent rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Reputation</span>
      </label>
    </div>
    <div class="mt-2 mb-2">
      <label class="inline-flex items-center">
        <input type="checkbox" class="sr-only"/>
        <span class="form-checkbox text-transparent rounded-full w-5	h-5 border-2 border-zinc-800" aria-hidden="true"></span>
        <span class="ml-2">Submission points</span>
      </label>
    </div>
  </div>
 </div>
</div> 
<div></div>

</div>
   
       
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
// import Filter from '@/components/ui/Filter'


export default {
  name: 'ScoreboardOverview',
  components: {
    ScoreboardCard,
    SectionWrapperCol,
    ArrowButton,
    // Filter,
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

<style scoped>
/* .form-checkbox {
  color: red;
} */

</style>
