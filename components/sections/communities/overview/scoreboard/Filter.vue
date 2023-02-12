<template>
 <div class="flex flex-col w-2/4 mr-8 divide-y divide-solid divide-gray-200">
    <div></div>
    <div class="divide-y divide-gray-200">
      <div class="block mt-6 mb-6">
      <span class="text-gray-700 mb-4">Filter by</span>
      <div class="mt-6 mb-6">
        <FilterOption label="All" data="All" name="filter-by-option" @input="filterByValue('filterBy')" />
        <FilterOption label="Year" data="year" name="filter-by-option" @input="filterByValue('Year')" />
        <FilterOption label="Month" data="month" name="filter-by-option" @input="filterByValue('month')" />
        <FilterOption label="Quarter" data="quarter" name="filter-by-option" @input="filterByValue('quarter')" />
      </div>
    </div>
    </div>

    <div class="pt-4">
      <div class="block">
      <span class="text-gray-700 mb-4">Sort</span>
      <div class="mt-6 mb-6">
        <FilterOption label="Reputation" data="score" name="sort-by-option" @input="sortBy('score')" />
        <FilterOption label="Submission points" data="submissionPoints" name="sort-by-option" @input="sortBy('submissionPoints')" />
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
  methods: {
    filterByValue(value) {
      this.$store.dispatch('communities/scoreboard/filter', {
        slug: this.$route.params.slug,
        filterBy: value
      })
    },
    sortBy(value) {
      this.$store.dispatch('communities/scoreboard/sort', {
        sortBy: value
      })
    }
  }
}
</script>
