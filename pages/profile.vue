<template>
  <div>
    <div
      v-if="Object.keys(communityDataPreview).length != 0 && user"
      class="container"
    >
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
          <h4 v-if="userVerifications" class="muted-dark">
            <i class="fa fa-check" aria-hidden="true" />
            <b>Verified</b>
          </h4>
          <balance />
        </div>
      </div>

      <reputation />

      <achievements />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars, require-await, prefer-const */
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'
import Balance from '@/components/profile/Balance.vue'
import Achievements from '@/components/profile/Achievements.vue'
import Reputation from '@/components/profile/Reputation.vue'

export default {
  components: {
    Balance,
    Achievements,
    Reputation
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
      communityDataPreview: 'content/communityDataPreview'
    })
  },
  watch: {
    // When user changes and we have the userdata, we can execute the function.
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
      this.getUserWalletAddresses()
      this.getUserVerifications()
      this.$store.dispatch('content/getCommunityDataPreview')
    }
  },
  methods: {
    jobsDone () {
      this.removeErrors()
    },
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
.bg-rep {
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.32rem;
  padding-bottom: 3em;
}

/* .bg-black {
  background: black;
}

/* .DCN-icon {
  vertical-align: -2px;
  margin-left: -4px;
} */

/* .overlay-text {
  font-size: 1.4em;
} */

.points {
  font-style: italic;
  font-size: 3em;
}

/* .unread {
  color: #53d1af;
  border-color: #53d1af;
}

.unread a {
  color: #53d1af;
} */
</style>
