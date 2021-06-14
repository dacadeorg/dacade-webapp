<template>
  <Section :title="$t('communities.challenge.submission')">
    <div v-if="challenge.format" class="relative w-full md:pl-7.5 my-6">
      <div class="absolute left-3 md:left-0 top-3">
        <Avatar :user="user" size="medium" />
      </div>
      <textarea
        v-if="challenge.format.text"
        v-model="text"
        :placeholder="$t('communities.challenge.submission.placeholder.text')"
        :class="{ 'rounded-b': !challenge.format.githubLink }"
        class="
          w-full
          border border-solid border-grey-200
          h-56
          resize-none
          m-0
          pt-5
          md:pt-7.5
          pl-15
          pr-2
          md:px-10.75
          block
          text-lg
          focus:outline-none
          placeholder-gray-400 placeholder-opacity-100
        "
      />
      <div
        v-if="challenge.format.githubLink"
        class="
          w-full
          border border-solid border-grey-200
          m-0
          rounded-b
          flex
          text-lg
          py-6
          leading-none
          items-center
          pr-10.75
          pl-3.75
          space-x-2
        "
        :class="{ 'border-t-0': challenge.format.text }"
      >
        <GithubIcon class="flex-none text-gray-400 m-0 p-0 block" />
        <input
          v-model="githubLink"
          class="
            p-0
            border-none
            focus:outline-none
            block
            m-0
            flex-grow
            placeholder-gray-400 placeholder-opacity-100
          "
          :placeholder="
            $t('communities.challenge.submission.placeholder.github')
          "
        />
      </div>
    </div>
    <div class="text-right">
      <Button
        :disabled="submitting"
        :custom-style="activeButtonStyle"
        @click="submit"
      >
        <span class="flex text-left items-center text-sm w-32 h-6">
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
import Section from '../partials/Section.vue'
import GithubIcon from '~/assets/icons/github.svg?inline'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'Submission',
  components: {
    Section,
    ArrowRightIcon,
    GithubIcon,
    Button,
    Avatar,
  },
  data() {
    return {
      text: '',
      githubLink: '',
      submitting: false,
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      user: 'user/get',
      colors: 'ui/colors',
      challenge: 'communities/challenges/current',
    }),
    rewards() {
      return this.challenge.rewards?.filter(
        (reward) => reward.type === 'SUBMISSION'
      )
    },
    activeButtonStyle() {
      return {
        color: this.colors.text,
        backgroundColor: this.colors.textAccent,
      }
    },
  },
  methods: {
    submit() {
      if (!this.submitting) {
        this.submitting = true
        this.$api
          .post('submissions/create', {
            challenge_id: this.challenge.id,
            text: this.text,
            link: this.githubLink,
          })
          .then((response) => {
            this.text = ''
            this.githubLink = ''
            this.submitting = false
            console.log(response)
            alert('Submission saved')
          })
          .catch((error) => {
            console.log(error)
            this.submitting = false
          })
      }
    },
  },
}
</script>
