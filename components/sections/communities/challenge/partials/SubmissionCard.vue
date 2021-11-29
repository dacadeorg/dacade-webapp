<template>
  <div
    class="
      bg-gray-50
      text-sm text-gray-700
      border-solid border border-gray-200
      rounded-3xl
      mb-5
      md:mb-0
    "
  >
    <div class="p-7">
      <span class="text-lg leading-loose font-medium text-gray-900 pb-1">
        {{ user.name }}
      </span>
      <span
        class="
          text-xs
          px-2.5
          bg-secondary
          leading-none
          py-1
          rounded-full
          font-medium
        "
        ><Currency :value="45" token="REP"
      /></span>
      <span class="block text-sm leading-snug text-gray-700 pb-4">
        {{ timestamp.text }}
        <span
          class="font-medium"
          :style="{
            color: colors.textAccent,
          }"
          >{{ timestamp.date }}</span
        >
      </span>
      <p>
        {{ user.text }}
      </p>
      <div class="pt-5">
        <Badge
          :custom-style="{
            backgroundColor: colors.textAccent,
          }"
          size="medium"
          class="relative left-0"
          :value="5"
        >
        </Badge>
        <span class="ml-1 text-sm">Points</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Currency from '@/components/ui/Currency'
import DateManager from '@/utilities/DateManager'
import Badge from '@/components/ui/Badge'
export default {
  name: 'SubmissionCard',
  components: {
    Currency,
    Badge,
  },
  data() {
    return {
      user: {
        name: 'lorovani',
        text: 'AEQuiz is a web æpp that engages the audience in a unique and fun way and connects them to the learning material. It also gives immediate results to participants...',
      },
      timestamp: {
        text: 'Submitted',
        date: '3 days ago',
      },
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    date() {
      return DateManager.fromNow(this.timestamp.date)
    },
  },
}
</script>
