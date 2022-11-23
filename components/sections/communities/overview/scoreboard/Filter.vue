<template>
 <div class="flex flex-col w-2/4 mr-8 divide-y divide-solid divide-gray-200">
    <div></div>
    <div class="divide-y divide-gray-200">
      <div class="block mt-6 mb-6">
      <span class="text-gray-700 mb-4">Filter by</span>
      <div class="mt-6 mb-6">
        <div class="mt-2 mb-2">
          <label class="inline-flex items-center">
            <Radio
              id="filter-month"
              v-model="checked"
              :required="true"
              name="month"
            />
            <span class="ml-2">Month</span>
          </label>
        </div>
        <div class="mt-2 mb-2">
          <label class="inline-flex items-center">
            <Radio
              id="filter-month"
              v-model="checked"
              :required="true"
              name="month"
              size="medium"
            />
            <span class="ml-2">Quarter</span>
          </label>
        </div>
        <div class="mt-2 mb-2">
          <label class="inline-flex items-center">
            <Radio
              id="filter-month"
              v-model="checked"
              :required="true"
              name="month"
              class="w-8"
            />
            <span class="ml-2">Year</span>
          </label>
        </div>
        <div class="mt-2 mb-2">
          <label class="inline-flex items-center">
            <Radio
              id="filter-month"
              v-model="checked"
              :required="true"
              name="month"
            />
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
            <Radio
              id="filter-month"
              v-model="checked"
              :required="true"
              name="month"
            />
            <span class="ml-2">Reputation</span>
          </label>
        </div>
        <div class="mt-2 mb-2">
          <label class="inline-flex items-center">
            <Radio
              id="filter-month"
              v-model="checked"
              :required="true"
              name="month"
            />
            <span class="ml-2">Submission points</span>
          </label>
        </div>
        <ScoreboardFilter/>
      </div>
    </div>
    </div> 
    <div></div>
  </div>
</template>

<script>
import Radio from '~/components/ui/Radio.vue'
export default {
  name: 'Filter',
  components: { Radio },
  data() {
    return {
      checked: false,
    }
  },

}
</script>
  