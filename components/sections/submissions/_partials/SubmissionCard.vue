<template>
  <div
    class="bg-gray-50 text-sm text-gray-700 border-solid border border-gray-200 rounded-3xl mb-5 md:mb-0"
  >
    <nuxt-link
      :to="localePath($navigation.community.submissionPath(submission.id))"
    >
      <div class="p-7">
        <span class="text-lg leading-loose font-medium text-gray-900 pb-1">
          {{ submission.user.displayName }}
        </span>
        <span
          v-if="submission.user.reputation"
          class="text-xs px-2.5 bg-secondary leading-none py-1 rounded-full font-medium"
          ><Currency :value="submission.user.reputation" token="REP"
        /></span>
        <span class="block text-sm leading-snug text-gray-700 pb-4">
          {{ $t('submissions.submitted') }}
          <span
            class="font-medium"
            :style="{
              color: colors.textAccent,
            }"
            >{{ date }}</span
          >
        </span>
        <p class="line-clamp-3">
          {{ submission.text }}
        </p>
        <div class="pt-5">
          <Badge
            :custom-style="{
              backgroundColor: colors.textAccent,
            }"
            size="medium"
            class="relative left-0"
            :value="submission.metadata.evaluation.points"
          >
          </Badge>
          <span class="ml-1 text-sm">{{
            $t('submissions.evaluation.points')
          }}</span>
        </div>
      </div>
    </nuxt-link>
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
  props: {
    submission: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    date() {
      return DateManager.fromNow(this.submission.created_at, this.$i18n.locale)
    },
  },
}
</script>
