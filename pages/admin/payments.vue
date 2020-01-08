<template>
  <div>
    <div class="row">
      <div class="offset-md-3 col-lg-6">
        <div class="mb-4">
          <h1>
            <b>
              PAYMENTS
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
            v-for="( openRequest, index ) in Object.values(payoutRequests)"
            :key="index"
            class="mb-4"
            bg-variant="dark"
            text-variant="white"
          >
            <div class="muted-dark">
              {{ convertDate(openRequest[Object.keys(openRequest)].date) }}
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
                {{ openRequest[Object.keys(openRequest)].payoutAmount }}$
              </strong>
              ({{ openRequest[Object.keys(openRequest)].rewardToken }})
            </div>
            <div>
              Wallet Address:
              <strong>
                {{ openRequest[Object.keys(openRequest)].userWallet }}
              </strong>
            </div>
            <div
              class="btn-cash-out pointer btn mt-2 mb-4"
              @click="paymentDone(Object.keys(payoutRequests)[index], openRequest)"
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
  data() {
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
  mounted() {
    if ((!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0)) {
      this.getCommunityDataPreview()
    }
  },
  created() {
    this.getPayoutRequests()
  },
  methods: {
    ...mapActions({
      getCommunityDataPreview: 'content/getCommunityDataPreview'
    }),
    convertDate(date) {
      return util.convertDate(date)
    },
    async getPayoutRequests() {
      const communityIdsThatAdminManages = ['intro-to-blockchain', 'ae-dev-101', 'web-dev-101', 'eth-dev-101', 'AE', 'ETH']
      for (const communityId of communityIdsThatAdminManages) {
        await firebase.database().ref(`payoutRequests/${communityId}`).orderByChild('paid').equalTo(false).once('value').then((snapShot) => {
          if (snapShot.val()) {
            this.payoutRequests[communityId] = snapShot.val()
          }
        })
      }
      this.requestsQueried = true
    },
    paymentDone(index, openRequest) {
      // Add a timestamp to the request object indicating that it was paid and when.
      const requestObject = {
        communityId: index,
        userId: Object.keys(openRequest)[0]
      }
      // console.log(requestObject)
      this.$store.dispatch('payouts/updatePayoutRequestAsPaid', requestObject)
      // Add a timestamp to all transactions when they were paid.
      if (Object.values(openRequest)[0].transactionIds) {
        for (const transactionId of Object.values(openRequest)[0].transactionIds) {
          const transactionObject = {
            userId: Object.keys(openRequest)[0],
            communityId: index,
            transactionId: transactionId
          }
          // console.log(transactionObject)
          this.$store.dispatch('admin/updateTransactionAsPaid', transactionObject)
        }
      }
      // Deduct paid out amount from the users balance.
      const userBalanceObject = {
        userId: Object.keys(openRequest)[0],
        rewardToken: Object.values(openRequest)[0].rewardToken,
        rewardAmount: -Object.values(openRequest)[0].payoutAmount
      }
      console.log(userBalanceObject)
      this.$store.dispatch('admin/updateBalance', userBalanceObject)
      // update the request pending entry
      this.$store.dispatch('admin/updatePayoutRequestPending', userBalanceObject)
      // Add notification
      const notificationObject = {
        date: Date.now(),
        link: '/profile/',
        notificationRead: false,
        userId: Object.keys(openRequest)[0]
      }
      if (index === 'AE' || index === 'ETH') {
        notificationObject.message = `We send ${Object.values(openRequest)[0].payoutAmount}$ 
        in ${Object.values(openRequest)[0].rewardToken} token to your wallet. Thank you for your contribution.`
      } else {
        notificationObject.message = `We send ${Object.values(openRequest)[0].payoutAmount}$ 
        in ${Object.values(openRequest)[0].rewardToken} token to your wallet. Thank you for your contribution to the ${index} community.`
      }
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
