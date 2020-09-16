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
        <b-card
          v-for="( transaction, index ) in orderTransactions(Object.values(transactions))"
          :key="index"
          class="mb-4"
          bg-variant="dark"
          text-variant="white"
        >
          <div class="muted-dark">
            {{ convertDate(transaction.paid) }}
          </div>
          <div>
            userId:
            <strong>
              {{ transaction.userId }}
            </strong>
          </div>
          <div>
            displayName:
            <strong>
              {{ transaction.displayName }}
            </strong>
          </div>
          <div>
            Community:
            <strong>
              {{ transaction.communityId }}
            </strong>
          </div>
          <div>
            Payout Amount:
            <strong>
              {{ transaction.payoutAmount }}$
            </strong>
            ({{ transaction.rewardToken }})
          </div>
          <div>
            Wallet Address:
            <strong>
              {{ transaction.userWallet }}
            </strong>
          </div>
          <div>
            <strong>
              Reporting
            </strong>
            <p>
              {{ convertDate(transaction.paid) }}, {{ transaction.userId }}, {{ transaction.displayName }}, {{ transaction.userWallet }}, {{ transaction.payoutAmount }}
            </p>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars */
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  data () {
    return {
      transactions: [],
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
    async getPayoutRequests () {
      const communityIdsThatAdminManages = ['intro-to-blockchain', 'ae-dev-101', 'web-dev-101', 'eth-dev-101', 'AE', 'ETH']
      const payoutRequests = {}
      for (const communityId of communityIdsThatAdminManages) {
        await firebase.database().ref(`payoutRequests/${communityId}`).orderByChild('paid').once('value').then((snapShot) => {
          if (snapShot.val()) {
            payoutRequests[communityId] = snapShot.val()
          }
        })
      }
      // console.log(payoutRequests)
      for (const key in payoutRequests) {
        if (payoutRequests[key]) {
          const element = payoutRequests[key]
          for (const key2 in element) {
            if (element[key2]) {
              const element2 = element[key2]
              element2.communityId = key
              element2.userId = key2
              await firebase.database().ref(`users/${key2}`).once('value').then((snapShot) => {
                if (snapShot.val()) {
                  element2.displayName = snapShot.val().displayName
                }
              })
              this.transactions.push(element2)
            }
          }
        }
      }
      this.requestsQueried = true
    },
    convertDate (date) {
      const outputDate = new Date(date)
      return outputDate.toISOString().slice(0, 10)
    },
    orderTransactions (transactions) {
      return Object.values(transactions).sort(function (a, b) {
        return a.paid - b.paid
      })
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
