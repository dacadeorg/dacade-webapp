<template>
  <div class="row marketing">
    <div class="col-lg-8">
      <div class="site-wraper">
        <!-- Submission Card -->
        <b-card
          class="bg-dark mb-4 small-shadow-no-hover"
        >
          <span class="float-right muted-dark">
            {{ convertDate(submission.date) }}
          </span>
          <b-card-text>
            <span class="learning-color">
              <b>
                Submission
              </b>
            </span>
            <span class="muted-dark">
              by
            </span>
            <span class="h-dark">
              {{ submission.displayName }}
            </span>
          </b-card-text>
          <b-card-text>
            {{ submission.text }}
          </b-card-text>
          <div
            v-if="submission.githubLink"
            class="github-link"
          >
            <a class="btn btn-dark" target="blank" :href="submission.githubLink">GitHub Code</a>
            <i>Click to see the code on GitHub</i>

            <div
              v-if="communityData.githubUrl"
              class="github-url"
            >
              <a class="btn btn-dark" target="blank" :href="getGithubUrl">Website</a>
              <i>Click to see the Website</i>
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
        <section v-if="getEvaluationsDb">
          <b-card
            class="bg-dark mb-4 small-shadow-no-hover"
          >
            <span class="float-right muted-dark">
              {{ convertDate(getEvaluationsDb.date) }}
            </span>
            <b-card-text>
              <span class="earning-color">
                <b>
                  Evaluation
                </b>
              </span>
              <span class="muted-dark">
                by
              </span>
              <span class="h-dark">
                {{ getEvaluationsDb.evaluationDisplayName }}
              </span>
            </b-card-text>
            <b-card-text>
              <div v-for="evaluation in communityData.challengeRatingCriteriaPoints" :key="evaluation.key" class="mb-2">
                <span class="h-dark">
                  {{ evaluation.name }}
                </span>
                <b class="learning-color">
                  +{{ getRatingCriteria(evaluation.name,getEvaluationsDb) }}<span class="learning-color-muted">/{{ evaluation.points }} LP</span>
                </b>
                <div v-html="getRatingText(evaluation.name,getEvaluationsDb)" />
              </div>
              <div v-if="submission.submissionReward > 1">
                <span class="h-dark">
                  Reward
                </span>
                <span class="earning-color">
                  <b>
                    +{{ submission.submissionReward }}$
                  </b>
                </span>
                <div>Congratulations you gained at least {{ communityData.challengeThreshold }}% of the available learning points.</div>
              </div>
            </b-card-text>
          </b-card>
        </section>

        <!-- Feedback Cards -->
        <section v-if="getSubmissionReviews">
          <b-card
            v-for="getReview in getSubmissionReviews"
            :key="getReview.key"
            class="bg-dark small-shadow-no-hover mb-4"
          >
            <span class="float-right muted-dark">
              {{ convertDate(getReview.date) }}
            </span>
            <b-card-text>
              <span class="teaching-color">
                <b>
                  Feedback
                </b>
              </span>
              <span class="muted-dark">
                by
              </span>
              <span class="h-dark">
                {{ getReview.reviewDisplayName }}
                (<span class="teaching-color">{{ reviewerReputation[getReview.reviewUserId] }} REP</span>):
              </span>
            </b-card-text>
            <b-card-text>
              {{ getReview.content }}
            </b-card-text>
            <div
              v-if="getReview.reviewCodeLink"
              class="github-link"
            >
              <a class="btn btn-dark" target="blank" :href="getReview.reviewCodeLink">Code Review</a>
              <i>Click to see GitHub Pull Request</i>
            </div>
            <div v-if="getReview.rewardAmount" class="mt-3">
              <b class="earning-color mr-1">+{{ getReview.rewardAmount }}$</b>
              <b class="teaching-color">+{{ getReview.rewardAmount }}TP</b>
            </div>
          </b-card>
        </section>

        <!-- Feedback Input Area -->
        <section>
          <h5 class="h-dark mb-2">
            Give Feedback
          </h5>
          <ValidationObserver v-slot="{ invalid, passes }">
            <b-form @submit.prevent="passes(onSubmit)">
              <b-form-group
                id="input-group-1"
                class="mb-4"
              >
                <ValidationProvider
                    name="feedback"
                    rules="required|min:20"
                    v-slot="{ errors }"
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
                <h5 class="h-dark mb-2">
                  GitHub Pull Request
                </h5>
                <ValidationProvider
                  name="review code link"
                  rules="min:7"
                  v-slot="{ errors }"
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
              <b-button type="submit" variant="primary" class="mt-4">
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
import { mapGetters, mapActions } from 'vuex'
import apiJobMixin from '@/mixins/apiJobMixin'

export default {
  mixins: [apiJobMixin],
  data() {
    return {
      reviewerReputation: {},
      review: {
        content: null,
        submissionId: this.$route.params.id,
        date: Date.now()
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      reviews: 'reviews/reviews',
      evaluations: 'submissions/evaluations',
      communityData: 'content/communityData'
    }),
    getSubmissionReviews() {
      let submissionReviews = []
      for (let index = 0; index < this.reviews.length; index++) {
        if (this.reviews[index].submissionId === this.$route.params.id) {
          submissionReviews.push(this.reviews[index])
          this.getReputation(this.reviews[index].reviewUserId)
        }
      }
      return submissionReviews
    },
    getEvaluationsDb() {
      let evaluationsNew = null
      for (let index = 0; index < this.evaluations.length; index++) {
        if (this.evaluations[index].submissionId === this.$route.params.id) {
          evaluationsNew = this.evaluations[index]
        }
      }
      return evaluationsNew
    },
    getGithubUrl() {
      const str = this.submission.githubLink
      const urlsplit = str.split('https://github.com/')
      const urlsplit2 = urlsplit[1].split('/')
      const newUrl = 'https://' + urlsplit2[0] + '.github.io/' + urlsplit2[1]
      return newUrl
    }
  },
  asyncData({ params }) {
    return firebase.database().ref(`submissions/${params.id}`).once('value').then((snapShot) => {
      const submission = snapShot.val()
      return { submission }
    })
  },
  mounted(params) {
    if ((!this.communityData || Object.keys(this.communityData).length === 0)) {
      this.$store.dispatch('content', { payload: params.slug })
    }
    if ((!this.evaluations || Object.keys(this.evaluations).length === 0)) {
      this.getEvaluations()
    }
    if ((!this.reviews || Object.keys(this.reviews).length === 0)) {
      this.getReviews()
    }
  },
  methods: {
    ...mapActions({
      getReviews: 'reviews/getReviews',
      getEvaluations: 'submissions/getEvaluations'
    }),
    communityPath(slug) {
      return `/${slug}/submissions`
    },
    onSubmit() {
      this.review.reviewDisplayName = this.user.displayName
      this.review.reviewUserId = this.user.id
      this.$store.dispatch('reviews/createReview', this.review)
      this.review.content = null
      this.review.reviewCodeLink = null
    },
    jobsDone() {
      this.removeErrors()
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
    async getReputation(userId) {
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
