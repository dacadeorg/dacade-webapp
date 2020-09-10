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
          <nuxt-link to="/admin/" class="btn btn-secondary">
            BACK
          </nuxt-link>
        </div>
        <div>
          <b-nav vertical class="w-25">
            <b-nav-item>
              <h2>
                <i>
                  <nuxt-link to="/admin/scoreboard/">
                    scoreboard
                  </nuxt-link>
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i @click="getSubmissions">
                  getSubmissions
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i @click="getReviews">
                  getReviews
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i @click="getUsers">
                  getUsers
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i @click="getAllUserReviews">
                  getAllUserReviews
                </i>
              </h2>
            </b-nav-item>
          </b-nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars */
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    async getSubmissions() {
      const communities = ['intro-to-blockchain', 'ae-dev-101', 'web-dev-101', 'eth-dev-101']
      let submissionsLength = 0
      for (let index = 0; index < communities.length; index++) {
        let communitySubmissionLength = 0
        await firebase.database().ref(`submissions/${communities[index]}`).orderByChild('date').startAt(1572220800000).once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            const element = {}
            element.key = childSnapshot.key
            element.data = childSnapshot.val()
            // console.log(element)
            submissionsLength = submissionsLength + 1
            communitySubmissionLength++
            console.log(communitySubmissionLength)
          })
        })
        console.log(communities[index])
        console.log(submissionsLength)
      }
      console.log(submissionsLength)
    },
    async getReviews() {
      let reviews = 0
      await firebase.database().ref('reviews').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const element = {}
          element.key = childSnapshot.key
          element.data = childSnapshot.val()
          reviews = reviews + Object.values(element.data).length
          console.log(reviews)
        })
      })
      console.log(reviews)
    },
    async getUsers() {
      let users = 0
      await firebase.database().ref('users').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const element = {}
          element.key = childSnapshot.key
          element.data = childSnapshot.val()
          users = users + 1
          console.log(users)
        })
      })
      console.log(users)
    },
    async getAllUserReviews() {
      console.log('getAllUserReviews')
      // const test = []
      await firebase.database().ref('reviews').orderByChild('reviewUserId').equalTo('zbhLf4OXIPMzA7E66zQnN0XDip02').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const element = {}
          element.key = childSnapshot.key
          element.data = childSnapshot.val()
          console.log(element)
        })
      })
    }
  }
}
</script>
<style scoped>
.row {
  margin: 3em;
}
</style>
