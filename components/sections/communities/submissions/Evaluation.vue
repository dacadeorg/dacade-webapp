<template>
  <EvaluationCard :evaluation="evaluation">
    <RatingRubric
      v-if="submission.challenge"
      hide-title
      :rating-criteria="submission.challenge.ratingCriteria"
      :selected="evaluation.criteria"
    />
    <div
      class="
        grid grid-cols-1
        space-y-4
        md:space-y-0
        md:grid-cols-2
        lg:grid-cols-4
        mt-3
        gap-y-5 gap-x-5
      "
    >
      <div class="text-sm">
        <span class="block font-medium">Total</span>
        <span
          class="text-xl"
          :style="{
            color: colors.textAccent,
          }"
          >{{ evaluation.points }}</span
        >
        <span
          :style="{
            color: colors.textAccent,
          }"
          >/{{ evaluation.totalPoints }} Points</span
        >
      </div>
      <div v-if="evaluation.reward" class="text-sm relative">
        <span class="block font-medium">Total</span>
        <div class="absolute -left-5 top-7">
          <Coin :token="evaluation.reward.token" size="small" />
        </div>
        <div
          class="inline-block font-medium"
          :style="{
            color: colors.textAccent,
          }"
        >
          <span class="text-xl">{{ evaluation.reward.amount }}</span>
          <span>{{ evaluation.reward.token }}</span>
        </div>
        <div>
          Congratulations you gained at least 70% of the available learning
          points.
        </div>
      </div>
    </div>
  </EvaluationCard>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import RatingRubric from '@/components/sections/communities/challenge/Rubric'
import EvaluationCard from '@/components/cards/Evaluation'
import Coin from '@/components/ui/Coin'

export default {
  name: 'SubmissionList',
  components: {
    EvaluationCard,
    RatingRubric,
    Coin,
  },
  computed: {
    ...mapGetters({
      submission: 'communities/submissions/current',
      colors: 'ui/colors',
    }),
    evaluation() {
      return this.submission.evaluation
    },
    totalPoints() {
      return this.submission.challenge.ratingCriteria.reduce(
        (sum, criteria) => sum + criteria.maxPoints,
        0
      )
    },
  },
}
</script>
