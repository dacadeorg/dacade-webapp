<template>
  <div>
    Submission by {{ submission.name }}
    <p>
      {{ submission.text }}
    </p>
    <br>
    {{ getSubmissionReviews }}
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Feedback:"
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
  data() {
    return {
      review: {
        name: 'misterx',
        text: 'text',
        submissionId: this.$route.params.id
      }
    }
  },
  asyncData({ params }) {
    return firebase.database().ref(`submissions/${params.id}`).once('value').then((snapShot) => {
      const submission = snapShot.val()
      //communityData.key = params.slug // snapShot.key
      return { submission }
    })
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
    onSubmit() {
      this.$store.dispatch('reviews/createReview', this.review)
    }
  }
}
</script>
