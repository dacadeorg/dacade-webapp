<template>
  <div class="row marketing">
    <div class="col-lg-8">
      <div class="site-wraper">
        <!-- Submission Card -->
        <b-card
          class="bg-dark mb-4 small-shadow-no-hover"
          style="border-bottom: 2px solid rgb(83, 209, 175)"
        >
          <span class="float-right muted-dark">
            {{ convertDate(submission.date) }}
          </span>
          <b-card-text>
            <span>
              <b>
                Submission
              </b>
            </span>
            <span class="muted-dark">
              by
            </span>
            <span class="dark-white">
              <b>
                {{ submission.displayName }}
              </b>
            </span>
          </b-card-text>
          <b-card-text>
            {{ submission.text }}
          </b-card-text>
          <div
            v-if="submission.githubLink"
            class="github-link"
          >
            <a class="btn btn-code" target="blank" :href="submission.githubLink">GitHub Code</a>
            <div
              v-if="getGithubUrl"
              class="github-url"
            >
              <a class="btn btn-code" target="blank" :href="getGithubUrl">Website</a>
            </div>
            <div v-if="submission.submissionPoints" class="evaluation-points mt-4">
              <b class="learning-color"> +{{ submission.submissionPoints }}<span class="learning-color-muted">/{{ communityData.assignmentPoints }} LP</span>
              </b>
              <b v-if="submission.submissionReward > 1" class="earning-color ml-1">
                +{{ submission.submissionReward }}$
              </b>
            </div>
          </div>
        </b-card>

        <!-- Evaluation Card -->
        <section v-if="evaluation">
          <b-card
            class="bg-dark mb-4 small-shadow-no-hover"
            style="border-bottom: 2px solid #ffcc00"
          >
            <span class="float-right muted-dark">
              {{ convertDate(evaluation.date) }}
            </span>
            <b-card-text>
              <span>
                <b>
                  Evaluation
                </b>
              </span>
              <span class="muted-dark">
                by
              </span>
              <span class="dark-white">
                <b>
                  {{ evaluation.evaluationDisplayName }}
                </b>
              </span>
            </b-card-text>
            <b-card-text>
              <div v-for="evaluationRating in communityData.challengeRatingCriteriaPoints" :key="evaluationRating.key" class="mb-2">
                <span class="dark-white">
                  {{ evaluation.name }}
                </span>
                <b class="dark-white">{{ evaluationRating.name }}:</b>
                <b class="learning-color">
                  {{ getRatingCriteria(evaluationRating.name,evaluation) }}<span class="learning-color-muted">/{{ evaluationRating.points }} LP</span>
                </b>
                <div v-html="getRatingText(evaluationRating.name,evaluation)" />
              </div>
              <div v-if="submission.submissionReward > 1">
                <span class="dark-white">
                  <b>
                    Reward:
                  </b>
                </span>
                <span class="earning-color">
                  <b>
                    {{ submission.submissionReward }}$
                  </b>
                </span>
                <div>Congratulations you gained at least {{ communityData.challengeThreshold }}% of the available learning points.</div>
              </div>
            </b-card-text>
          </b-card>
        </section>

        <!-- Feedback -->
        <section v-if="feedback">
          <b-card
            v-for="getReview in feedback"
            :key="getReview.key"
            class="bg-dark small-shadow-no-hover mb-4"
            style="border-bottom: 2px solid #9c58ff"
          >
            <span class="float-right muted-dark">
              {{ convertDate(getReview.date) }}
            </span>
            <b-card-text>
              <span>
                <b>
                  Feedback
                </b>
              </span>
              <span class="muted-dark">
                by
              </span>
              <span class="dark-white">
                <b>
                  {{ getReview.reviewDisplayName }}
                </b>
                <span class="muted-dark">(</span><b class="teaching-color">{{ parseFloat(reviewerReputation[getReview.reviewUserId]).toFixed(0) }} REP</b><span class="muted-dark">)</span>
              </span>
            </b-card-text>
            <b-card-text>
              {{ getReview.content }}
            </b-card-text>
            <div
              v-if="getReview.reviewCodeLink"
              class="github-link"
            >
              <a class="btn btn-code" target="blank" :href="getReview.reviewCodeLink">Code Review</a>
            </div>
            <div v-if="getReview.rewardAmount">
              <b class="earning-color mr-1">+{{ getReview.rewardAmount }}$</b>
              <b class="teaching-color">+{{ getReview.rewardAmount }}REP</b>
            </div>
          </b-card>
        </section>

        <!-- Feedback Input Area -->
        <section>
          <h5 class="dark-white mb-2">
            <b>
              Give Feedback
            </b>
          </h5>
          <ValidationObserver v-slot="{ invalid, passes }">
            <b-form @submit.prevent="passes(onSubmit)">
              <b-form-group
                id="input-group-1"
                class="mb-4"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="feedback"
                  rules="required|min:20"
                >
                  <b-form-textarea
                    id="input-1"
                    v-model="review.content"
                    type="text"
                    placeholder="Enter Feedback"
                    rows="4"
                  />
                  <span class="help">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>

              <div v-if="communityData.reviewCodeLink" style="width:100%;">
                <h5 class="dark-white mb-2">
                  <b>
                    GitHub Pull Request
                  </b>
                </h5>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="review code link"
                  rules="min:7"
                >
                  <textarea
                    id="reviewCodeLink"
                    v-model="review.reviewCodeLink"
                    class="form-control"
                    type="text"
                    placeholder="Enter link to GitHub Pull Request"
                    rows="1"
                  />
                  <span class="help">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <b-button class="btn btn-primary btn-lg">
                Submit
              </b-button>
            </b-form>
          </ValidationObserver>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'
