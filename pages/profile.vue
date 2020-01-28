<template>
  <div>
    <Navigation />
    <div v-if="Object.keys(communityDataPreview).length != 0 && user" class="container">
      <div class="row">
        <div class="col-md-12 mt-4">
          <h2 class="dark-white">
            <b>
              {{ user.displayName }}
            </b>
          </h2>
          <h4 class="muted-dark">
            {{ user.email }}
          </h4>
          <h4
            v-if="userVerifications"
            class="muted-dark"
          >
            <i class="fa fa-check" aria-hidden="true" />
            <b>Verified</b>
          </h4>
          <section>
            <div
              v-if="userBalance && Object.keys(userBalance).length"
              class="mt-4"
            >
              <h4>
                <b>
                  Balance:
                </b>
              </h4>
              <div v-for="(balance, key) in userBalance" :key="balance.id" class="mb-4">
                <h4>
                  {{ key }} token:
                  <b class="earning-color">
                    {{ parseFloat(balance).toFixed(0) }}$
                  </b>
                </h4>
                <div>
                  <div v-if="userWalletAddresses && userWalletAddresses[key] && userVerifications && userVerifications['socialMedia']">
                    <!-- If the user entered a wallet address for the token and is verified
                    , they can change the address and make a payout request -->
                    <h4
                      class="muted-dark"
                    >
                      {{ key }} wallet address: {{ userWalletAddresses[key] }}
                    </h4>
                    <div v-b-modal="'add-address-modal2' + key" class="btn-edit btn mt-2 mb-2 muted-dark small-shadow">
                      Change {{ key }} Address
                    </div>
                    <b-modal
                      :id="'add-address-modal2' + key"
                      title="Change Address"
                      header-text-variant="light"
                      hide-footer
                    >
                      <div>
                        <b-form @submit.prevent="updateWalletAddress(key)">
                          <b-form-group
                            id="input-group-1"
                            :label="`New ${key} wallet address:`"
                            label-for="wallet-address"
                          >
                            <b-form-input
                              id="wallet-address"
                              v-model="addresses[key]"
                              type="text"
                              required
                              placeholder="Enter new wallet address"
                            />
                          </b-form-group>
                          <div
                            class="text-center"
                          >
                            <b-button
                              type="submit"
                              class="btn-add btn mt-2 mb-2 small-shadow"
                              @click="$bvModal.hide('add-address-modal2' + key)"
                            >
                              Submit new Address
                            </b-button>
                          </div>
                        </b-form>
                      </div>
                    </b-modal>
                    <div
                      v-if="payoutRequestsPending && payoutRequestsPending[key]"
                    >
                      <div class="notification mt-2">
                        <span>
                          <i class="fa fa-clock-o mr-2 color-default" aria-hidden="true" />
                        </span>
                        Payout request for {{ payoutRequestsPending[key] }} {{ key }} pending.
                      </div>
                    </div>
                    <div v-else>
                      <span v-b-modal="'cash-out-modal' + key" class="btn-cash-out btn mt-2 mb-4 small-shadow">
                        Cash out
                      </span>
                      <b-modal
                        :id="'cash-out-modal' + key"
                        title="Cash Out"
                        header-text-variant="light"
                        hide-footer
                      >
                        Request to payout {{ balance }}$ in {{ key }} token to the {{ key }} address: {{ userWalletAddresses[key] }}
                        <div class="text-center">
                          <div
                            class="btn-cash-out btn mt-4 mb-2 small-shadow"
                            @click="createPayoutObject(key), $bvModal.hide('cash-out-modal' + key)"
                          >
                            Send request
                          </div>
                        </div>
                      </b-modal>
                    </div>
                  </div>
                  <!-- If the user isn't verified, they can add a verification request -->
                  <div v-else-if="!userVerifications || !userVerifications['socialMedia']">
                    <div
                      v-if="userVerificationPendig === true"
                      class="notification"
                    >
                      <span>
                        <i class="fa fa-clock-o mr-2 color-default" aria-hidden="true" />
                      </span>
                      Social media verification request pending.
                    </div>
                    <div v-else>
                      <div v-b-modal="'add-social-media-verification' + key" class="btn-add btn mt-2 mb-4 small-shadow">
                        Add social media verification
                      </div>
                      <b-modal
                        :id="'add-social-media-verification' + key"
                        title="Add social media verification"
                        header-text-variant="light"
                        hide-footer
                      >
                        <div>
                          <b-form @submit.prevent="updateUserVerifications()">
                            <p>
                              Please make a post with your dacade username on an active social media account
                              and submit the link to the post below.
                            </p>
                            <b>
                              Example:
                            </b>
                            <div
                              class="social-media-post mb-4"
                            >
                              Verifying my dacade.org username {{ user.displayName }}.
                            </div>
                            <b-form-group
                              id="input-group-verification"
                              label-for="wallet-address"
                            >
                              <b-form-input
                                id="wallet-address"
                                v-model="inputUserVerifications['socialMedia']"
                                type="text"
                                required
                                placeholder="Verification Link"
                              />
                            </b-form-group>
                            <div class="text-center">
                              <b-button
                                type="submit"
                                class="btn-add btn mt-2 mb-2 small-shadow"
                                @click="$bvModal.hide('add-social-media-verification' + key)"
                              >
                                Submit Verification
                              </b-button>
                            </div>
                          </b-form>
                        </div>
                      </b-modal>
                    </div>
                  </div>
                  <!-- If the user didn't enter a wallet address for the token, they can add a new address -->
                  <div v-else-if="!userWalletAddresses || !userWalletAddresses[key]">
                    <div v-b-modal="'add-address-modal' + key" class="btn-add btn mt-2 mb-4 small-shadow">
                      Add {{ key }} Address
                    </div>
                    <b-modal
                      :id="'add-address-modal' + key"
                      :title="`Add ${key} address`"
                      header-text-variant="light"
                      hide-footer
                    >
                      <div>
                        <p>Please enter the address of your {{ key }} wallet below.</p>
                        <b-form @submit.prevent="updateWalletAddress(key)">
                          <b-form-group
                            id="input-group-1"
                            :label="key + ' wallet address:'"
                            label-for="wallet-address"
                          >
                            <b-form-input
                              id="wallet-address"
                              v-model="addresses[key]"
                              type="text"
                              required
                              placeholder="Enter wallet address"
                            />
                          </b-form-group>
                          <div
                            class="text-center"
                          >
                            <b-button
                              type="submit"
                              class="btn-add btn mt-2 mb-2 small-shadow"
                              @click="$bvModal.hide('add-address-modal' + key)"
                            >
                              Submit Address
                            </b-button>
                          </div>
                        </b-form>
                      </div>
                    </b-modal>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="mb-6">
              <h4>
                <b>
                  Balance:
                </b>
                <span class="earning-color">
                  0$
                </span>
              </h4>
            </div>
          </section>
        </div>
      </div>

      <section>
        <h2 class="dark-white">
          <b>
            Reputation
          </b>
        </h2>
        <div v-if="userReputation && Object.keys(userReputation).length" class="row mt-4">
          <div v-for="(rep, key) in userReputation" :key="rep.key" class="col-md-3 mb-4">
            <b-card
              tag="article"
              :style="{ borderBottomColor:communityDataPreview[key].color }"
              class="mb-2 small-shadow text-center bg-dark bg-rep"
            >
              <b-card-text class="text-center mt-4">
                <h4><b class="teaching-color points">{{ parseFloat(rep).toFixed(0) }}</b></h4>
                <h4><b class="teaching-color">REPUTATION</b></h4>
                <h4 class="muted-dark">
                  {{ communityDataPreview[key].name }}
                </h4>
              </b-card-text>
            </b-card>
          </div>
        </div>
        <div v-else class="mb-4">
          <p>
            You didn't earn any reputation in a community yet.
          </p>
        </div>
      </section>

      <section>
        <h2 class="dark-white">
          <b>
            Achievements
          </b>
        </h2>
        <div v-if="userLearningPoints && Object.keys(userLearningPoints).length" class="row mt-4">
          <div v-for="(lp, key) in userLearningPoints" :key="lp.key" class="col-md-3 mb-4">
            <b-card
              :img-src="communityDataPreview[key].imgUrl"
              img-alt="Image"
              img-top
              tag="article"
              rounded="circle"
              class="mb-2 small-shadow text-center bg-dark"
            >
              <b-card-text class="text-center">
                <h4><b class="learning-color">{{ lp }}<span class="muted-dark">/{{ communityDataPreview[key].submissionPoints }}</span></b></h4>
                <h4><b class="learning-color">Learning Points</b></h4>
                <h4 class="muted-dark">
                  {{ communityDataPreview[key].name }}
                </h4>
              </b-card-text>
            </b-card>
          </div>
        </div>
        <div v-else class="mb-4">
          <p>
            You haven't solved a challenge.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars, require-await, prefer-const */
