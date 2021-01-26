<template>
  <section>
    <div v-if="balance && Object.keys(balance).length" class="mt-4">
      <h4>
        <b>
          Balance:
        </b>
      </h4>
      <div v-if="balance.DCN" class="mb-4">
        <h4>
          Dacade coins:
          <b class="dark-white">
            {{ parseFloat(balance.DCN).toFixed(0) }}
            <coin />
          </b>
        </h4>
      </div>
      <div
        v-for="(balance, key) in balance"
        :key="balance.id"
        class="mb-4"
      >
        <div v-if="key !== 'DCN'">
          <h4>
            {{ key }} token:
            <b class="earning-color">
              {{ parseFloat(balance).toFixed(0) }}$
            </b>
          </h4>
          <div>
            <div
              v-if="
                userWalletAddresses &&
                  userWalletAddresses[key] &&
                  userVerifications &&
                  userVerifications['socialMedia']
              "
            >
              <!-- If the user entered a wallet address for the token and is verified
                      , they can change the address and make a payout request -->
              <h4 class="muted-dark">
                {{ key }} wallet address: {{ userWalletAddresses[key] }}
              </h4>
              <div
                v-b-modal="'add-address-modal2' + key"
                class="btn-edit btn mt-2 mb-2 muted-dark small-shadow"
              >
                Change {{ key }} Address
              </div>
              <b-modal
                :id="'add-address-modal2' + key"
                title="Change Address"
                header-text-variant="light"
                hide-footer
              >
                <div>
                  <form-uwa :test="`New ${key} wallet address:`" :method="updateWalletAddress" />
                </div>
              </b-modal>
              <div
                v-if="
                  payoutRequestsPending && payoutRequestsPending[key]
                "
              >
                <div class="notification mt-2">
                  <span>
                    <i
                      class="fa fa-clock-o mr-2 color-default"
                      aria-hidden="true"
                    />
                  </span>
                  Payout request for {{ payoutRequestsPending[key] }}
                  {{ key }} pending.
                </div>
              </div>
              <div v-else>
                <span
                  v-b-modal="'cash-out-modal' + key"
                  class="btn-cash-out btn mt-2 mb-4 small-shadow"
                >
                  Cash out
                </span>
                <!-- <send-request-modal :method="createPayoutObject" /> -->
                <b-modal
                  :id="'cash-out-modal' + key"
                  title="Cash Out"
                  header-text-variant="light"
                  hide-footer
                >
                  Request to payout {{ balance }}$ in {{ key }} token to
                  the {{ key }} address: {{ userWalletAddresses[key] }}
                  <div class="text-center">
                    <div
                      class="btn-cash-out btn mt-4 mb-2 small-shadow"
                      @click="
                        createPayoutObject(key),
                        $bvModal.hide('cash-out-modal' + key)
                      "
                    >
                      Send request
                    </div>
                  </div>
                </b-modal>
              </div>
            </div>
            <!-- If the user isn't verified, they can add a verification request -->
            <div
              v-else-if="
                !userVerifications || !userVerifications['socialMedia']
              "
            >
              <div
                v-if="userVerificationPendig === true"
                class="notification"
              >
                <span>
                  <i
                    class="fa fa-clock-o mr-2 color-default"
                    aria-hidden="true"
                  />
                </span>
                Social media verification request pending.
              </div>
              <div v-else>
                <div
                  v-b-modal="'add-social-media-verification' + key"
                  class="btn-add btn mt-2 mb-4 small-shadow"
                >
                  Add social media verification
                </div>
                <b-modal
                  :id="'add-social-media-verification' + key"
                  title="Add social media verification"
                  header-text-variant="light"
                  hide-footer
                >
                  <div>
                    <form-uuv :method="updateUserVerifications" />
                  </div>
                </b-modal>
              </div>
            </div>
            <!-- If the user didn't enter a wallet address for the token, they can add a new address -->
            <div
              v-else-if="
                !userWalletAddresses || !userWalletAddresses[key]
              "
            >
              <div
                v-b-modal="'add-address-modal' + key"
                class="btn-add btn mt-2 mb-4 small-shadow"
              >
                Add {{ key }} Address
              </div>
              <b-modal
                :id="'add-address-modal' + key"
                :title="`Add ${key} address`"
                header-text-variant="light"
                hide-footer
              >
                <div>
                  <p>
                    Please enter the address of your {{ key }} wallet
                    below.
                  </p>
                  <form-uwa test="key + ' wallet address:'" />
                </div>
              </b-modal>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mb-6">
      <h4>
        <b>
          Balance:
        </b>
        <span class="dark-white">
          <b>0</b>
        </span>
        <coin height="22" />
      </h4>
    </div>
  </section>
