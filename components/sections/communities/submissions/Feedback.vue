<template>
  <Section>
    <div class="relative w-full">
      <div
        class="py-5 border rounded-t"
        :class="state.issued ? 'bg-gray-50 border-gray-200' : 'bg-yellow-50 border-yellow-200'"
      >
        <Coin
          class="absolute md:-ml-7 left-3 md:left-0 top-6 md:top-4 w-10 h-10 p-4  md:w-15 md:h-15 "
          :color="state.issued ? '#d2d2d2' : '#fbcc5c'"
        />
        <div :class="state.issued ? 'text-gray-700' : 'text-yellow-900'">
          <div class="md:ml-10 ml-15">
            <div
              class="divide-y  md:divide-y-0 space-y-4"
              :class="state.issued ? 'divide-gray-200' : 'divide-yellow-200'"
            >
              <div>
                <div class="font-medium text-lg">
                  {{ reward.quantity }}
                  {{ reward.denom }}
                </div>
                <div class="text-sm md">
                  {{ $t('feedback.bounty') }}
                  <span v-if="state.issued" class="font-medium">{{ $t('feedback.issued') }} </span>
                  <span v-else class="font-medium">~{{ $t('feedback.ends') }} {{ reward.endsIn }}</span>
                </div>
              </div>
              <div
                class="divide-y space-y-4 flex-inline  text-base font-medium right-8 top-7 md:absolute pt-3 md:pt-0"
                :class="state.issued ? 'divide-gray-200 ' : 'divide-yellow-200'"
              >
                <div class="flex justify-between" @click="state.visiblity = !state.visiblity">
                  <p>{{ $t('communities.submissions.feedback.reward-info') }}</p>
                  <span class="mt-2 px-4">
                    <div v-if="state.visiblity === true">
                      <ChevronTopIcon />
                    </div>
                    <div v-else>
                      <ChevronBottomIcon />
                    </div>
                  </span>
                </div>
              </div>
              <div
                v-if="state.visiblity === true"
                class="-ml-15 md:-ml-9 md:-mr-4 pl-4 divide-y space-y-4"
                :class="state.issued ? 'border-gray-200' : 'border-yellow-200'"
              >
                <div
                  v-for="(item, key) in criteria"
                  :key="key"
                  class="md:-ml-5 -ml-4 md:mr-4 px-5 pt-6 pb-0 md:border-t  font-medium"
                  :class="state.issued ? 'border-gray-200' : 'border-yellow-200'"
                >
                  {{ item.type }}
                  <div
                    class="px-5"
                    :class="state.issued ? 'text-gray-600' : 'text-yellow-900'"
                  >
                    <ObjectiveList
                      :iconcolor="state.issued ? '#9CA3AF' :'#F59E0B'"
                      :crossmark="item.crossmark"
                      :objectives="item.list"
                    />
                    <div v-if="item.description" class="mt-4 text-sm font-normal">
                      {{ item.description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative">
      <div class="absolute md:-ml-7 left-3 md:left-0 top-3">
        <Avatar :user="user" size="medium" />
      </div>
    </div>
    <textarea
      v-if="community.challenge.format.text"
      v-model="text"
      :placeholder="
        $t('communities.challenge.submission.feedback.placeholder.text')
      "
      :class="{ 'rounded-b': !community.challenge.format.githubLink }"
      class="w-full border border-t-0 border-solid border-grey-200 h-56 resize-none m-0 pt-5 md:pt-7.5 pl-15  pr-2 md:px-10.75 block text-lg focus:outline-none placeholder-gray-400 placeholder-opacity-100"
    />
    <div
      v-if="community.challenge.format.githubLink"
      class="w-full border border-solid border-grey-200 m-0 rounded-b flex text-base md:text-lg py-6 leading-none items-center pr-10.75 pl-3.75 space-x-2"
      :class="{ 'border-t-0': community.challenge.format.text }"
    >
      <GithubIcon class="flex-none text-gray-400 m-0 p-0 block" />
      <input
        v-model="githubLink"
        class="p-0 border-none focus:outline-none block m-0 flex-grow placeholder-gray-400 placeholder-opacity-100"
        :placeholder="
          $t('communities.challenge.submission.feedback.placeholder.github')
        "
      >
    </div>
    <div class="text-right  pt-5">
      <Button :custom-style="activeButtonStyle" @click="submit">
        <span
          class="flex text-left items-center text-sm w-32 h-6"
          @click="state.issued = !state.issued"
        >
          {{ $t('submit') }}
          <span class="ml-16 w-3"><ArrowRightIcon /></span>
        </span>
      </Button>
    </div>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Coin from '@/components/ui/Coin'
import ObjectiveList from '@/components/list/Objectives'
import Section from '../partials/Section.vue'
import GithubIcon from '~/assets/icons/github.svg?inline'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'
import ChevronBottomIcon from '~/assets/icons/chevron-bottom.svg?inline'
import ChevronTopIcon from '~/assets/icons/chevron-top.svg?inline'

export default {
  name: 'Feedback',
  components: {
    ObjectiveList,
    ChevronBottomIcon,
    ChevronTopIcon,
    Section,
    Coin,
    ArrowRightIcon,
    GithubIcon,
    Button,
    Avatar
  },
  data () {
    return {
      state: {
        issued: false,
        visiblity: false
      },
      text: '',
      githubLink: ''
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      user: 'user/get',
      colors: 'ui/colors'
    }),
    reward () {
      return { quantity: 5, denom: 'CGLD', endsIn: '3 days' }
    },
    rewards () {
      return this.community.rewards.filter(
        reward => reward.type === 'SUBMISSION'
      )
    },
    activeButtonStyle () {
      return {
        color: this.colors.text,
        backgroundColor: this.colors.textAccent
      }
    },
    criteria () {
      return [
        {
          type: 'Feedback Rewards',
          list: this.community?.objectives,
          crossmark: false,
          description: 'This applies only if the submission reaches 6/20 Points otherwise the best feedback will get 0.5 CGLD'
        },
        {
          type: 'Do',
          list: this.community?.objectives,
          crossmark: false
        },
        {
          type: "Don't",
          list: this.community?.objectives,
          crossmark: true
        }
      ]
    }
  },
  methods: {
    submit () {
      alert(`Saving\n\n${this.text}\n${this.githubLink}`)
      this.$router.push(`/communities/${this.$route.params.slug}/submissions`)
    }
  }
}
</script>
