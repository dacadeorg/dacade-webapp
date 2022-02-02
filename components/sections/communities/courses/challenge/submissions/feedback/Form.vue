<template>
  <div>
    <ValidationObserver ref="form" v-slot="{ passes }">
      <form @submit.prevent="passes(submit)">
        <div class="relative w-full">
          <div class="relative">
            <div class="absolute z-50 left-3 md:-left-7 top-3">
              <Avatar :user="user" size="medium" />
            </div>
          </div>
          <div label-for="input-text">
            <ValidationProvider
              v-slot="{ errors }"
              name="input-text"
              rules="required|length:15"
              mode="passive"
            >
              <TextInput
                id="input-text"
                name="text"
                :placeholder="
                  $t('communities.challenge.submission.placeholder.text')
                "
                input-class="border-t-0"
                :error="errors[0]"
                :value="text"
                @input="text = $event"
              />
            </ValidationProvider>
          </div>
          <div
            v-if="submission.challenge.format.githubLink"
            label-for="input-github"
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="input-github"
              class="flex w-full"
              rules="url"
              mode="passive"
            >
              <GithubLinkInput
                id="input-github"
                name="githubLink"
                is-github-link
                :error="errors[0]"
                :value="githubLink"
                class="
                  p-0
                  border border-t-0 border-solid border-gray-200
                  focus:outline-none
                  outline-none
                  active:border-none
                  focus:border-none
                  block
                  m-0
                  flex-grow
                  w-full
                  placeholder-gray-400 placeholder-opacity-100
                "
                :placeholder="
                  $t('communities.challenge.submission.placeholder.github')
                "
                @input="githubLink = $event"
              />
              <GithubIcon
                class="absolute ml-4 my-7 flex-none text-gray-400 m-0 p-0 block"
              />
            </ValidationProvider>
          </div>
          <div class="text-right mt-5">
            <Button
              type="submit"
              :disabled="saving"
              :custom-style="activeButtonStyle"
            >
              <span class="flex text-left items-center text-sm w-32 h-6">
                {{ $t('submit') }}
                <span v-if="saving === false" class="ml-16 w-3"
                  ><ArrowRightIcon
                /></span>
                <span v-else class="text-white ml-16">
                  <Spinner class="animate-spin" />
                </span>
              </span>
            </Button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import TextInput from '@/components/ui/TextInput'
import GithubLinkInput from '@/components/ui/GithubLinkInput'
import Button from '@/components/ui/Button'
import Spinner from '~/assets/icons/spinner.svg?inline'
import GithubIcon from '~/assets/icons/github.svg?inline'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'Feedback',
  components: {
    ArrowRightIcon,
    GithubIcon,
    Button,
    Avatar,
    TextInput,
    GithubLinkInput,
    Spinner,
  },
  data() {
    return {
      state: {
        visiblity: false,
      },
      text: '',
      githubLink: '',
      saving: false,
      // errors: [],
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
      colors: 'ui/colors',
      submission: 'communities/challenges/submissions/current',
      community: 'communities/current',
    }),
    activeButtonStyle() {
      return {
        color: this.colors.text,
        backgroundColor: this.colors.textAccent,
      }
    },
  },
  methods: {
    submit() {
      const isValid = this.$refs.form.validate()
      if (isValid) {
        if (!this.saving) {
          this.saving = true
          this.$api
            .post(`feedbacks/create`, {
              submission_id: this.submission.id,
              text: this.text,
              link: this.githubLink,
            })
            .then((response) => {
              this.$store.dispatch('events/create', {
                name: 'feedback-created',
                attributes: {
                  feedbackId: response.id,
                  submissionId: this.submission.id,
                  community: this.community.slug,
                },
              })
              this.text = ''
              this.githubLink = ''
              this.saving = false
              this.$emit('save', response)
            })
            .catch((error) => {
              this.errors = error.details
              this.saving = false
              if (error.details) {
                this.$refs.form.setErrors(error.details)
              }
            })
        }
      }
    },
  },
}
</script>