</template>

<script>
/* eslint-disable no-console, no-unused-vars, require-await, prefer-const */
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'
import FormUuv from '@/components/profile/balance/FormUuv.vue'
import FormUwa from '@/components/profile/balance/FormUwa.vue'
// import SendRequestModal from '@/components/profile/balance/SendRequestModal.vue'

export default {
  components: {
    FormUuv,
    FormUwa
    // SendRequestModal
  },
  data () {
    return {
      addresses: [],
      inputUserVerifications: [],
      userWalletAddresses: null,
      userVerifications: null,
      userVerificationPendig: false,
      payoutRequestsPending: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/data',
      balance: 'user/balance',
      communityDataPreview: 'content/communityDataPreview'

    })
  },
  watch: {
    // When we have the userdata, we can execute the function.
    user (userData) {
      if (userData) {
        this.getUserWalletAddresses()
        this.getUserVerifications()
      }
    },
    userWalletAddresses () {
      this.getPendingPayoutRequests()
    }
  },
  created () {
    if (this.user) {
      // data was sometimes already there, then no watch needed
      // user or userData?
      this.getUserWalletAddresses()
      this.getUserVerifications()
      this.$store.dispatch('content/getCommunityDataPreview')
    }
  },
  methods: {
    jobsDone () {
      this.removeErrors()
    },
    // Create a payout request:
    // track everything a person was paid for (for ex. for feed back and submissions) , keep track of all the transactions
    // ledger where all the transactions are noted
    // 1. Get communities with the requested token.
    // 2. Loop over these communties and get the unpaid transactions of the user in these communties.
    // 3. Send the payout request containing the unpaid transactions.
    async createPayoutObject (token) {
      if (this.user) {
        const communitiesWithPayoutToken = this.getCommunitiesWithPayoutToken(token, this.communityDataPreview)
        let totalTransactionPayoutAmount = 0
        for (const community in communitiesWithPayoutToken) {
          const unpaidCommunityTransactions = await this.getUnpaidTransactionsOfUserInCommunity(communitiesWithPayoutToken[community], this.user.id)
          const transactionsAmountAndTransactionIds = this.getTransactionIdssAndAmount(unpaidCommunityTransactions)
          totalTransactionPayoutAmount = totalTransactionPayoutAmount + transactionsAmountAndTransactionIds.transactionsAmount
          if (transactionsAmountAndTransactionIds.transactionsAmount > 0) {
            const payoutObject = {
              communityId: communitiesWithPayoutToken[community],
              userId: this.user.id,
              payoutAmount: transactionsAmountAndTransactionIds.transactionsAmount,
              userWallet: this.userWalletAddresses[token],
              transactionIds: transactionsAmountAndTransactionIds.transactionIds,
              date: Date.now(),
              rewardToken: token,
              paid: false
            }
            // console.log(payoutObject)
            this.$store.dispatch('payouts/createPayoutRequest', payoutObject)
          }
        }
        // Because we introduced transactions later not all issued payments have transactions.
        // Thats why we need to create a different payout request for all unaccounted payments.
        // we could get rid of this and put the already existent accounts in 0
        if (this.balance[token] > totalTransactionPayoutAmount) {
          const unaccountedPayoutAmount = this.balance[token] - totalTransactionPayoutAmount
          const payoutObject = {
            communityId: token,
            userId: this.user.id,
            payoutAmount: parseFloat(unaccountedPayoutAmount.toFixed(1)),
            userWallet: this.userWalletAddresses[token],
            date: Date.now(),
            rewardToken: token,
            paid: false
          }
          // console.log(payoutObject)
          this.$store.dispatch('payouts/createPayoutRequest', payoutObject)
        }
        const payoutPendingObject = {
          userId: this.user.id,
          payoutAmount: parseFloat(this.balance[token].toFixed(1)),
          tokenFormat: token
        }
        // console.log(payoutPendingObject)
        this.$store.dispatch('payouts/setPayoutRequestPending', payoutPendingObject)
        // This should be optimized it shouldnt have to reload the page to display the new result, but get it from the state.
        this.$router.go()
      }
    },
    getCommunitiesWithPayoutToken (token, communities) {
      const communitiesWithPayoutToken = []
      for (let index = 0; index < Object.values(communities).length; index++) {
        const element = Object.values(communities)[index].rewardToken
        if (element === token) {
          communitiesWithPayoutToken.push(Object.keys(communities)[index])
        }
      }
      return communitiesWithPayoutToken
    },
    async getUnpaidTransactionsOfUserInCommunity (communityId, userId) {
      let transactions = []
      await firebase.database().ref(`transactions/${communityId}/${userId}`).orderByChild('paid').equalTo(false).once('value').then((snapShot) => {
        transactions = snapShot.val()
      })
      return transactions
    },
    getTransactionIdssAndAmount (transactions) {
      let transactionsAmount = 0
      const transactionIds = []
      if (transactions && Object.values(transactions).length) {
        for (let index = 0; index < Object.values(transactions).length; index++) {
          transactionIds.push(Object.keys(transactions)[index])
          transactionsAmount = transactionsAmount + Object.values(transactions)[index].amount
        }
      }
      return {
        transactionsAmount,
        transactionIds
      }
    },
    updateWalletAddress (key) {
      const walletObject = {
        userId: this.user.id,
        walletAddress: this.addresses[key],
        token: key
      }
      this.$store.dispatch('updateWalletAddress', walletObject)
      // This should be optimized it shouldnt have to reload the page to display the new result, but get it from the state.
      this.$router.go()
    },
    updateUserVerifications () {
      const verficationObject = {
        userId: this.user.id,
        displayName: this.user.displayName,
        verificationLink: this.inputUserVerifications.socialMedia,
        verificationType: 'socialMedia'
      }
      // console.log(verficationObject)
      this.$store.dispatch('createVerificationRequest', verficationObject)
      // This should be optimized it shouldnt have to reload the page to display the new result, but get it from the state.
      this.$router.go()
    },
    // maybe get it through the store and not directly from the database?
    async getUserWalletAddresses () {
      await firebase.database().ref(`userWallet/${this.user.id}`).once('value').then((snapShot) => {
        this.userWalletAddresses = snapShot.val()
      })
    },
    async getPendingPayoutRequests () {
      await firebase.database().ref(`payoutRequestsPending/${this.user.id}`).once('value').then((snapShot) => {
        this.payoutRequestsPending = snapShot.val()
      })
    },
    async getUserVerifications () {
      await firebase.database().ref(`userVerifications/${this.user.id}`).once('value').then((snapShot) => {
        this.userVerifications = snapShot.val()
      })
      if (this.userVerifications === null) {
        await this.getUserVerificationRequest()
      }
    },
    async getUserVerificationRequest () {
      await firebase.database().ref(`userVerificationRequest/${this.user.id}/socialMedia`).once('value').then((snapShot) => {
        if (snapShot.val()) {
          this.userVerificationPendig = true
        }
      })
    }
  }
}
</script>

