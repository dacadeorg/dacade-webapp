<template>
  <div>
    <div class="row">
      <div class="offset-md-3 col-lg-6">
        <div class="mb-4">
          <h1>
            <b>
              Verification Requests
            </b>
          </h1>
        </div>
        <div class="mb-4">
          <nuxt-link to="/admin/" class="btn btn-secondary">
            BACK
          </nuxt-link>
        </div>
      </div>
      <div v-if="requestsQueried" class="offset-md-3 col-lg-6">
        <div>
          <b-card
            v-for="( openRequest, index ) in Object.values(verificationRequests)"
            :key="index"
            class="mb-4"
            bg-variant="dark"
            text-variant="white"
          >
            <div>
              <a :href="openRequest[Object.keys(openRequest)].link">Verification Link</a>
            </div>
            <div
              class="btn-cash-out pointer btn mt-2 mb-4"
              @click="verifyRequest(Object.keys(verificationRequests)[index], openRequest)"
            >
              Verified
            </div>
            <div
              class="btn-cash-out pointer btn mt-2 mb-4"
              @click="deleteVerificationRequest(Object.keys(verificationRequests)[index], openRequest)"
            >
              Not Verified
            </div>
          </b-card>
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
      verificationRequests: [],
      requestsQueried: false
    }
  },
  created() {
    this.getVerificationRequests()
  },
  methods: {
    verifyRequest(userId, request) {
      const verificationObject = {
        userId: userId,
        verificationType: Object.keys(request)[0],
        verificationLink: Object.values(request)[0].link
      }
      this.$store.dispatch('admin/deleteVerificationRequest', verificationObject)
      this.$store.dispatch('admin/createUserVerification', verificationObject)
    },
    deleteVerificationRequest(userId, request) {
      const verificationObject = {
        userId: userId,
        verificationType: Object.keys(request)[0],
        verificationLink: Object.values(request)[0].link
      }
      this.$store.dispatch('admin/deleteVerificationRequest', verificationObject)
    },
    async getVerificationRequests() {
      await firebase.database().ref(`userVerificationRequest`).once('value').then((snapShot) => {
        if (snapShot.val()) {
          this.verificationRequests = snapShot.val()
        }
      })
      this.requestsQueried = true
    }
  }
}
</script>
<style scoped>
.row {
  margin: 3em;
}

.btn-cash-out {
  color: black;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: #ffcc00;
  border: 1.6px solid #ffcc00;
  border-radius: .35rem;
  padding: 10px 40px;
  font-weight: 700;
}
</style>