import apiJobMixin from '@/mixins/apiJobMixin'
import { firebaseAction } from 'vuexfire'
import { mapGetters } from 'vuex'

export default {
  mixins: [apiJobMixin],
  data() {
    return {
      reviewerReputation: {},
      review: {
        content: null,
        date: Date.now()
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      communityData: 'content/communityData'
    }),
    getGithubUrl() {
      let newUrl = null
      const str = this.submission.githubLink
      if (str.includes('https://github.com/')) {
        const urlsplit = str.split('https://github.com/')
        const urlsplit2 = urlsplit[1].split('/')
        const newUrl = 'https://' + urlsplit2[0] + '.github.io/' + urlsplit2[1]
      }
      return newUrl
    }
  },
  async asyncData({ params }) {
    let submission, feedback, evaluation
    await firebase.database().ref(`submissions/${params.slug}/${params.id}`).once('value').then((snapShot) => {
      submission = snapShot.val()
    })
    await firebase.database().ref(`reviews/${params.id}`).once('value').then((snapShot) => {
      feedback = snapShot.val()
    })
    await firebase.database().ref(`evaluations/${params.id}`).once('value').then((snapShot) => {
      evaluation = snapShot.val()
    })
    return { submission, feedback, evaluation }
  },
  mounted(params) {
    if ((!this.communityData || Object.keys(this.communityData).length === 0)) {
      this.$store.dispatch('content', { payload: params.slug })
    }
  },
  created() {
    this.getReputation(this.feedback)
  },
  methods: {
    jobsDone() {
      this.removeErrors()
      this.review.content = null
      this.review.reviewCodeLink = null
      this.$router.go()
    },
    communityPath(slug) {
      return `/${slug}/submissions`
    },
    onSubmit() {
      if (!this.busy) {
        this.review.reviewDisplayName = this.user.displayName
        this.review.reviewUserId = this.user.id
        this.review['.key'] = this.$route.params.id
        this.$store.dispatch('reviews/createReview', this.review)
      }
    },
    getRatingCriteria(input, input2) {
      if (input === 'Relevance') {
        return input2.relevanceValue
      };
      if (input === 'Originality') {
        return input2.originalityValue
      };
      if (input === 'Quality') {
        return input2.qualityValue
      };
    },
    getRatingText(input, input2) {
      if (input === 'Relevance') {
        return input2.relevanceText
      };
      if (input === 'Originality') {
        return input2.originalityText
      };
      if (input === 'Quality') {
        return input2.qualityText
      };
    },
    convertDate(date) {
      const submissionInputDate = new Date(date)
      const submissionDate = submissionInputDate.toDateString().slice(4, -4)
      let submissionMinutes = submissionInputDate.getMinutes()
      if (submissionMinutes < 10) {
        submissionMinutes = '0' + submissionMinutes
      }
      let submissionHours = submissionInputDate.getHours()
      if (submissionHours < 10) {
        submissionHours = '0' + submissionHours
      }
      const submissionTime = submissionHours + ':' + submissionMinutes
      const submissionTimeAndDate = submissionDate + ' ' + submissionTime
      return submissionTimeAndDate
    },
    async getReputation(feedback) {
      if (feedback) {
        for (let index = 0; index < Object.keys(feedback).length; index++) {
          const element = Object.values(feedback)[index]
          const userId = element.reviewUserId
          const eventref = await firebase.database().ref(`reputation/${userId}/${this.communityData.id}`)
          const snapshot = await eventref.once('value')
          const value = snapshot.val()
          if (value) {
            this.$set(this.reviewerReputation, userId, value)
          } else {
            this.$set(this.reviewerReputation, userId, 0)
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.github-link a{
  font-family: 'Inconsolata', monospace;
}
.github-link i{
  color:rgba(255,255,255,.3);
  margin-left: 0.5rem;
}
.github-url {
  margin-top:1em;
}
.github-link url{
  font-family: 'Inconsolata', monospace;
}
.github-link url{
  color:rgba(0,0,0,.4);
  margin-left: 0.5rem;
}
</style>
