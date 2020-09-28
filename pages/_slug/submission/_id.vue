<template>
  <div class="row marketing">
    <div class="col-lg-8">
      <div class="site-wraper">
        <!-- Submission Card -->
        <b-card
          v-if="submission"
          class="bg-dark mb-4 small-shadow-no-hover"
          style="border-bottom: 2px solid rgb(83, 209, 175)"
        >
          <span class="float-right muted-dark">
            {{ convertDate(submission.date) }}
          </span>
          <b-card-text>
            <span>
              <b class="white">
                Submission
              </b>
            </span>
            <span class="muted-dark">
              by
            </span>
            <span>
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
            <span
              v-if="getGithubUrl"
            >
              <a class="btn btn-code" target="blank" :href="getGithubUrl()">Website</a>
            </span>
          </div>
          <div v-if="submission.submissionPoints != null" class="evaluation-points mt-4">
            <b class="learning-color"> +{{ submission.submissionPoints }}<span class="learning-color-muted">/{{ communityData.assignmentPoints }} Points</span>
            </b>
            <b v-if="submission.submissionReward > 1">
              <span
                v-if="communityData.priceFormat === 'DCN' && submission.date > 1581344763000"
                class="ml-2"
              >
                +{{ submission.submissionReward }}
                <img class="DCN" src="/img/DCN.png" height="18" alt="">
              </span>
              <span
                v-else
                class="earning-color ml-1"
              >
                +{{ submission.submissionReward }}$
              </span>
            </b>
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
                <b class="white">
                  Evaluation
                </b>
              </span>
              <span class="muted-dark">
                by
              </span>
              <span>
                <b>
                  {{ evaluation.evaluationDisplayName }}
                </b>
              </span>
            </b-card-text>

            <b-card-text>
              <div class="mb-2">
                <div v-if="evaluation.date > 1574462532000">
                  <!-- New evaluation model, since 19.11.2019 -->
                  <div v-for="(evaluationRating, index) in communityData.challengeRubric" :key="index" class="mb-2">
                    <div class="mb-2">
                      <b>
                        {{ evaluationRating.text }}:
                      </b>
                    </div>
                    <div class="row">
                      <div
                        v-for="rubric in evaluationRating.rubric"
                        :key="rubric.key"
                        class="col-md-3 col-6 mb-2"
                        :class="rubric.points == evaluation[evaluationRating.name] ? 'color-default' : 'muted'"
                      >
                        <div class="learning-color fs-1">
                          <b>
                            {{ rubric.points }} Points
                          </b>
                        </div>
                        <div class="text-left fs-08">
                          {{ rubric.text }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Old evaluation model -->
                <div v-else>
                  <div v-for="(evaluationRating, index) in communityData.challengeRatingCriteriaPoints" :key="index" class="mb-2">
                    <b class="dark-white">
                      {{ evaluationRating.name }}:
                    </b>
                    <b class="learning-color">
                      {{ getRatingValue(evaluationRating.name,evaluation) }}<span class="learning-color-muted">/{{ evaluationRating.points }} Points</span>
                    </b>
                    <div v-html="getRatingText(evaluationRating.name,evaluation)" />
                  </div>
                </div>
                <!-- Old evaluation model end -->
                <div class="dark-white mb-2">
                  <b>Total:</b>
                  <b class="learning-color">{{ submission.submissionPoints }}<span class="learning-color-muted">/{{ communityData.assignmentPoints }} Points</span></b>
                </div>
                <div
                  v-if="evaluation.comment"
                  class="dark-white mb-2"
                >
                  <b>Comment:</b>
                  <div class="color-default">
                    {{ evaluation.comment }}
                  </div>
                </div>
              </div>

              <div v-if="submission.submissionReward > 1">
                <span class="dark-white">
                  <b>
                    Reward:
                  </b>
                </span>
                <span>
                  <b>
                    <span
                      v-if="communityData.priceFormat === 'DCN' && submission.date > 1581344763000"
                      class="ml-1"
                    >
                      +{{ submission.submissionReward }}
                      <img class="DCN" src="/img/DCN.png" height="18" alt="">
                    </span>
                    <span
                      v-else
                      class="earning-color ml-1"
                    >
                      +{{ submission.submissionReward }}$
                    </span>
                  </b>

                </span>
                <div>
                  Congratulations you gained at least {{ communityData.challengeThreshold }}% of the available learning points.
                </div>
              </div>
            </b-card-text>
          </b-card>
        </section>

        <!-- Feedback -->
        <section v-if="feedback">
          <div v-if="evaluation" class="text-center muted mb-4">
            <i>Feedback rewards issued. Learn more</i>
            <span v-b-modal.modal-reward-info class="fa fa-info-circle pointer info" />
            <b-modal
              v-if="communityData.feedbackInfo"
              id="modal-reward-info"
              header-text-variant="light"
              title="Feedback Reward Info"
              size="lg"
              hide-footer
            >
              <article>
                <section>
                  <h3 class="dark-white">
                    <b class="earning-color">
                      $
                    </b>
                    <b>Feedback Rewards</b>
                  </h3>
                  <ol>
                    <li>
                      The best feedback receives 60% of the feedback bounty.
                    </li>
                    <li>
                      The second best feedback receives 30% of the feedback bounty.
                    </li>
                    <li>
                      The third best feedback receives 10% of the feedback bounty.
                    </li>
                  </ol>
                  <p class="muted-dark">
                    This applies only if the submission reaches 30% of the learning points, otherwise the best feedback will get 10% of the learning rewards.
                  </p>
                </section>
              </article>
            </b-modal>
          </div>
          <b-card
            v-for="(getReview, index) in orderedFeedback"
            :key="index"
            class="bg-dark mb-4"
            :class="index == 0 ? 'big-shadow' : 'small-shadow-no-hover'"
            style="border-bottom: 2px solid #9c58ff"
          >
            <span class="float-right muted-dark">
              {{ convertDate(getReview.date) }}
            </span>
            <b-card-text>
              <span>
                <b class="white">
                  Feedback
                </b>
              </span>
              <span class="muted-dark">
                by
              </span>
              <span>
                <b>{{ getReview.reviewDisplayName }}</b><span class="muted-dark">/</span><b class="teaching-color">{{ parseFloat(reviewerReputation[getReview.reviewUserId]).toFixed(1) }} REP</b>
              </span>
            </b-card-text>
            <b-card-text>
              {{ getReview.content }}
            </b-card-text>
            <div
              v-if="getReview.reviewCodeLink"
              class="github-link mb-4"
            >
              <a class="btn btn-code" target="blank" :href="getReview.reviewCodeLink">Code Review</a>
            </div>
            <div v-if="getReview.rewardAmount">
              <span
                v-if="index == 0"
                class="mr-2 feedback-first small-shadow-no-hover"
              >
                #1
              </span>
              <span
                v-if="index == 1"
                class="mr-2 feedback-ranked small-shadow-no-hover"
              >
                2ND
              </span>
              <span v-if="index == 2" class="mr-2 feedback-ranked small-shadow-no-hover">
                3RD
              </span>
              <b>
                <span
                  v-if="communityData.priceFormat === 'DCN' && submission.date > 1581344763000"
                  class="ml-2"
                >
                  +{{ getReview.rewardAmount }}
                  <img class="DCN" src="/img/DCN.png" height="18" alt="">
                </span>
                <span
                  v-else
                  class="earning-color ml-1"
                >
                  +{{ getReview.rewardAmount }}$
                </span>
              </b>
              <b class="teaching-color">+{{ getReview.rewardAmount }}REP</b>
            </div>
          </b-card>
        </section>

        <!-- Feedback Input Area -->
        <section>
          <h5 class="dark-white mb-1">
            <b>
              Give Feedback
            </b>
            <span v-b-modal.modal-feedback-info class="fa fa-info-circle pointer info" />
            <b-modal
              v-if="communityData.feedbackInfo"
              id="modal-feedback-info"
              header-text-variant="light"
              title="Feedback Info"
              size="lg"
              hide-footer
            >
              <article>
                <section>
                  <h3 class="dark-white">
                    <i class="fa fa-thumbs-up green" />
                    <b>Do</b>
                  </h3>
                  <ul>
                    <li v-for="(feedbackDo, key) in communityData.feedbackInfo.do" :key="key">
                      {{ feedbackDo }}
                    </li>
                  </ul>
                </section>
                <section>
                  <h3 class="dark-white">
                    <i class="fa fa-thumbs-down red" />
                    <b>Don't</b>
                  </h3>
                  <ul>
                    <li v-for="(feedbackDont, key) in communityData.feedbackInfo.dont" :key="key">
                      {{ feedbackDont }}
                    </li>
                  </ul>
                </section>
              </article>
            </b-modal>
          </h5>
          <div class="mb-1">
            <i class="muted">
              To learn how to earn more rewards and improve your feedback, click on the info icon.
            </i>
          </div>
          <ValidationObserver ref="form" v-slot="{ invalid, passes }">
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

              <div v-if="communityData.reviewCodeLink" style="width:100%;" class="mb-4">
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
              <b-button
                id="submitButton"
                type="submit"
                :disabled="loading"
                class="btn btn-primary btn-lg"
              >
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
import { firebaseAction } from 'vuexfire'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      reviewerReputation: {},
      review: {
        content: null,
        date: Date.now()
      },
      loading: false,
      submission: null,
      feedback: null,
      evaluation: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/data',
      communityData: 'content/communityData'
    }),
    orderedFeedback () {
      if (this.feedback) {
        const orderedFeedback = this.feedback
        return Object.values(orderedFeedback).reverse().sort(this.compare)
      }
      return []
    }
  },
  created () {
    // this.$store.dispatch('content', { payload: this.$route.params.slug })
    this.getData(this.$route.params).then(() => {
      this.$store.commit('content/setSubmissionDisplayName', this.submission.displayName)
    })
  },
  methods: {
    communityPath (slug) {
      return `/${slug}/submissions`
    },
    onSubmit () {
      this.review.reviewDisplayName = this.user.displayName
      this.review.reviewUserId = this.user.id
      this.review['.key'] = this.$route.params.id
      this.loading = true
      this.$store.dispatch('reviews/createReview', this.review)
        .then(() => {
          this.review.content = null
          this.review.reviewCodeLink = null
          this.$refs.form.reset()
          this.getData(this.$route.params)
          this.loading = false
        })
    },
    getRatingValue (input, input2) {
      let newInput = input.charAt(0).toLowerCase() + input.slice(1) + 'Value'
      return input2[newInput]
    },
    getRatingText (input, input2) {
      let newInput = input.charAt(0).toLowerCase() + input.slice(1) + 'Text'
      return input2[newInput]
    },
    convertDate (date) {
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
    async getReputation (feedback) {
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
    },
    getGithubUrl () {
      let newUrl = null
      const str = this.submission.githubLink
      if (str.includes('https://github.com/')) {
        const urlsplit = str.split('https://github.com/')
        const urlsplit2 = urlsplit[1].split('/')
        newUrl = 'https://' + urlsplit2[0] + '.github.io/' + urlsplit2[1]
      }
      return newUrl
    },
    compare (a, b) {
      if (a.rewardAmount < b.rewardAmount) {
        return 1
      }
      if (a.rewardAmount > b.rewardAmount) {
        return -1
      }
      if (!b.rewardAmount) {
        return -1
      }
      return 0
    },
    getData (params) {
      const submissionPromise = firebase.database().ref(`submissions/${params.slug}/${params.id}`).once('value').then((snapShot) => {
        this.submission = snapShot.val()
      })
      const feedbackPromise = firebase.database().ref(`reviews/${params.id}`).once('value').then((snapShot) => {
        this.feedback = snapShot.val()
      })
      const evaluationPromise = firebase.database().ref(`evaluations/${params.id}`).once('value').then((snapShot) => {
        this.evaluation = snapShot.val()
      })
      return Promise.all([submissionPromise, feedbackPromise, evaluationPromise]).then(() => {
        this.getReputation(this.feedback)
      })
    }
  }

}
</script>

<style scoped>
.DCN{
  vertical-align: -4px;
  margin-left: -2px;
}
.feedback-first {
  color: white;
  text-shadow: 0 0 2px #fff, 0 0 4px #ffffff90, 0 0 20px #ffffff50;
  padding: 0.2em 0.6em 0.2em 1em;
  border-radius: 0.35rem;
  font-weight: bold;
  background-image: linear-gradient(180deg,#505256,#1d2023);
}

.feedback-ranked {
  color: #64696e;
  padding: 0.2em;
  border-radius: 0.35rem;
  padding-left: 0.6em;
  font-weight: bold;
  background-image: linear-gradient(180deg,#505256,#1d2023);
}

.info:hover {
  color: #53d1af;
}

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
