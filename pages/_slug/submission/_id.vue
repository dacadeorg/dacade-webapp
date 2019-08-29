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
          <div v-if="submission.submissionPoints" class="evaluation-points">
            <b class="learning-color"> +{{ submission.submissionPoints }}<span class="learning-color-muted">/{{ lcData.assignmentPoints }} LP</span>
            </b>
            <b v-if="submission.submissionReward > 1" class="earning-color ml-1">
              +{{ submission.submissionReward }}$
            </b>
          </div>
        </b-card>

        <!-- Evaluation Card -->
        <b-card
          v-if="getGradingsDb"
          class="bg-dark mb-4 small-shadow-no-hover"
        >
          <span class="float-right muted-dark">
            {{ convertDate(getGradingsDb.date) }}
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
              {{ getGradingsDb.gradingDisplayName }}
            </span>
          </b-card-text>
          <b-card-text>
            <div v-for="evaluation in lcData.challengeRatingCriteriaPoints" :key="evaluation.key" class="mb-2">
              <span class="h-dark">
                {{ evaluation.name }}
              </span>
              <b class="learning-color">
                +{{ getRatingCriteria(evaluation.name,getGradingsDb) }}<span class="learning-color-muted">/{{ evaluation.points }} LP</span>
              </b>
              <div v-html="getRatingText(evaluation.name,getGradingsDb)" />
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
              <div>Congratulations you gained at least {{ lcData.challengeThreshold }}% of the available learning points.</div>
            </div>
          </b-card-text>
        </b-card>

        <!-- Feedback Cards -->
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
              {{ getReview.displayName }}
            </span>
          </b-card-text>
          <b-card-text>
            {{ getReview.text }}
            <div v-if="getReview.rewardAmount" class="mt-3">
              <b class="earning-color mr-1">+{{ getReview.rewardAmount }}$</b>
              <b class="teaching-color">+{{ getReview.rewardAmount }}TP</b>
            </div>
          </b-card-text>
        </b-card>

        <!-- Feedback Input Area -->
        <h5 class="h-dark mb-2">
          Give Feedback
        </h5>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            id="input-group-1"
            class="mb-4"
          >
            <b-form-textarea
              id="input-1"
              v-model="review.text"
              type="text"
              required
              placeholder="Enter Feedback"
              rows="4"
            />
          </b-form-group>
          <b-button type="submit" variant="primary">
            Submit
          </b-button>
        </b-form>
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
      review: {
        text: null,
        submissionId: this.$route.params.id,
        date: Date.now()
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      reviews: 'reviews/reviews',
      gradings: 'submissions/gradings',
      lcData: 'content/lcData'
    }),
    getSubmissionReviews() {
      let submissionReviews = []
      for (let index = 0; index < this.reviews.length; index++) {
        if (this.reviews[index].submissionId === this.$route.params.id) {
          submissionReviews.push(this.reviews[index])
        }
      }
      return submissionReviews
    },
    getGradingsDb() {
      let gradingsNew = null
      for (let index = 0; index < this.gradings.length; index++) {
        if (this.gradings[index].submissionId === this.$route.params.id) {
          gradingsNew = this.gradings[index]
        }
      }
      return gradingsNew
    }
  },
  asyncData({ params }) {
    return firebase.database().ref(`submissions/${params.id}`).once('value').then((snapShot) => {
      const submission = snapShot.val()
      return { submission }
    })
  },
  created() {
    this.getReviews()
    this.getGradings()
  },
  methods: {
    ...mapActions({
      getReviews: 'reviews/getReviews',
      getGradings: 'submissions/getGradings'
    }),
    communityPath(slug) {
      return `/${slug}/submissions`
    },
    onSubmit() {
      this.review.displayName = this.user.displayName
      this.review.reviewUserId = this.user.id
      this.$store.dispatch('reviews/createReview', this.review)
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
    }
  }
}
</script>
