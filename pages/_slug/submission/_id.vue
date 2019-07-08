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
    <div>
      gradings:
      {{ getGradingsDb }}
    </div>
    Feedback:
    <b-card v-for="getReview in getSubmissionReviews" :key="getReview.key">
      <b-card-text>
        Feedback by {{ getReview.displayName }}
      </b-card-text>
      <b-card-text>
        {{ getReview.text }}
      </b-card-text>
    </b-card>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Give Feedback:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="review.text"
          type="text"
          required
          placeholder="Enter Review"
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
  props: {
    communityData: {
      type: Object,
      required: true
    },
    userData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      review: {
        displayName: this.userData.displayName,
        text: 'text',
        submissionId: this.$route.params.id
      }
    }
  },
  computed: {
    ...mapGetters({
      reviews: 'reviews/reviews',
      gradings: 'submissions/gradings'
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
      //communityData.key = params.slug // snapShot.key
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
      this.$store.dispatch('reviews/createReview', this.review)
    }
  }
}
</script>
