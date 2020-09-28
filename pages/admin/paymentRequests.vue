<template>
  <div>
    <div class="row">
      <div class="offset-md-3 col-lg-6">
        <div class="mb-4">
          <h1>
            <b>
              OPEN PAYMENTS
            </b>
          </h1>
        </div>
        <div class="mb-4">
          <nuxt-link to="/admin/" class="btn btn-secondary">
            BACK
          </nuxt-link>
        </div>
        <div class="mb-4">
          <nuxt-link to="/admin/payments" class="btn btn-secondary">
            PAYMENTS MADE
          </nuxt-link>
        </div>
      </div>
      <div v-if="requestsQueried" class="offset-md-3 col-lg-6">
        <div v-for="(openCommunityRequests, index) in Object.values(payoutRequests)" :key="index">
          <b-card
            v-for="( openRequest, index2 ) in Object.values(openCommunityRequests)"
            :key="index2"
            class="mb-4"
            bg-variant="dark"
            text-variant="white"
          >
            <div class="muted-dark">
              {{ convertDate(openRequest.date) }}
            </div>
            <div>
              Community:
              <strong>
                {{ Object.keys(payoutRequests)[index] }}
              </strong>
            </div>
            <div>
              Payout Amount:
              <strong>
                {{ openRequest.payoutAmount }}$
              </strong>
              ({{ openRequest.rewardToken }})
            </div>
            <div>
              Wallet Address:
              <strong>
                {{ openRequest.userWallet }}
              </strong>
            </div>
            <div
              class="btn-cash-out pointer btn mt-2 mb-4"
              @click="paymentDone(Object.keys(payoutRequests)[index], openRequest, Object.keys(openCommunityRequests)[index2])"
            >
              Mark payment as done
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars */
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import util from '~/assets/js/util'

export default {
  data () {
    return {
      payoutRequests: [],
      requestsQueried: false
    }
  },
  computed: {
    ...mapGetters({
      communityDataPreview: 'content/communityDataPreview'
    })
  },
  mounted () {
    if ((!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0)) {
      this.getCommunityDataPreview()
    }
  },
  created () {
    this.getPayoutRequests()
  },
  methods: {
    ...mapActions({
      getCommunityDataPreview: 'content/getCommunityDataPreview'
    }),
    convertDate (date) {
      return util.convertDate(date)
    },
    async getPayoutRequests () {
      const communityIdsThatAdminManages = ['intro-to-blockchain', 'ae-dev-101', 'web-dev-101', 'eth-dev-101', 'AE', 'ETH']
      for (const communityId of communityIdsThatAdminManages) {
        await firebase.database().ref(`payoutRequests/${communityId}`).orderByChild('paid').equalTo(false).once('value').then((snapShot) => {
          if (snapShot.val()) {
            this.payoutRequests[communityId] = snapShot.val()
            console.log(snapShot.val())
          }
        })
      }
      // console.log(this.payoutRequests)
      this.requestsQueried = true
    },
    paymentDone (index, openRequest, userId) {
      // Add a timestamp to the request object indicating that it was paid and when.
      const requestObject = {
        communityId: index,
        userId
      }
      // console.log('requestObject')
      // console.log(requestObject)
      this.$store.dispatch('payouts/updatePayoutRequestAsPaid', requestObject)
      // Add a timestamp to all transactions when they were paid.
      if (openRequest.transactionIds) {
        for (const transactionId of openRequest.transactionIds) {
          const transactionObject = {
            userId,
            communityId: index,
            transactionId
          }
          // console.log('transactionObject')
          // console.log(transactionObject)
          this.$store.dispatch('admin/updateTransactionAsPaid', transactionObject)
        }
      }
      // Deduct paid out amount from the users balance.
      const userBalanceObject = {
        userId,
        rewardToken: openRequest.rewardToken,
        rewardAmount: -openRequest.payoutAmount
      }
      // console.log('userBalanceObject')
      // console.log(userBalanceObject)
      this.$store.dispatch('admin/updateBalance', userBalanceObject)
      // update the request pending entry
      this.$store.dispatch('admin/updatePayoutRequestPending', userBalanceObject)
      // Add notification
      const notificationObject = {
        date: Date.now(),
        link: '/profile/',
        notificationRead: false,
        userId
      }
      if (index === 'AE' || index === 'ETH') {
        notificationObject.message = `We send ${openRequest.payoutAmount}$ in ${openRequest.rewardToken} token to your wallet. Thank you for your contribution.`
      } else {
        notificationObject.message = `We send ${openRequest.payoutAmount}$ in ${openRequest.rewardToken} token to your wallet. Thank you for your contribution to the ${index} community.`
      }
      // console.log('notificationObject')
      // console.log(notificationObject)
      this.$store.dispatch('addUserNotification', notificationObject)
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
