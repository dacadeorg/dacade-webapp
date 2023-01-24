<template>
  <div class="flex flex-col w-2/4 mr-8 divide-y divide-solid divide-gray-200">
    <div></div>
    <div class="divide-y divide-gray-200">
      <div class="block mt-6 mb-6">
        <span class="text-gray-700 mb-4">Filter by</span>
        <div class="mt-6 mb-6">
          <FilterOption
            v-for="(option, i) in options"
            :key="i"
            v-model="filterBy"
            :label="option.label"
            :data="option.value"
            name="filter-by-option"
          />
        </div>
      </div>
    </div>

    <div class="pt-4">
      <div class="block">
        <span class="text-gray-700 mb-4">Sort</span>
        <div class="mt-6 mb-6">
          <FilterOption
            v-for="(option, i) in sortingOptions"
            :key="i"
            v-model="sortBy"
            :label="option.label"
            :data="option.value"
            name="sort-by-option"
          />
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
      filterBy: 'all',
      sortBy: 'reputation',
    }
  },
  computed: {
    options() {
      return [
        {
          label: 'All',
          value: 'all',
        },
        {
          label: 'Month',
          value: 'month',
        },
        {
          label: 'Quarter',
          value: 'quarter',
        },
        {
          label: 'Year',
          value: 'year',
        },
      ]
    },
    sortingOptions() {
      return [
        {
          label: 'Reputation',
          value: 'reputation',
        },
        {
          label: 'Submission points',
          value: 'submission-points',
        },
      ]
    },
  },
  watch: {
    filterBy(newValue, oldValue) {
      if (newValue === oldValue) return
      this.$store.dispatch('communities/scoreboard/filter', {
        slug: this.$route.params.slug,
        filterBy: newValue,
      })
    },
  },
}
</script>
