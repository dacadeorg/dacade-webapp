<template>
  <div>
    <div>
      Submission:
      <b-card>
        <b-card-text>
          Submission by {{ submission.displayName }}
        </b-card-text>
        <b-card-text>
          {{ submission.text }}
        </b-card-text>
      </b-card>
    </div>
    Feedback:
    <b-card v-for="getReview in getSubmissionReviews" :key="getReview.key">
      <b-card-text>
        Feedback by {{ getReview.reviewDisplayName }}
      </b-card-text>
      <b-card-text>
        {{ getReview.content }}
        <p v-if="getReview.rewardAmount">
          {{ getReview.rewardAmount }}
        </p>
      </b-card-text>
      <b-form @submit.prevent="submitReviewGrading(getReview)">
        <b-form-group
          id="input-group-1"
          label="Reward Amount"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="review.rewardAmount"
            type="number"
            required
            placeholder="1"
          />
        </b-form-group>
        <b-button type="submit" variant="primary">
          Submit
        </b-button>
      </b-form>
    </b-card>
    <b-form @submit.prevent="submitSubmissionGrading">
      <b-form-group
        id="input-group-1"
        label="Give Feedback Relevanz:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="grading.relevanceText"
          type="text"
          required
          placeholder="Enter Feedback Relevanz"
        />
        <b-form-input
          id="input-1-1"
          v-model="grading.relevanceValue"
          type="number"
          required
          placeholder="1"
        />
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Enter Feedback Originality:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="grading.originalityText"
          type="text"
          required
          placeholder="Enter Feedback Originality"
        />
        <b-form-input
          id="input-2-1"
          v-model="grading.originalityValue"
          type="number"
          required
          placeholder="1"
        />
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="Enter Feedback Quality:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="grading.qualityText"
          type="text"
          required
          placeholder="Enter Feedback Quality"
        />
        <b-form-input
          id="input-3-1"
          v-model="grading.qualityValue"
          type="number"
          required
          placeholder="1"
        />
      </b-form-group>
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
        Submit
      </b-button>
    </b-form>
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
      grading: {
        date: Date.now(),
        gradingUserId: null,
        gradingDisplayName: null,
        submissionId: this.$route.params.id,
        relevanceText: null,
        relevanceValue: 0,
        originalityText: null,
        originalityValue: 0,
        qualityText: null,
        qualityValue: 0
      },
      submissionReward: 0
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      reviews: 'reviews/reviews'
    }),
    getSubmissionReviews() {
      let submissionReviews = []
      for (let index = 0; index < this.reviews.length; index++) {
        if (this.reviews[index].submissionId === this.$route.params.id) {
          submissionReviews.push(this.reviews[index])
        }
      }
      return submissionReviews
    }
  },
  // this may need to be changed to be more dynamic
  async asyncData({ params }) {
    let submission = null
    await firebase.database().ref(`submissions/${params.id}`).once('value').then((snapShot) => {
      submission = snapShot.val()
    })
    let communityDataPreview = null
    await firebase.database().ref(`communityDataPreview`).once('value').then((snapShot) => {
      communityDataPreview = snapShot.val()
    })
    return { submission, communityDataPreview }
  },
  created() {
    this.getReviews()
  },
  methods: {
    ...mapActions({
      getReviews: 'reviews/getReviews'
    }),
    communityPath(slug) {
      return `/${slug}/submissions`
    },
    submitSubmissionGrading() {
      const key = this.$route.params.id
      const submissionUpdate = {
        displayName: this.submission.displayName,
        communityId: this.submission.communityId,
        text: this.submission.text,
        userId: this.submission.userId,
        date: this.submission.date,
        submissionPoints: parseInt(this.grading.relevanceValue, 10) +
          parseInt(this.grading.originalityValue, 10) +
          parseInt(this.grading.qualityValue, 10),
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
      this.grading.gradingUserId = this.user.id
      this.grading.gradingDisplayName = this.user.displayName
      this.$store.dispatch('admin/createGrading', this.grading)
      this.$store.dispatch('admin/updateSubmission', submissionUpdate)
      this.$store.dispatch('admin/updateBalance', balanceUpdate)
      this.$store.dispatch('admin/addLearningPoints', addLearningPoints)
      this.$store.dispatch('admin/addUserNotification', userNotification)
    },
    submitReviewGrading(review) {
      const reviewUpdate = {
        content: review.content,
        submissionId: review.submissionId,
        reviewDisplayName: review.reviewDisplayName,
        reviewUserId: review.reviewUserId,
        date: review.date,
        rewardAmount: parseInt(this.review.rewardAmount, 10)
      }
      if (review.reviewCodeLink) {
        reviewUpdate.reviewCodeLink = review.reviewCodeLink
      }
      reviewUpdate['.key'] = review['.key']
      const reputationUpdate = {
        userId: review.reviewUserId,
        rewardAmount: parseInt(this.review.rewardAmount, 10),
        communityId: this.submission.communityId
      }
      const balanceUpdate = {
        userId: reviewUpdate.reviewUserId,
        rewardAmount: reviewUpdate.rewardAmount,
        rewardToken: this.communityDataPreview[this.submission.communityId].rewardToken
      }
      const userNotification = {
        date: Date.now(),
        link: `/${this.submission.communityId}/submission/${review.submissionId}`,
        message: `Good job, ${reviewUpdate.reviewDisplayName}. You received: ${balanceUpdate.rewardAmount}$ in 
          ${balanceUpdate.rewardToken} and ${balanceUpdate.rewardAmount} Reputation, 
          for your Feedback: "${this.contentPreview(review.content)}.."`,
        notificationRead: false,
        userId: review.reviewUserId
      }
      this.$store.dispatch('admin/updateReview', reviewUpdate)
      this.$store.dispatch('admin/updateBalance', balanceUpdate)
      this.$store.dispatch('admin/updateReputation', reputationUpdate)
      this.$store.dispatch('admin/addUserNotification', userNotification)
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
