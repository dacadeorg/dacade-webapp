<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="mb-4">
          <h1>
            <b>
              FUNCTIONS
            </b>
          </h1>
        </div>
        <div class="mb-4">
          <b-button @click="back()">
            BACK
          </b-button>
        </div>
        <div>
          <b-nav vertical class="w-25">
            <b-nav-item>
              <h2>
                <i @click="getSubmissions">
                  Total Submissions
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i @click="getReviews(getPreviousMonday)">
                  Total reviews
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i @click="getSubmissionsSinceDate(1511680461000)">
                  Feedback in Communities
                </i>
              </h2>
            </b-nav-item>
            <!-- <b-nav-item>
              <h2>
                <i @click="getSubmissionsSinceDate(getPreviousMonday)">
                  get submission since last monday
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i @click="getReviewsForSubmission('-LI5aDw8QEVwp9spSTvO')">
                  getReviewsForSubmission
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i @click="earnedInCommunity">
                  earnedInCommunity
                </i>
              </h2>
            </b-nav-item> -->
          </b-nav>
          <div>
            <div v-if="totalSubmissions">
              Total Submissions: {{ totalSubmissions }}
            </div>
            <div v-if="totalReviews">
              Total Feedback: {{ totalReviews }}
            </div>
            <div>
              <div>
                <input v-model="weekStartDate" type="date" placeholder="2019-11-04">
                <div class="mt-2">
                  Value: {{ weekStartDate }}
                </div>
              </div>
            </div>
          </div>
          <div>
            {{ getPreviousMonday }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars, prefer-const */
import firebase from '@/plugins/firebase'

export default {
  data () {
    return {
      weekStartDate: this.getPreviousMonday,
      totalSubmissions: null,
      totalReviews: null,
      reviewRewards: null
    }
  },
  computed: {
    getPreviousMonday () {
      let prevMonday = new Date()
      prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 14)
      return prevMonday
      // return new Date(prevMonday).toISOString().split('T')[0]
    }
  },
  created () {
    // this.getSubmissions()
    // this.getReviews()
  },
  methods: {
    back () {
      this.$router.back()
    },
    async getSubmissions () {
      const communities = ['intro-to-blockchain', 'ae-dev-101', 'web-dev-101', 'eth-dev-101']
      let submissionsLength = []
      const communitySubmissions = []
      for (let index = 0; index < communities.length; index++) {
        let communitySubmissionLength = 0
        let submissionRewards = 0
        await firebase.database().ref(`submissions/${communities[index]}`).once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            const element = {}
            element.key = childSnapshot.key
            element.data = childSnapshot.val()
            if (element.data.submissionReward) {
              submissionRewards = submissionRewards + parseFloat(element.data.submissionReward)
            }
            submissionsLength++
            communitySubmissionLength++
            communitySubmissions[communities[index]] = communitySubmissionLength
            // communitySubmissions[communities[index]] = submissionRewards
          })
        })
      }
      this.totalSubmissions = submissionsLength
      console.log(communitySubmissions)
      // this.communitySubmissions[communities[index]] = communitySubmissionLength)
    },
    async getReviews (dateRange) {
      let reviews = 0
      let rewards = 0
      let rewardCount = 0
      const reviewDate = Date.parse(dateRange)
      await firebase.database().ref('reviews').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const element = {}
          element.key = childSnapshot.key
          element.data = childSnapshot.val()
          // console.log(element.data)
          for (let index = 0; index < Object.values(element.data).length; index++) {
            const element2 = Object.values(element.data)[index]
            // console.log(Object.values(element.data)[index])
            if (Object.values(element.data)[index].date > 1510413525000) {
              if (Object.values(element.data)[index].rewardAmount) {
                // console.log(rewards)
                rewards = rewards + parseFloat(Object.values(element.data)[index].rewardAmount)
              }
              rewardCount++
              reviews = reviews + Object.values(element.data).length
            }
          }
        })
      })
      console.log('Rewards issued in $:' + rewards)
      console.log('Feedbacks ' + rewardCount)
      this.totalReviews = reviews
    },
    async getReviewsForSubmission (elementF) {
      // let submissionId = '-LI5aDw8QEVwp9spSTvO'
      let reviewsCount = 0
      let reviewsReward = []
      // console.log('getReviewsForSubmission')
      await firebase.database().ref(`reviews/${elementF.submissionId}`).once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const element = {}
          element.key = childSnapshot.key
          element.data = childSnapshot.val()
          // console.log('element')
          // console.log(element)
          reviewsCount++
          // if (Object.values(element.data)[4]) {
          //   // console.log(reviewsReward[elementF.community])
          //   if (!reviewsReward[elementF.community]) {
          //     reviewsReward[elementF.community] = 0
          //     // console.log('test')
          //   }
          //   reviewsReward[elementF.community] = parseFloat(reviewsReward[elementF.community]) + parseFloat(Object.values(element.data)[4])
          //   // console.log(Object.values(element.data)[4])
          //   // console.log('end')
          //   // console.log(reviewsReward[elementF.community])
          // }
        })
      })
      // console.log('reviewsReward getFunc')
      // console.log(reviewsReward)
      // console.log('reviewsCount')
      // console.log(reviewsCount)
      return reviewsCount
    },
    async getSubmissionsSinceDate (dateRange) {
      const communities = ['intro-to-blockchain', 'ae-dev-101', 'web-dev-101', 'eth-dev-101']
      let submissionsLength = []
      let reviewsCount = []
      const communitySubmissions = []
      let submissionIds = []
      const communityEarnings = []
      let reviewRewards = []
      for (let index = 0; index < communities.length; index++) {
        let communitySubmissionLength = 0
        await firebase.database().ref(`submissions/${communities[index]}`).orderByChild('date').startAt(1511162061000).once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            const element = {}
            const element2 = {}
            element.key = childSnapshot.key
            element.data = childSnapshot.val()
            element2.submissionId = element.key
            element2.community = communities[index]
            // console.log(element)
            submissionsLength++
            communitySubmissionLength++
            communitySubmissions[communities[index]] = communitySubmissionLength
            submissionIds.push(element2)
          })
        })
      }
      for (let index = 0; index < submissionIds.length; index++) {
        const element = submissionIds[index]
        // console.log(element)
        // console.log(this.getReviewsForSubmission(element.submissionId))
        // const newReviewRewards = await this.getReviewsForSubmission(element)
        // if (newReviewRewards[element.community]) {
        //   console.log('newReviewRewards')
        //   console.log(newReviewRewards)
        //   if (!reviewRewards[element.community]) {
        //     reviewRewards[element.community] = 0
        //     console.log('test2')
        //   }
        //   reviewRewards[element.community] = reviewRewards[element.community] + newReviewRewards[element.community]
        //   console.log('reviewRewards new total')
        //   console.log(reviewRewards)
        const newReviewsCount = await this.getReviewsForSubmission(element)
        if (newReviewsCount) {
          console.log('newReviewsCount')
          console.log(newReviewsCount)
          if (!reviewsCount[element.community]) {
            reviewsCount[element.community] = 0
            console.log('test2')
          }
          reviewsCount[element.community] = reviewsCount[element.community] + newReviewsCount
          console.log('reviewsCount new total')
          console.log(reviewsCount)
        }
      }
      // console.log(reviewsCount)
      // console.log(communitySubmissions)
      // console.log(submissionIds)
      // console.log(reviewRewards)
      console.log(reviewsCount)
      this.totalSubmissions = submissionsLength
      // this.communitySubmissions[communities[index]] = communitySubmissionLength)
    },
    async earnedInCommunity () {
      const communities = ['intro-to-blockchain', 'ae-dev-101', 'web-dev-101', 'eth-dev-101']
      let submissionsLength = 0
      for (let index = 0; index < communities.length; index++) {
        let communitySubmissionLength = 0
        let submissionRewards = 0
        await firebase.database().ref(`submissions/${communities[index]}`).orderByChild('date').once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            const element = {}
            element.key = childSnapshot.key
            element.data = childSnapshot.val()
            console.log(element.data.submissionReward)
            if (element.data.submissionReward) {
              submissionRewards = submissionRewards + parseFloat(element.data.submissionReward)
            }
            submissionsLength = submissionsLength + 1
            communitySubmissionLength++
            console.log(communitySubmissionLength)
            console.log('submissionRewards')
            console.log(submissionRewards)
          })
        })
        console.log(communities[index])
        console.log(submissionsLength)
      }
      console.log(submissionsLength)
    }
  }
}
</script>
<style scoped>
.row {
  margin: 3em;
}
</style>
