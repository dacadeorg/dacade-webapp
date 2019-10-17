<template>
  <div class="row">
    <div class="offset-md-3 col-lg-6">
      <div class="mb-4">
        <h1>
          <b>
            SUBMISSIONS > SUBMISSION
          </b>
        </h1>
      </div>
      <div class="mb-4">
        <b-button @click="back()">
          BACK
        </b-button>
      </div>
    </div>
    <div class="offset-md-3 col-lg-6">
      <h2>
        Submission
      </h2>
      <div>
        <b-card
          class="mb-4"
          bg-variant="dark"
          text-variant="white"
          :title="submission.displayName"
        >
          <b-card-text>
            <b class="muted-dark">
              {{ convertDate(submission.date) }}
            </b>
          </b-card-text>
          <b-card-text>
            {{ submission.text }}
            <div v-if="submission.reviewCodeLink">
              <a
                class="btn btn-dark mt-4"
                target="blank"
                :href="submission.githubLink"
              >
                GitHub Code
              </a>
            </div>
          </b-card-text>
        </b-card>
      </div>
      <h2 class="mt-4">
        Evaluation
      </h2>
      <span class="muted">
        Max Submission Points: {{ communityDataPreview[$route.params.slug].submissionPoints }}
      </span>
      <b-form @submit.prevent="submitSubmissionEvaluation">
        <b-form-group
          id="input-group-1"
          label="Give Feedback Relevanz:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1-1"
            v-model="evaluation.relevanceValue"
            type="number"
            placeholder="1"
          />
          <b-form-textarea
            id="input-1"
            v-model="evaluation.relevanceText"
            type="text"
            placeholder="Enter Feedback Relevanz"
            rows="6"
          />
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Enter Feedback Originality:"
          label-for="input-2"
        >
          <b-form-input
            id="input-2-1"
            v-model="evaluation.originalityValue"
            type="number"
            required
            placeholder="1"
          />
          <b-form-textarea
            id="input-2"
            v-model="evaluation.originalityText"
            type="text"
            required
            rows="6"
            placeholder="Enter Feedback Originality"
          />
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Enter Feedback Quality:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3-1"
            v-model="evaluation.qualityValue"
            type="number"
            required
            placeholder="1"
          />
          <b-form-textarea
            id="input-3"
            v-model="evaluation.qualityText"
            type="text"
            required
            placeholder="Enter Feedback Quality"
          />
        </b-form-group>
        <span class="muted">
          Max Reward: {{ communityDataPreview[$route.params.slug].submissionReward }}
        </span>
        <b-form-group
          id="input-group-4"
          label="Reward:"
          label-for="input-4"
        >
          <b-form-input
            id="input-4-1"
            v-model="submissionReward"
            type="number"
            required
            placeholder="1"
          />
        </b-form-group>
        <b-button type="submit" variant="primary">
          Submit Evaluation
        </b-button>
      </b-form>
      <h2 class="mt-4">
        Feedback
      </h2>
      <b-card
        v-for="( getReview, key ) in feedback"
        :key="key"
        class="mb-4"
        bg-variant="dark"
        text-variant="white"
        :title="getReview.reviewDisplayName"
      >
        <b-card-text>
          <b class="muted-dark">
            {{ convertDate(getReview.date) }}
          </b>
        </b-card-text>
        <b-card-text>
          {{ getReview.content }}
          <div v-if="getReview.reviewCodeLink">
            <a
              class="btn btn-dark mt-3 mb-2"
              target="blank"
              :href="getReview.reviewCodeLink"
            >
              GitHub Code
            </a>
          </div>
          <div v-if="getReview.rewardAmount" class="mt-2">
            <b class="teaching-color">
              + {{ getReview.rewardAmount }} REP
            </b>
            <b class="earning-color">
              + {{ getReview.rewardAmount }} $
            </b>
          </div>
        </b-card-text>
        <b-form @submit.prevent="submitReviewEvaluation(getReview, key)">
          <b-form-group
            id="input-group-1"
            label="Reward Amount"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="review.rewardAmount"
              type="number"
              step="0.01"
              required
              placeholder="1"
            />
          </b-form-group>
          <b-button type="submit" variant="primary">
            Submit
          </b-button>
        </b-form>
      </b-card>
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

