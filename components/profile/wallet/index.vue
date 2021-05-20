/* eslint-disable no-trailing-spaces */ /* eslint-disable no-trailing-spaces */
<template>
  <div>
    <div
      v-if="
        userWalletAddresses &&
        userWalletAddresses[coinName] &&
        userVerifications &&
        userVerifications['socialMedia']
      "
    >
      <!-- If the user entered a wallet address for the token and is verified
                      , they can change the address and make a payout request -->
      <h4 class="muted-dark">
        {{ coinName }} wallet address: {{ userWalletAddresses[coinName] }}
      </h4>
      <div
        v-b-modal="'add-address-modal2' + coinName"
        class="btn-edit btn mt-2 mb-2 muted-dark small-shadow"
      >
        Change {{ coinName }} Address
      </div>
      <user-address
        :user-id="'add-address-modal2' + coinName"
        :coin-name="coinName"
        :coin-name-wallet-address="`New ${coinName} wallet address:`"
        :modal="'add-address-modal2' + coinName"
        class="btn-edit btn mt-2 mb-2 muted-dark small-shadow"
        :message="`Change ${coinName} Address`"
        :submission-message="'Submit new address'"
        :title="'Change Address'"
        :text="''"
        :wallet-address="userWalletAddresses[coinName]"
        @update="getUserWalletAddresses()"
      />
      <payout
        :coin-name="coinName"
        :user-address="userWalletAddresses"
        :on-get-user-address="getUserWalletAddresses"
        :pending-request="payoutRequestsPending"
      />
    </div>
    <!-- If the user isn't verified, they can add a verification request -->
    <div v-else-if="!userVerifications || !userVerifications['socialMedia']">
      <verification
        :verification-pending="userVerificationPendig"
        :coin-name="coinName"
      />
    </div>
    <!-- If the user didn't enter a wallet address for the token, they can add a new address -->
    <div v-else-if="!userWalletAddresses || !userWalletAddresses[coinName]">
      <user-address
        :id="'add-address-modal' + coinName"
        :coin-name-wallet-address="coinName + ' wallet address:'"
        :modal="'add-address-modal' + coinName"
        :text="`Please enter the address of your ${coinName} wallet below.`"
        class="btn-add btn mt-2 mb-4 small-shadow"
        :message="`Add ${coinName} Address`"
        :submission-message="'Submit address'"
        :title="`Add ${coinName} address`"
        :wallet-address="userWalletAddresses[coinName]"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console, no-unused-vars, require-await, prefer-const */
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'
import UserAddress from '@/components/profile/wallet/forms/UserAddress.vue'
import Payout from '@/components/profile/wallet/Payout.vue'
import Verification from '@/components/profile/wallet/Verification.vue'

export default {
  components: {
    UserAddress,
    Payout,
    Verification,
  },
  props: {
    coinName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      inputUserVerifications: [],
      userWalletAddresses: null, // string
      userVerifications: null, //
      userVerificationPendig: false,
      payoutRequestsPending: null, //
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/data',
      balance: 'user/balance',
      communityDataPreview: 'content/communityDataPreview',
    }),
  },
  watch: {
    // When we have the userdata, we can execute the function.
    user(userData) {
      if (userData) {
        this.getUserWalletAddresses()
        this.getUserVerifications()
      }
    },
    userWalletAddresses() {
      this.getPendingPayoutRequests()
    },
  },
  created() {
    if (this.user) {
      // data was sometimes already there, then no watch needed
      this.getUserWalletAddresses()
      this.getUserVerifications()
      this.$store.dispatch('content/getCommunityDataPreview')
    }
  },
  methods: {
    jobsDone() {
      this.removeErrors()
    },
    // maybe get it through the store and not directly from the database?
    async getUserWalletAddresses() {
      await firebase
        .database()
        .ref(`userWallet/${this.user.id}`)
        .once('value')
        .then((snapShot) => {
          this.userWalletAddresses = snapShot.val()
        })
    },
    async getPendingPayoutRequests() {
      await firebase
        .database()
        .ref(`payoutRequestsPending/${this.user.id}`)
        .once('value')
        .then((snapShot) => {
          this.payoutRequestsPending = snapShot.val()
        })
    },
    async getUserVerifications() {
      await firebase
        .database()
        .ref(`userVerifications/${this.user.id}`)
        .once('value')
        .then((snapShot) => {
          this.userVerifications = snapShot.val()
        })
      if (this.userVerifications === null) {
        await this.getUserVerificationRequest()
      }
    },
    async getUserVerificationRequest() {
      await firebase
        .database()
        .ref(`userVerificationRequest/${this.user.id}/socialMedia`)
        .once('value')
        .then((snapShot) => {
          if (snapShot.val()) {
            this.userVerificationPendig = true
          }
        })
    },
  },
}
</script>

<style scoped>
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
</style>