import { mapGetters } from 'vuex'
import Navigation from '@/components/Navigation'
import firebase from '@/plugins/firebase'
import apiJobMixin from '@/mixins/apiJobMixin'

export default {
  components: {
    Navigation
  },
  mixins: [apiJobMixin],
  data() {
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
      user: 'user',
      userBalance: 'userBalance',
      userReputation: 'userReputation',
      userLearningPoints: 'userLearningPoints',
      communityDataPreview: 'content/communityDataPreview'
    })
  },
  watch: {
    // When we have the userdata, we can execute the function.
    user: function (userData) {
      this.getUserWalletAddresses()
      this.getUserVerifications()
    },
    userWalletAddresses: function () {
      this.getPendingPayoutRequests()
    }
  },
  mounted() {
    if (!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0) {
      this.$store.dispatch('content/getCommunityDataPreview')
    }
  },
  created() {
    if (this.user) {
      this.getUserWalletAddresses()
      this.getUserVerifications()
    }
  },
  methods: {
    jobsDone() {
      this.removeErrors()
    },
    // Create a payout request:
    // 1. Get communities with the requested token.
    // 2. Loop over these communties and get the unpaid transactions of the user in these communties.
    // 3. Send the payout request containing the unpaid transactions.
    async createPayoutObject(token) {
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
      if (this.userBalance[token] > totalTransactionPayoutAmount) {
        const unaccountedPayoutAmount = this.userBalance[token] - totalTransactionPayoutAmount
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
        payoutAmount: parseFloat(this.userBalance[token].toFixed(1)),
        tokenFormat: token
      }
      // console.log(payoutPendingObject)
      this.$store.dispatch('payouts/setPayoutRequestPending', payoutPendingObject)
      // This should be optimized it shouldnt have to reload the page to display the new result, but get it from the state.
      this.$router.go()
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
      await firebase.database().ref(`transactions/${communityId}/${userId}`).orderByChild('paid').equalTo(false).once('value').then((snapShot) => {
        transactions = snapShot.val()
      })
      return transactions
    },
    getTransactionIdssAndAmount(transactions) {
      let transactionsAmount = 0
      const transactionIds = []
      if (transactions && Object.values(transactions).length) {
        for (let index = 0; index < Object.values(transactions).length; index++) {
          transactionIds.push(Object.keys(transactions)[index])
          transactionsAmount = transactionsAmount + Object.values(transactions)[index].amount
        }
      }
      return {
        transactionsAmount: transactionsAmount,
        transactionIds: transactionIds
      }
    },
    updateWalletAddress(key) {
      const walletObject = {
        userId: this.user.id,
        walletAddress: this.addresses[key],
        token: key
      }
      this.$store.dispatch('updateWalletAddress', walletObject)
      // This should be optimized it shouldnt have to reload the page to display the new result, but get it from the state.
      this.$router.go()
    },
    updateUserVerifications() {
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
    async getUserWalletAddresses() {
      await firebase.database().ref(`userWallet/${this.user.id}`).once('value').then((snapShot) => {
        this.userWalletAddresses = snapShot.val()
      })
    },
    async getPendingPayoutRequests() {
      await firebase.database().ref(`payoutRequestsPending/${this.user.id}`).once('value').then((snapShot) => {
        this.payoutRequestsPending = snapShot.val()
      })
    },
    async getUserVerifications() {
      await firebase.database().ref(`userVerifications/${this.user.id}`).once('value').then((snapShot) => {
        this.userVerifications = snapShot.val()
      })
      if (this.userVerifications === null) {
        await this.getUserVerificationRequest()
      }
    },
    async getUserVerificationRequest() {
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
  border-radius: .35rem;
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
  border-radius: .35rem;
  padding: 10px 40px;
  font-weight: 700;
}

.btn-edit:hover {
  color: black;
  cursor: pointer;
  background-color: rgba(255,255,255,.3);
}

.btn-add {
  color: black;
  border: 2px solid #64686b;
  background: #64686b;
  border-radius: .35rem;
  padding: 10px 40px;
  font-weight: 700;
}

.btn-add:hover {
  color: black;
  cursor: pointer;
  border: 2px solid white;
  background-color: rgba(255,255,255,.3);
}

.bg-rep{
  border:4px solid rgba(255,255,255,.1);
  border-radius:.32rem;
  padding-bottom: 3em;
}

.bg-black {
  background: black;
}

.notification {
  background: rgba(255,255,255,.9);
  border: none;
  border-left: 6px solid #acb2be;
  border-radius: 0.35rem;
  color: rgba(0,0,0,.7);
  font-style: italic;
  font-weight: bold;
  padding: 1em;
  padding-right: 2em;
  display: inline-block;
}

.overlay-text {
  font-size: 1.4em;
}

.points {
  font-style: italic;
  font-size: 3em;
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
  border-color:#53d1af;
}

.unread a{
  color: #53d1af;
}
</style>
