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
        Feedback by {{ getReview.displayName }}
      </b-card-text>
      <b-card-text>
        {{ getReview.text }}
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
          v-model="grading.relevanzText"
          type="text"
          required
          placeholder="Enter Feedback Relevanz"
        />
        <b-form-input
          id="input-1-1"
          v-model="grading.relevanzAmount"
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
          v-model="grading.originalityAmount"
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
          v-model="grading.qualityAmount"
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
        submissionId: this.$route.params.id,
        relevanzText: null,
        relevanzAmount: 0,
        originalityText: null,
        originalityAmount: 0,
        qualityText: null,
        qualityAmount: 0
      },
      submissionReward: 0
    }
  },
  computed: {
    ...mapGetters({
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
  asyncData({ params }) {
    return firebase.database().ref(`submissions/${params.id}`).once('value').then((snapShot) => {
      const submission = snapShot.val()
      //communityData.key = params.slug // snapShot.key
      return { submission }
    })
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
        lCId: this.submission.lCId,
        text: this.submission.text,
        userId: this.submission.userId,
        submissionPoints: parseInt(this.grading.relevanzAmount, 10) + parseInt(this.grading.originalityAmount, 10) + parseInt(this.grading.qualityAmount, 10),
        submissionReward: parseInt(this.submissionReward, 10)
      }
      submissionUpdate['.key'] = key
      this.$store.dispatch('admin/createGrading', this.grading)
      this.$store.dispatch('admin/updateSubmission', submissionUpdate)
    },
    submitReviewGrading(review) {
      const reviewUpdate = {
        text: review.text,
        submissionId: review.submissionId,
        displayName: review.displayName,
        rewardAmount: parseInt(this.review.rewardAmount, 10)
      }
      reviewUpdate['.key'] = review['.key']
      this.$store.dispatch('admin/updateReview', reviewUpdate)
    }
  }
}
</script>
