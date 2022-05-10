<template>
  <div
    class="py-5 border rounded-t relative"
    :class="
      reviewed ? 'bg-gray-50 border-gray-200' : 'bg-yellow-50 border-yellow-200'
    "
  >
    <Coin
      v-if="reward"
      :token="reward.token"
      class="absolute sm:-ml-7 left-3 sm:left-0 top-6 sm:top-4 w-10 h-10 sm:w-15 sm:h-15"
      :bg-color="reviewed ? '#d2d2d2' : null"
      :color="reviewed ? '#FFFFFF' : null"
    />
    <div :class="reviewed ? 'text-gray-700' : 'text-yellow-900'">
      <div class="relative">
        <div
          class="divide-y sm:divide-y-0 space-y-4"
          :class="reviewed ? 'divide-gray-200' : 'divide-yellow-200'"
        >
          <div class="sm:pl-10 pl-15">
            <div v-if="reward" class="font-medium text-lg">
              {{ reward.amount }}
              {{ reward.token }}
            </div>
            <div class="text-sm md">
              {{ $t('feedback.bounty') }}
              <span v-if="reviewed" class="font-medium"
                >{{ $t('feedback.issued') }}
              </span>
              <span v-if="submission.reviewable" class="font-medium"
                >~ {{ deadline }}</span
              >
            </div>
          </div>
          <div
            class="divide-y space-y-4 flex-inline text-base font-medium sm:right-8 sm:top-3 sm:absolute pt-4 sm:pt-0"
            :class="reviewed ? 'divide-gray-200 ' : 'divide-yellow-200'"
          >
            <div
              v-if="
                submission.challenge.feedbackInfo &&
                submission.challenge.feedbackInfo.length
              "
              class="pl-15 sm:pl-0 flex items-center justify-between cursor-pointer"
              @click="infoVisibility = !infoVisibility"
            >
              <p class="text-sm">
                {{ $t('communities.submissions.feedback.reward-info') }}
              </p>
              <span class="px-4">
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
            class="divide-y space-y-4"
            :class="reviewed ? 'border-gray-200' : 'border-yellow-200'"
          >
            <div
              v-for="(item, key) in list"
              :key="key"
              class="pt-6 px-3.75 sm:px-10 pb-0 sm:border-t font-medium"
              :class="reviewed ? 'border-gray-200' : 'border-yellow-200'"
            >
              <span class="relative block">{{
                $t('feedback.criteria.' + item.name)
              }}</span>
              <div
                class="sm:-ml-6 px-5 sm:p-0"
                :class="reviewed ? 'text-gray-600' : 'text-yellow-900'"
              >
                <ObjectiveList
                  :iconcolor="reviewed ? '#9CA3AF' : '#F59E0B'"
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
    reviewed() {
      return (
        this.submission?.metadata?.evaluation ||
        this.submission?.metadata?.reviewed
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
