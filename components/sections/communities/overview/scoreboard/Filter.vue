<template>
  <div class="lg:flex flex-col w-2/4 mr-8 hidden">
    <div class="block mt-7">
      <span class="text-gray-700 mb-4">Filter by</span>
      <div class="mt-6">
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
  name: 'Filters',
  components: { FilterOption },
  data() {
    return {
      filterBy: 'all',
      sortBy: 'score',
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
          value: 'score',
        },
        {
          label: 'Submission points',
          value: 'submissionPoints',
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
        sortBy: this.sortBy,
      })
    },
    sortBy(newValue, oldValue) {
      if (newValue === oldValue) return
      this.$store.dispatch('communities/scoreboard/sort', {
        sortBy: newValue,
      })
    },
  },
}
</script>
