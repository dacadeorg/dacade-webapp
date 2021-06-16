<template>
  <div v-if="pendingRequest && pendingRequest[coinName]">
    <div class="notification mt-2">
      <span>
        <i class="fa fa-clock-o mr-2 color-default" aria-hidden="true" />
      </span>
      Payout request for {{ pendingRequest[coinName] }} {{ coinName }} pending.
    </div>
  </div>
  <div v-else>
    <span
      v-b-modal="'cash-out-modal' + coinName"
      class="btn-cash-out btn mt-2 mb-4 small-shadow"
    >
      Cash out
    </span>
    <b-modal
      :id="'cash-out-modal' + coinName"
      title="Cash Out"
      header-text-variant="light"
      hide-footer
    >
      Request to payout {{ balance }}$ in {{ coinName }} token to the
      {{ coinName }} address: {{ userAddress[coinName] }}
      <div class="text-center">
        <div
          class="btn-cash-out btn mt-4 mb-2 small-shadow"
          @click="
            createPayoutObject(coinName),
              $bvModal.hide('cash-out-modal' + coinName)
          "
        >
          Send request
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable no-console, no-unused-vars, require-await, prefer-const */
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  props: {
    coinName: {
      type: String,
      required: true,
    },
    onUpdateVerification: {
      type: Function,
      default() {
        return 'function'
      },
    },
    userAddress: {
      type: Object,
      default() {
        return { message: 'hello' }
      },
    },
    onGetUserAddress: {
      type: Function,
      default() {
        return 'function'
      },
    },
    pendingRequest: {
      type: Object,
      default() {
        return { message: 'hello' }
      },
    },
  },
  computed: {
    ...mapGetters({
      balance: 'user/balance',
    }),
  },
  methods: {
    // Create a payout request:
    // track everything a person was paid for (for ex. for feed back and submissions) , keep track of all the transactions
    // ledger where all the transactions are noted
    // 1. Get communities with the requested token.
    // 2. Loop over these communties and get the unpaid transactions of the user in these communties.
    // 3. Send the payout request containing the unpaid transactions.
    async createPayoutObject(token) {
      if (this.user) {
        const communitiesWithPayoutToken = this.getCommunitiesWithPayoutToken(
          token,
          this.communityDataPreview
        )
        let totalTransactionPayoutAmount = 0
        for (const community in communitiesWithPayoutToken) {
          const unpaidCommunityTransactions =
            await this.getUnpaidTransactionsOfUserInCommunity(
              communitiesWithPayoutToken[community],
              this.user.id
            )
          const transactionsAmountAndTransactionIds =
            this.getTransactionIdssAndAmount(unpaidCommunityTransactions)
          totalTransactionPayoutAmount =
            totalTransactionPayoutAmount +
            transactionsAmountAndTransactionIds.transactionsAmount
          if (transactionsAmountAndTransactionIds.transactionsAmount > 0) {
            const payoutObject = {
              communityId: communitiesWithPayoutToken[community],
              userId: this.user.id,
              payoutAmount:
                transactionsAmountAndTransactionIds.transactionsAmount,
              userWallet: this.userWalletAddresses[token],
              transactionIds:
                transactionsAmountAndTransactionIds.transactionIds,
              date: Date.now(),
              rewardToken: token,
              paid: false,
            }
            // console.log(payoutObject)
            this.$store.dispatch('payouts/createPayoutRequest', payoutObject)
          }
        }
        // Because we introduced transactions later not all issued payments have transactions.
        // Thats why we need to create a different payout request for all unaccounted payments.
        // we could get rid of this and put the already existent accounts in 0
        if (this.balance[token] > totalTransactionPayoutAmount) {
          const unaccountedPayoutAmount =
            this.balance[token] - totalTransactionPayoutAmount
          const payoutObject = {
            communityId: token,
            userId: this.user.id,
            payoutAmount: parseFloat(unaccountedPayoutAmount.toFixed(1)),
            userWallet: this.userWalletAddresses[token],
            date: Date.now(),
            rewardToken: token,
            paid: false,
          }
          // console.log(payoutObject)
          this.$store.dispatch('payouts/createPayoutRequest', payoutObject)
        }
        const payoutPendingObject = {
          userId: this.user.id,
          payoutAmount: parseFloat(this.balance[token].toFixed(1)),
          tokenFormat: token,
        }
        // console.log(payoutPendingObject)
        this.$store.dispatch(
          'payouts/setPayoutRequestPending',
          payoutPendingObject
        )
        // This should be optimized it shouldnt have to reload the page to display the new result, but get it from the state.
        this.$router.go()
      }
    },
    getCommunitiesWithPayoutToken(token, communities) {
      const communitiesWithPayoutToken = []
      for (let index = 0; index < Object.values(communities).length; index++) {
        const element = Object.values(communities)[index].rewardToken
        if (element === token) {
          communitiesWithPayoutToken.push(Object.keys(communities)[index])
        }
      }
      return communitiesWithPayoutToken
    },
    async getUnpaidTransactionsOfUserInCommunity(communityId, userId) {
      let transactions = []
      await firebase
        .database()
        .ref(`transactions/${communityId}/${userId}`)
        .orderByChild('paid')
        .equalTo(false)
        .once('value')
        .then((snapShot) => {
          transactions = snapShot.val()
        })
      return transactions
    },
    getTransactionIdssAndAmount(transactions) {
      let transactionsAmount = 0
      const transactionIds = []
      if (transactions && Object.values(transactions).length) {
        for (
          let index = 0;
          index < Object.values(transactions).length;
          index++
        ) {
          transactionIds.push(Object.keys(transactions)[index])
          transactionsAmount =
            transactionsAmount + Object.values(transactions)[index].amount
        }
      }
      return {
        transactionsAmount,
        transactionIds,
      }
    },
  },
}
</script>

<style scoped>
.btn-cash-out {
  color: black;
  border: 2px solid #fc0;
  background: #fc0;
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
