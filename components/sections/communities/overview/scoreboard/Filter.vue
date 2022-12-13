<template>
 <div class="flex flex-col w-2/4 mr-8 divide-y divide-solid divide-gray-200">
    <div></div>
    <div class="divide-y divide-gray-200">
      <div class="block mt-6 mb-6">
      <span class="text-gray-700 mb-4">Filter by</span>
      <div class="mt-6 mb-6">
        <FilterOption label="Quarter"/>
        <FilterOption label="Year"/>
        <FilterOption label="Something"/>
      </div>
    </div>
    </div> 

    <div class="pt-4">
      <div class="block">
      <span class="text-gray-700 mb-4">Sort</span>
      <div class="mt-6 mb-6">
        <FilterOption label="Reputation"/>
        <FilterOption label="Submission points"/>
        <ScoreboardFilter/>
      </div>
    </div>
    </div> 
    <div></div>
  </div>
</template>

<script>
import FilterOption from './_partials/FilterOption.vue'

export default {
  name: 'Filter',
  components: { FilterOption },
  data() {
    return {
      checked: false,
    }
  },
}
</script>
  