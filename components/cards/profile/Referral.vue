<template>
  <div class="bg-gray-50 text-sm text-gray-700 md:mb-0">
    <div class="flex p-7">
      <div class="">
        <Avatar
          size="large"
          :user="referral.user"
        />
      </div>
      <div class="ml-5">
        <span class="text-lg leading-loose font-medium text-gray-900 pb-1">
          {{ referral.user.displayName }}
        </span>
        <p>{{ $t('referrals.joined') }} {{ joinedAt }}</p>
        <div class="pt-1">
          <ul class="text-sm leading-loose font-light text-gray-700 pb-1 list">
            <li v-if="referral.challenge && referral.community">
              <span class="ml-5">{{
                $t('referrals.challenge-participation')
              }}</span>
              <span class="font-bold">{{ referral.community.name }}</span>
              <span class="hidden md:inline-block">{{ participatedAt }}</span>
            </li>

            <li
              v-if="
                referral.submission &&
                referral.submission.metadata &&
                referral.submission.metadata.evaluation
              "
            >
              <span class="ml-5"
                >{{ $t('referrals.submission.evaluation') }}
              </span>
              <span class="font-bold"
                >{{ referral.submission.metadata.evaluation.points }}/{{
                  referral.submission.metadata.evaluation.totalPoints
                }}</span
              >
              {{ $t('referrals.submission.points') }}
              <span class="hidden md:inline-block">{{ rewardAt }}</span>
            </li>

            <li
              v-if="
                referral.rewarded &&
                referral.metadata &&
                referral.metadata.reward
              "
            >
              <span class="ml-5"> {{ $t('referrals.reward.text') }}</span>
              <span class="font-bold"
                ><Reward type="gray" :reward="referral.metadata.reward"
              /></span>
              <span class="hidden md:inline-block">{{ rewardAt }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Reward from '@/components/badges/Reward'
import Avatar from '@/components/ui/Avatar'
import DateManager from '@/utilities/DateManager'
export default {
  name: 'Referral',
  components: {
    Avatar,
    Reward,
  },
  props: {
    referral: {
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
    joinedAt() {
      return DateManager.fromNow(
        this.referral.user.created_at,
        this.$i18n.locale
      )
    },
    participatedAt() {
      if (!this.referral.submission) return null
      return DateManager.fromNow(
        this.referral.submission.created_at,
        this.$i18n.locale
      )
    },
    rewardAt() {
      if (!this.referral.rewarded) return null
      return DateManager.fromNow(this.referral.updated_at, this.$i18n.locale)
    },
  },
}
</script>
