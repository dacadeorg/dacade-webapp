<template>
 <div class="flex flex-col w-2/4 mr-8 divide-y divide-solid divide-gray-200">
    <div></div>
    <div class="divide-y divide-gray-200">
      <div class="block mt-6 mb-6">
      <span class="text-gray-700 mb-4">Filter by</span>
      <div class="mt-6 mb-6">
        <FilterOption v-model="filterBy" label="Quarter" data="quarter" name="filter-by-option" />
        <FilterOption v-model="filterBy" label="Year" data="year" name="filter-by-option" />
        <FilterOption v-model="filterBy" label="Something" data="something" name="filter-by-option" />
      </div>
    </div>
    </div> 

    <div class="pt-4">
      <div class="block">
      <span class="text-gray-700 mb-4">Sort</span>
      <div class="mt-6 mb-6">
        <FilterOption v-model="sortBy" label="Reputation" data="reputation" name="sort-by-option" />
        <FilterOption v-model="sortBy" label="Submission points" data="submission-points" name="sort-by-option" />
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
      filterBy: "year",
      sortBy: "reputation",
    }
  }
}
</script>
  