export default {
  data() {
    return {
      review: {
        rewardAmount: 0,
        submissionId: this.$route.params.id
      },
      evaluation: {
        date: Date.now(),
        evaluationUserId: null,
        evaluationDisplayName: null,
        relevanceText: null,
        relevanceValue: 0,
        originalityText: null,
        originalityValue: 0,
        qualityText: 'You completed the requested assignment, wrote in coherent sentences and followed the word limit.',
        qualityValue: 1
      },
      submissionReward: 0
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  // this may need to be changed to be more dynamic
  async asyncData({ params }) {
    let submission, communityDataPreview, feedback
    await firebase.database().ref(`submissions/${params.slug}/${params.id}`).once('value').then((snapShot) => {
      submission = snapShot.val()
    })
    await firebase.database().ref(`communityDataPreview`).once('value').then((snapShot) => {
      communityDataPreview = snapShot.val()
    })
    await firebase.database().ref(`reviews/${params.id}`).once('value').then((snapShot) => {
      feedback = snapShot.val()
    })
    return { submission, communityDataPreview, feedback }
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/submissions`
    },
    submitSubmissionEvaluation() {
      const key = this.$route.params.id
      const submissionUpdate = {
        displayName: this.submission.displayName,
        communityId: this.submission.communityId,
        text: this.submission.text,
        userId: this.submission.userId,
        date: this.submission.date,
        submissionPoints: parseInt(this.evaluation.relevanceValue, 10) +
          parseInt(this.evaluation.originalityValue, 10) +
          parseInt(this.evaluation.qualityValue, 10),
        submissionReward: parseInt(this.submissionReward, 10)
      }
      if (this.submission.githubLink) {
        submissionUpdate.githubLink = this.submission.githubLink
      }
      submissionUpdate['.key'] = key
      const addLearningPoints = {
        userId: submissionUpdate.userId,
        learningPoints: submissionUpdate.submissionPoints,
        communityId: submissionUpdate.communityId
      }
      const balanceUpdate = {
        userId: submissionUpdate.userId,
        rewardAmount: submissionUpdate.submissionReward,
        rewardToken: this.communityDataPreview[this.submission.communityId].rewardToken
      }
      const userNotification = {
        date: Date.now(),
        link: `/${this.submission.communityId}/submission/${key}`,
        message: `Good job, ${submissionUpdate.displayName}! You received: ${addLearningPoints.learningPoints} 
        of ${this.communityDataPreview[this.submission.communityId].submissionPoints} Learning Points for your submission in the
        Learning Community '${this.communityDataPreview[this.submission.communityId].name}'. 
        This means you earned a reward of ${balanceUpdate.rewardAmount}$ in ${balanceUpdate.rewardToken} token.`,
        notificationRead: false,
        userId: submissionUpdate.userId
      }
      this.evaluation.evaluationUserId = this.user.id
      this.evaluation.evaluationDisplayName = this.user.displayName
      this.evaluation['.key'] = key
      console.log(this.evaluation['.key'])
      this.$store.dispatch('admin/createEvaluation', this.evaluation)
      this.$store.dispatch('admin/updateSubmission', submissionUpdate)
      this.$store.dispatch('admin/updateBalance', balanceUpdate)
      this.$store.dispatch('admin/addLearningPoints', addLearningPoints)
      this.$store.dispatch('addUserNotification', userNotification)
    },
    submitReviewEvaluation(review, key) {
      const reviewUpdate = {
        content: review.content,
        submissionId: this.$route.params.id,
        reviewDisplayName: review.reviewDisplayName,
        reviewUserId: review.reviewUserId,
        date: review.date,
        rewardAmount: parseFloat(this.review.rewardAmount)
      }
      if (review.reviewCodeLink) {
        reviewUpdate.reviewCodeLink = review.reviewCodeLink
      }
      reviewUpdate['.key'] = key
      const reputationUpdate = {
        userId: review.reviewUserId,
        rewardAmount: parseFloat(this.review.rewardAmount),
        communityId: this.submission.communityId
      }
      const balanceUpdate = {
        userId: reviewUpdate.reviewUserId,
        rewardAmount: reviewUpdate.rewardAmount,
        rewardToken: this.communityDataPreview[this.submission.communityId].rewardToken
      }
      const userNotification = {
        date: Date.now(),
        link: `/${this.submission.communityId}/submission/${reviewUpdate.submissionId}`,
        message: `Good job, ${reviewUpdate.reviewDisplayName}. You received: ${balanceUpdate.rewardAmount}$ in 
          ${balanceUpdate.rewardToken} and ${balanceUpdate.rewardAmount} Reputation, 
          for your Feedback: "${this.contentPreview(review.content)}.."`,
        notificationRead: false,
        userId: review.reviewUserId
      }
      this.$store.dispatch('admin/updateReview', reviewUpdate)
      this.$store.dispatch('admin/updateBalance', balanceUpdate)
      this.$store.dispatch('admin/updateReputation', reputationUpdate)
      this.$store.dispatch('addUserNotification', userNotification)
    },
    back() {
      this.$router.back()
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
    contentPreview(content) {
      const maxLength = 160
      let trimmedString = content.substr(0, maxLength)
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))
      return trimmedString
    }
  }
}
</script>
<style scoped>
.row {
  margin: 3em;
}
</style>
