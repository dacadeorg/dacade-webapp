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
              <b-button @click="userMigration()">
                User Migration
              </b-button>
            </b-nav-item>
            <b-nav-item>
              <b-button @click="submissionsMigration()">
                Submissions Migration
              </b-button>
            </b-nav-item>
            <b-nav-item>
              <b-button @click="reviewMigration()">
                Review Migration
              </b-button>
            </b-nav-item>
            <b-nav-item>
              <b-button @click="evaluationMigration()">
                Evaluation Migration
              </b-button>
            </b-nav-item>
          </b-nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import firebase from '@/plugins/firebase'

export default {
  methods: {
    back() {
      this.$router.back()
    },
    async userMigration() {
      let oldUserdata = null
      await firebase.database().ref('/oldData/').once('value').then(function (snapshot) {
        oldUserdata = (snapshot.val())
      })
      console.log(Object.keys(oldUserdata).length)
      for (let index = 0; index < Object.keys(oldUserdata).length; index++) {
        const element = Object.values(oldUserdata)[index]
        console.log(index)
        console.log(element)
        if (element.balance) {
          await firebase.database().ref('balance/' + element.uid).set({
            AE: element.balance
          })
        }
        await firebase.database().ref('users/' + element.uid).set({
          displayName: element.displayName
        })
        if (element.learningPoints) {
          await firebase.database().ref('learningPoints/' + element.uid).set({
            'intro-to-blockchain': element.learningPoints
          })
        }
        if (element.learningPoints) {
          await firebase.database().ref('reputation/' + element.uid).set({
            'intro-to-blockchain': element.teachingPoints
          })
        }
      }
    },
    async submissionsMigration() {
      let oldSubmissionData = null
      await firebase.database().ref('/oldData/').once('value').then(function (snapshot) {
        oldSubmissionData = (snapshot.val())
      })
      console.log(Object.keys(oldSubmissionData).length)
      for (let index = 0; index < Object.keys(oldSubmissionData).length; index++) {
        const element = Object.values(oldSubmissionData)[index]
        console.log(element)
        console.log(index)
        let communityId = 'intro-to-blockchain'
        if (element.lCId === 1) {
          communityId = 'eth-dev-101'
        }
        if (element.lCId === 2) {
          communityId = 'ae-dev-101'
        }
        if (element.lCId === 3) {
          communityId = 'web-dev-101'
        }
        let submissionPoints = null
        let submissionReward = null
        let githubLink = null

        if (element.submissionPoints) {
          submissionPoints = element.submissionPoints
        } else {
          await firebase.database().ref(`openSubmissions/${Object.keys(oldSubmissionData)[index]}`).set({
            communityId: communityId,
            date: element.date,
            displayName: element.displayName,
            text: element.text,
            userId: element.userId
          })
        }
        if (element.submissionReward) {
          submissionReward = element.submissionReward
        }
        if (element.githubLink) {
          githubLink = element.githubLink
        }
        await firebase.database().ref(`submissions/${communityId}/${Object.keys(oldSubmissionData)[index]}`).set({
          communityId: communityId,
          date: element.date,
          displayName: element.displayName,
          submissionPoints: submissionPoints,
          submissionReward: submissionReward,
          githubLink: githubLink,
          text: element.text,
          userId: element.userId
        })
      }
    },
    async reviewMigration() {
      let oldData = null
      await firebase.database().ref('/oldData/').once('value').then(function (snapshot) {
        oldData = (snapshot.val())
      })
      console.log(Object.keys(oldData).length)
      for (let index = 0; index < Object.keys(oldData).length; index++) {
        const element = Object.values(oldData)[index]
        console.log(element)
        console.log(index)
        let rewardAmount = 0
        let reviewCodeLink = null
        if (element.rewardAmount) {
          rewardAmount = element.rewardAmount
        }
        if (element.reviewCodeLink) {
          reviewCodeLink = element.reviewCodeLink
        }
        console.log(Object.keys(oldData)[index])
        await firebase.database().ref(`reviews/${element.submissionId}/${Object.keys(oldData)[index]}`).set({
          content: element.content,
          date: element.date,
          reviewDisplayName: element.reviewDisplayName,
          reviewUserId: element.reviewUserId,
          rewardAmount: rewardAmount,
          reviewCodeLink: reviewCodeLink
        })
      }
    },
    async evaluationMigration() {
      let oldData = null
      await firebase.database().ref('/oldData/').once('value').then(function (snapshot) {
        oldData = (snapshot.val())
      })
      console.log(Object.keys(oldData).length)
      for (let index = 0; index < Object.keys(oldData).length; index++) {
        const element = Object.values(oldData)[index]
        console.log(index)
        console.log(Object.values(oldData)[index])

        let relevanceText = ''
        let relevanceValue = 0
        if (element.relevanceText) {
          relevanceText = element.relevanceText
        }
        if (element.relevanceValue) {
          relevanceValue = element.relevanceValue
        }

        let originalityText = ''
        let originalityValue = 0
        if (element.originalityText) {
          originalityText = element.originalityText
        }
        if (element.originalityValue) {
          originalityValue = element.originalityValue
        }

        let qualityText = ''
        let qualityValue = 0
        if (element.qualityText) {
          qualityText = element.qualityText
        }
        if (element.qualityValue) {
          qualityValue = element.qualityValue
        }
        await firebase.database().ref('evaluations/' + element.submissionId).set({
          date: element.date,
          evaluationDisplayName: element.gradingDisplayName,
          evaluationUserId: element.gradingUserId,
          originalityText: originalityText,
          originalityValue: originalityValue,
          qualityText: qualityText,
          qualityValue: qualityValue,
          relevanceText: relevanceText,
          relevanceValue: relevanceValue
        })
      }
    }
  }
}
</script>
<style scoped>
.row {
  margin: 3em;
}
</style>
