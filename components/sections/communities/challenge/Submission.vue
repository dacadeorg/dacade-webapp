<template>
  <Section :title="$t('communities.challenge.submission')">
    <ValidationObserver ref="form" v-slot="{ passes }">
      <form @submit.prevent="passes(submit)">
        <div v-if="challenge.format" class="relative w-full md:pl-7.5 my-6">
          <div class="absolute z-50 left-3 md:left-0 top-3">
            <Avatar :user="user" size="medium" />
          </div>

          <div label-for="input-2">
            <ValidationProvider
              v-slot="{ errors }"
              name="text"
              rules="required|length:100"
              mode="passive"
            >
              <TextInput
                id="input-2"
                name="text"
                :placeholder="
                  $t('communities.challenge.submission.placeholder.text')
                "
                :error="errors[0]"
                :value="form.text"
                @input="form.text = $event"
              />
            </ValidationProvider>
          </div>
          <div
            v-if="challenge.format.githubLink"
            class="
              w-full
              border border-solid border-grey-200
              m-0
              rounded-b
              text-lg
              py-0
              leading-none
              items-center
              space-x-2
            "
            :class="{ 'border-t-0': challenge.format.text }"
          >
            <div label-for="input-2">
              <ValidationProvider
                v-slot="{ errors }"
                name="input-2"
                class="flex w-full"
                rules="required|length:10|"
                mode="passive"
              >
                <!-- <GithubIcon class="flex-none text-gray-400 m-0 p-0 block" /> -->

                <GithubLinkInput
                  id="input-2"
                  name="githubLink"
                  is-github-link
                  :error="errors[0]"
                  :value="form.githubLink"
                  class="
                    p-0
                    border-none border-transparent
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
                  @input="form.githubLink = $event"
                />
                <GithubIcon
                  class="
                    absolute
                    ml-4
                    my-7
                    flex-none
                    text-gray-400
                    m-0
                    p-0
                    block
                  "
                />
              </ValidationProvider>
            </div>
          </div>
        </div>
        <div class="text-right">
          <Button
            type="submit"
            :disabled="submitting"
            :custom-style="activeButtonStyle"
          >
            <!-- @click="submit" -->
            <span class="flex text-left items-center text-sm w-32 h-6">
              {{ $t('submit') }}
              <span v-if="submitting === false" class="ml-16 w-3"
                ><ArrowRightIcon
              /></span>
              <span v-else class="text-white ml-16">
                <Spinner class="animate-spin" />
              </span>
            </span>
          </Button>
          <NotificationBar />
        </div>
      </form>
    </ValidationObserver>
  </Section>
</template>
<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import NotificationBar from '@/components/NotificationBar'
import TextInput from '@/components/ui/TextInput'
import GithubLinkInput from '@/components/ui/GithubLinkInput'
import Button from '@/components/ui/Button'
import Section from '../partials/Section.vue'
import GithubIcon from '~/assets/icons/github.svg?inline'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'
import Spinner from '~/assets/icons/spinner.svg?inline'

export default {
  name: 'Submission',
  components: {
    Section,
    ArrowRightIcon,
    GithubIcon,
    Button,
    TextInput,
    GithubLinkInput,
    Spinner,
    NotificationBar,
    Avatar,
  },
  data() {
    return {
      form: {
        text: '',
        githubLink: '',
      },
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
      const isValid = this.$refs.form.validate()
      if (isValid) {
        if (!this.submitting) {
          this.submitting = true
          this.$store
            .dispatch('communities/submissions/create', {
              challengeId: this.challenge.id,
              text: this.form.text,
              link: this.form.githubLink,
            })
            .then((response) => {
              this.form.text = ''
              this.form.githubLink = ''
              this.form.submitting = false
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error)
              // setError(error)
              this.submitting = false
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
