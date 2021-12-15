<template>
  <div
    class="py-5 border rounded-t relative"
    :class="
      !submission.reviewable
        ? 'bg-gray-50 border-gray-200'
        : 'bg-yellow-50 border-yellow-200'
    "
  >
    <Coin
      v-if="reward"
      :token="reward.token"
      class="
        absolute
        md:-ml-7
        left-3
        md:left-0
        top-6
        md:top-4
        w-10
        h-10
        p-4
        md:w-15 md:h-15
      "
      :bg-color="!submission.reviewable ? '#d2d2d2' : null"
      :color="!submission.reviewable ? '#FFFFFF' : null"
    />
    <div :class="!submission.reviewable ? 'text-gray-700' : 'text-yellow-900'">
      <div class="md:ml-10 ml-15">
        <div
          class="divide-y md:divide-y-0 space-y-4"
          :class="
            !submission.reviewable ? 'divide-gray-200' : 'divide-yellow-200'
          "
        >
          <div>
            <div v-if="reward" class="font-medium text-lg">
              {{ reward.amount }}
              {{ reward.token }}
            </div>
            <div class="text-sm md">
              {{ $t('feedback.bounty') }}
              <span v-if="!submission.reviewable" class="font-medium"
                >{{ $t('feedback.issued') }}
              </span>
              <span v-else class="font-medium">~ {{ deadline }}</span>
            </div>
          </div>
          <div
            class="
              divide-y
              space-y-4
              flex-inline
              text-base
              font-medium
              right-8
              top-7
              md:absolute
              pt-3
              md:pt-0
            "
            :class="
              !submission.reviewable ? 'divide-gray-200 ' : 'divide-yellow-200'
            "
          >
            <div
              v-if="
                submission.challenge.feedbackInfo &&
                submission.challenge.feedbackInfo.length
              "
              class="flex justify-between cursor-pointer"
              @click="infoVisibility = !infoVisibility"
            >
              <p>
                {{ $t('communities.submissions.feedback.reward-info') }}
              </p>
              <span class="mt-2 px-4">
                <div v-if="infoVisibility === true">
                  <ChevronTopIcon />
                </div>
                <div v-else>
                  <ChevronBottomIcon />
                </div>
              </span>
            </div>
          </div>
          <div
            v-show="infoVisibility === true"
            class="-ml-15 md:-ml-9 md:-mr-4 pl-4 divide-y space-y-4"
            :class="
              !submission.reviewable ? 'border-gray-200' : 'border-yellow-200'
            "
          >
            <div
              v-for="(item, key) in list"
              :key="key"
              class="
                md:-ml-5
                -ml-4
                md:mr-4
                px-5
                pt-6
                pb-0
                md:border-t
                font-medium
              "
              :class="
                !submission.reviewable ? 'border-gray-200' : 'border-yellow-200'
              "
            >
              <span class="relative block">{{
                $t('feedback.criteria.' + item.name)
              }}</span>
              <div
                class="px-5"
                :class="
                  !submission.reviewable ? 'text-gray-600' : 'text-yellow-900'
                "
              >
                <ObjectiveList
                  :iconcolor="!submission.reviewable ? '#9CA3AF' : '#F59E0B'"
                  :crossmark="!item.positive"
                  :objectives="item.criteria"
                />
                <div
                  v-if="item.description"
                  class="mt-4 text-sm font-normal"
                  v-html="item.description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Coin from '@/components/ui/Coin'
import ObjectiveList from '@/components/list/Objectives'
import DateManager from '@/utilities/DateManager'
import ChevronBottomIcon from '~/assets/icons/chevron-bottom.svg?inline'
import ChevronTopIcon from '~/assets/icons/chevron-top.svg?inline'

export default {
  name: 'Feedback',
  components: {
    Coin,
    ObjectiveList,
    ChevronBottomIcon,
    ChevronTopIcon,
  },
  data() {
    return {
      infoVisibility: false,
      text: '',
      githubLink: '',
      feedback: [
        'The best feedback receives <b>3 CGLD</b>',
        'The second feedback receives <b>1.5 CGLD</b>',
        'The third feedback receives <b>0.5 CGLD</b>',
      ],
      description:
        'This applies only if the submission reaches 6/20 Points otherwise the best feedback will get 0.5 CGLD',
    }
  },

  computed: {
    ...mapGetters({
      community: 'communities/current',
      user: 'user/get',
      colors: 'ui/colors',
      submission: 'communities/challenges/submissions/current',
    }),
    reward() {
      return this.submission?.challenge?.rewards.find(
        (reward) => reward.type === 'FEEDBACK'
      )
    },
    activeButtonStyle() {
      return {
        color: this.colors.text,
        backgroundColor: this.colors.textAccent,
      }
    },
    deadline() {
      return DateManager.fromNow(this.submission.reviewDeadline)
    },
    list() {
      return this.submission.challenge.feedbackInfo
    },
  },
}
</script>