<style scoped>
.btn-cash-out {
  color: black;
  border: 2px solid #ffcc00;
  background: #ffcc00;
  border-radius: 0.35rem;
  padding: 10px 40px;
  font-weight: 700;
}

.btn-cash-out:hover {
  cursor: pointer;
  border: 2px solid white;
}

.btn-edit {
  color: #64686b;
  background-color: none;
  border: 1.6px solid #64686b;
  border-radius: 0.35rem;
  padding: 10px 40px;
  font-weight: 700;
}

.btn-edit:hover {
  color: black;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
}

.btn-add {
  color: black;
  border: 2px solid #64686b;
  background: #64686b;
  border-radius: 0.35rem;
  padding: 10px 40px;
  font-weight: 700;
}

.btn-add:hover {
  color: black;
  cursor: pointer;
  border: 2px solid white;
  background-color: rgba(255, 255, 255, 0.3);
}

.bg-black {
  background: black;
}

.DCN-icon {
  vertical-align: -2px;
  margin-left: -4px;
}

.notification {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-left: 6px solid #acb2be;
  border-radius: 0.35rem;
  color: rgba(0, 0, 0, 0.7);
  font-style: italic;
  font-weight: bold;
  padding: 1em;
  padding-right: 2em;
  display: inline-block;
}

.overlay-text {
  font-size: 1.4em;
}

.social-media-post {
  border: none;
  border: 1.6px solid white;
  border-radius: 0.35rem;
  color: rgba(255, 255, 255, 1);
  font-style: italic;
  font-weight: bold;
  padding: 0.8em;
}

.unread {
  color: #53d1af;
  border-color: #53d1af;
}

.unread a {
  color: #53d1af;
}
</style>
