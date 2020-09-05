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
        <nuxt-link to="/admin/evaluations" class="btn btn-secondary">
          BACK
        </nuxt-link>
      </div>
    </div>
    <div class="offset-md-3 col-lg-6">
      <!-- Submission -->
      <section>
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
              <div v-if="submission.githubLink">
                <a
                  class="btn btn-dark mt-4"
                  target="blank"
                  :href="submission.githubLink"
                >
                  GitHub Code
                </a>

                <a
                  class="btn btn-dark mt-4"
                  target="blank"
                  :href="getGithubUrl(submission.githubLink)"
                >
                  GitHub Url
                </a>
              </div>
            </b-card-text>
          </b-card>
        </div>
      </section>
      <!-- Evaluation -->
      <section>
        <h2 class="mt-4">
          Evaluation
        </h2>
        <span class="muted">
          Total LearningPoints: {{ communityDataPreview[$route.params.slug].submissionPoints }}
        </span>
        <b-form @submit.prevent="submitSubmissionEvaluation">
          <b-form-group
            v-for="(rubricItem, index) in communityData.challengeRubric"
            :id="'input-group' + index"
            :key="index"
            label-for="input-1"
          >
            <h5 class="dark-white font-bold">
              {{ rubricItem.text }}
            </h5>
            <div class="row">
              <b-form-radio
                v-for="(rubricRating, indexR) in rubricItem.rubric"
                :key="indexR"
                v-model="evaluation.evaluationPoints[rubricItem.name]"
                :name="rubricRating.name"
                :value="rubricRating.points"
                class="col-md-3 col-6 mb-2"
              >
                <h6 class="learning-color font-bold">
                  {{ rubricRating.points }}LP
                </h6>
                <span class="fs-08">
                  {{ rubricRating.text }}
                </span>
              </b-form-radio>
            </div>
          </b-form-group>
          <div class="mb-4">
            <h5 class="font-bold dark-white">
              Total
            </h5>
            <b class="learning-color">
              {{ sumLearningPoints }}LP
            </b>
          </div>
          <div
            v-if="((communityData.challengeThreshold * 0.01) * communityData.challengePoints).toFixed(0) <= sumLearningPoints"
            class="muted"
          >
            User gets reward of {{ communityDataPreview[$route.params.slug].submissionReward }}
          </div>
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
          <b-form-group
            id="input-group-comment"
            label="Comment:"
            label-for="input-comment"
          >
            <b-form-textarea
              id="input-comment"
              v-model="evaluationComment"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            />
          </b-form-group>
          <b-button type="submit" variant="primary">
            Submit Evaluation
          </b-button>
        </b-form>
      </section>

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
            <b-form-radio-group
              key="option1"
              v-model="review.rewardAmount"
              name="option1"
              :value="communityData.feedbackPrice"
              :options="getFeedbackPrices"
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
/* eslint-disable spaced-comment */
import firebase from '@/plugins/firebase'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      review: {
        rewardAmount: 0,
        submissionId: this.$route.params.id
      },
      evaluation: {
        evaluationPoints: [],
        evaluationComment: null
      },
      submissionReward: 0
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    }),
    sumLearningPoints () {
      let submissionPoints = 0
      for (const key in this.evaluation.evaluationPoints) {
        submissionPoints = submissionPoints + parseInt(this.evaluation.evaluationPoints[key])
      }
      return submissionPoints
    },
    getFeedbackPrices () {
      const feedbackPrices = [
        { text: `1st ${0.60 * this.communityData.feedbackPrice}`, value: 0.60 * this.communityData.feedbackPrice },
        { text: `2nd ${0.30 * this.communityData.feedbackPrice}`, value: 0.30 * this.communityData.feedbackPrice },
        { text: `3rd ${0.10 * this.communityData.feedbackPrice}`, value: 0.10 * this.communityData.feedbackPrice }
      ]
      return feedbackPrices
    }
  },
  // This may need to be changed to be more dynamic
  async asyncData ({ params }) {
    let submission, communityDataPreview, communityData, feedback
    await firebase.database().ref(`submissions/${params.slug}/${params.id}`).once('value').then((snapShot) => {
      submission = snapShot.val()
    })
    await firebase.database().ref('communityDataPreview').once('value').then((snapShot) => {
      communityDataPreview = snapShot.val()
    })
    await firebase.database().ref(`communityData/${params.slug}`).once('value').then((snapShot) => {
      communityData = snapShot.val()
    })
    await firebase.database().ref(`reviews/${params.id}`).once('value').then((snapShot) => {
      feedback = snapShot.val()
    })
    return { submission, communityDataPreview, communityData, feedback }
  },
  methods: {
    communityPath (slug) {
      return `/${slug}/submissions`
    },
    submitSubmissionEvaluation () {
      const key = this.$route.params.id
      let submissionPoints = 0
      const evaluation = {
        date: Date.now(),
        evaluationUserId: this.user.id,
        evaluationDisplayName: this.user.displayName
      }
      if (this.evaluationComment) {
        evaluation.comment = this.evaluationComment
      }
      evaluation['.key'] = key
      for (const key in this.evaluation.evaluationPoints) {
        submissionPoints = submissionPoints + parseInt(this.evaluation.evaluationPoints[key])
        evaluation[key] = parseInt(this.evaluation.evaluationPoints[key])
      }
      const submissionUpdate = {
        displayName: this.submission.displayName,
        communityId: this.submission.communityId,
        text: this.submission.text,
        userId: this.submission.userId,
        date: this.submission.date,
        submissionPoints,
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
      if (this.submissionReward > 0) {
        const transaction = {
          communityId: this.submission.communityId,
          receiverId: this.submission.userId,
          amount: parseInt(this.submissionReward, 10),
          paid: false,
          type: 'submission',
          contentId: this.$route.params.id,
          date: Date.now()
        }
        const balanceUpdate = {
          userId: submissionUpdate.userId,
          rewardAmount: submissionUpdate.submissionReward,
          rewardToken: this.communityDataPreview[this.submission.communityId].rewardToken
        }
        const userNotification = {
          date: Date.now(),
          link: `/${this.submission.communityId}/submission/${key}`,
          message: `Hello, ${submissionUpdate.displayName}! You received: ${addLearningPoints.learningPoints} 
          of ${this.communityDataPreview[this.submission.communityId].submissionPoints} Learning Points for your submission in the
          Learning Community '${this.communityDataPreview[this.submission.communityId].name}'. 
          This means you earned a reward of ${balanceUpdate.rewardAmount} dacade coins.`,
          notificationRead: false,
          userId: submissionUpdate.userId
        }
        this.$store.dispatch('admin/createTransaction', transaction)
        this.$store.dispatch('admin/updateBalance', balanceUpdate)
        this.$store.dispatch('addUserNotification', userNotification)
      } else {
        const userNotification = {
          date: Date.now(),
          link: `/${this.submission.communityId}/submission/${key}`,
          message: `Hello, ${submissionUpdate.displayName}! You received: ${addLearningPoints.learningPoints} 
          of ${this.communityDataPreview[this.submission.communityId].submissionPoints} Learning Points for your submission in the
          Learning Community '${this.communityDataPreview[this.submission.communityId].name}'.`,
          notificationRead: false,
          userId: submissionUpdate.userId
        }
        this.$store.dispatch('addUserNotification', userNotification)
      }
      this.$store.dispatch('admin/createEvaluation', evaluation)
      this.$store.dispatch('admin/updateSubmission', submissionUpdate)
      this.$store.dispatch('admin/addLearningPoints', addLearningPoints)
    },
    submitReviewEvaluation (review, key) {
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
        message: `Good job, ${reviewUpdate.reviewDisplayName}. You received: ${balanceUpdate.rewardAmount} 
        dacade coins and ${balanceUpdate.rewardAmount} Reputation, 
          for your Feedback: "${this.contentPreview(review.content)}.."`,
        notificationRead: false,
        userId: review.reviewUserId
      }
      const transaction = {
        communityId: this.submission.communityId,
        receiverId: review.reviewUserId,
        amount: parseFloat(this.review.rewardAmount),
        paid: false,
        type: 'review',
        contentId: this.$route.params.id,
        date: Date.now()
      }
      this.$store.dispatch('admin/updateReview', reviewUpdate)
      this.$store.dispatch('admin/updateBalance', balanceUpdate)
      this.$store.dispatch('admin/createTransaction', transaction)
      this.$store.dispatch('admin/updateReputation', reputationUpdate)
      this.$store.dispatch('addUserNotification', userNotification)
    },
    back () {
      this.$router.back()
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
    contentPreview (content) {
      const maxLength = 160
      let trimmedString = content.substr(0, maxLength)
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))
      return trimmedString
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
    }
  }
}
</script>
