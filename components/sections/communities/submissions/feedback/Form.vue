<template>
  <div class="relative w-full">
    <div class="relative">
      <div class="absolute md:-ml-7 left-3 md:left-0 top-3">
        <Avatar :user="user" size="medium" />
      </div>
    </div>
    <textarea
      v-if="submission.challenge.format.text"
      v-model="text"
      :placeholder="
        $t('communities.challenge.submission.feedback.placeholder.text')
      "
      :class="{ 'rounded-b': !submission.challenge.format.githubLink }"
      class="
        w-full
        border border-t-0 border-solid border-grey-200
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
      class="
        w-full
        border border-solid border-grey-200
        m-0
        rounded-b
        flex
        text-base
        md:text-lg
        py-6
        leading-none
        items-center
        pr-10.75
        pl-3.75
        space-x-2
      "
      :class="{ 'border-t-0': submission.challenge.format.text }"
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
          $t('communities.challenge.submission.feedback.placeholder.github')
        "
      />
    </div>
    <div class="text-right pt-5">
      <Button
        :disabled="saving"
        :custom-style="activeButtonStyle"
        @click="submit()"
      >
        <span
          class="flex text-left items-center text-sm w-32 h-6"
          @click="state.issued = !state.issued"
        >
          {{ $t('submit') }}
          <span class="ml-16 w-3"><ArrowRightIcon /></span>
        </span>
      </Button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import GithubIcon from '~/assets/icons/github.svg?inline'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'Feedback',
  components: {
    ArrowRightIcon,
    GithubIcon,
    Button,
    Avatar,
  },
  data() {
    return {
      state: {
        issued: false,
        visiblity: false,
      },
      text: '',
      githubLink: '',
      saving: false,
      errors: [],
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      user: 'user/get',
      colors: 'ui/colors',
      submission: 'communities/submissions/current',
    }),
    activeButtonStyle() {
      return {
        color: this.colors.text,
        backgroundColor: this.colors.textAccent,
      }
    },
    criteria() {
      return [
        {
          type: 'Feedback Rewards',
          list: this.community?.objectives,
          crossmark: false,
          description:
            'This applies only if the submission reaches 6/20 Points otherwise the best feedback will get 0.5 CGLD',
        },
        {
          type: 'Do',
          list: this.community?.objectives,
          crossmark: false,
        },
        {
          type: "Don't",
          list: this.community?.objectives,
          crossmark: true,
        },
      ]
    },
  },
  methods: {
    submit() {
      // eslint-disable-next-line no-console
      console.log('saving', this.saving)
      if (!this.saving) {
        this.saving = true
        this.$api
          .post(`feedbacks/create/`, {
            submission_id: this.submission.id,
            text: this.text,
            link: this.githubLink,
          })
          .then((response) => {
            this.text = ''
            this.githubLink = ''
            this.saving = false
            this.$emit('save', response)
            // eslint-disable-next-line no-console
            console.log(response)
            alert('Feedback saved')
          })
          .catch((error) => {
            this.errors = error.details
            this.saving = false
            // eslint-disable-next-line no-console
            console.log(error, error.details)
          })
      }
    },
  },
}
</script>
