<template>
  <div>
    <Navigation />
    <div v-if="user" class="container">
      <div class="row">
        <div class="col-md-4 mt-4">
          <h2 class="h-dark">
            {{ user.displayName }}
          </h2>
          <h4 class="muted-dark">
            {{ user.email }}
          </h4>
          <h4>
            <b>
              Balance:
            </b>
          </h4>
          {{ user }}
          <h4 v-for="(balance, key) in getBalance()" :key="balance.id">
            {{ key }} token:
            <span class="earning-color">
              {{ balance }}$
            </span>
          </h4>
          <div v-b-modal.modal-cashout class="btn-cash-out btn mt-2 mb-6">
            Cash out
          </div>
          <b-modal
            id="modal-cashout"
            title="Cash Out"
            header-text-variant="light"
            hide-footer
          >
            <p>
              In order to combat fraud by users who have multiple accounts, we need to verify your identity. Please make a post with your dacade username on an active social media account (active meaning the account already exists since a longer period of time and has active interaction with other people) and send us the link to the post. It could look something like this: “Verifying my dacade.org username moritzfelipe”.
              If you haven't done this already.
            </p>
            <p>
              In order to send you the tokens, you must send us the address of an AE Main net Token compatible wallet. You can use the base app under https://base.aepps.com or install the airgap wallet from https://airgap.it/. Ot an ethereum address if you want to cash out ethereum token.
              ⚠️ It takes on average two days until your email will be answered. Thank you for your patience.
            </p>
            <p>
              Please send your address and verfication link to moritz@dacade.org from the email address you used to register on dacade.org
            </p>
          </b-modal>
        </div>
      </div>

      <h2 class="h-dark mb-4">Reputation</h2>

      <div class="row">
        <div v-for="(community) in communityDataPreview" :key="community.key" class="col-md-3 mb-4">
          <b-card
            overlay=""
            :img-src="community.imgUrl"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 30rem;"
            class="mb-2 small-shadow text-center bg-black"
          >
            <b-card-text class="text-center mt-4">
                <h2><b class="overlay-text teaching-color">{{ getReputation(community.slug) }} REP</b></h2>
            </b-card-text>
          </b-card>
        </div>
      </div>

      <!-- <h2 class="h-dark mb-4 achievements">Achievements</h2>

      <div class="row">
        <div v-for="(community) in communityDataPreview" :key="community.key" class="col-md-3 mb-4">
          <b-card
            :header="community.name"
            tag="article"
            style="max-width: 30rem;"
            class="mb-2 small-shadow text-center bg-dark"
          >
            <b-card-text class="text-center">
                <h2><b class="teaching-color">{{ getLearningPoints(community.slug) }} REP</b></h2>
            </b-card-text>
          </b-card>
        </div>
      </div> -->

    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import Navigation from '@/components/Navigation'
import { mapGetters } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  components: {
    Navigation
  },
  asyncData({ params }) {
    return firebase.database().ref(`communityDataPreview`).once('value').then((snapShot) => {
      const communityDataPreview = snapShot.val()
      return { communityDataPreview }
    })
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    getBalance() {
      let balance = 0
      if (this.user && this.user.balance) {
        for (const key in this.user.balance) {
          balance = balance + this.user.balance[key]
        }
      }
      return balance
    },
    getReputation(communityId) {
      let reputation = 0
      if (this.user && this.user.reputation && this.user.reputation[communityId]) {
        reputation = this.user.reputation[communityId]
      }
      return reputation
    },
    getLearningPoints(communityId) {
      const learningPoints = 0
      // if (this.user.data[communityId]) {
      //   if (this.user.data[communityId].learningPoints) {
      //     learningPoints = this.user.data[communityId].learningPoints
      //   }
      // }
      return learningPoints
    }
  }
}
</script>

<style scoped>
.btn-cash-out {
  color: #ffcc00;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: none;
  border: 1.6px solid #ffcc00;
  border-radius: .35rem;
  padding: 10px 40px;
  font-weight: 700;
}
.btn-cash-out:hover {
  color: black;
  cursor: pointer;
  background-color: #ffcc00;
}
.btn-edit {
  color: rgba(255,255,255,.3);
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: none;
  border: 1.6px solid rgba(255,255,255,.3);
  border-radius: .35rem;
  padding: 10px 40px;
  font-weight: 700;
}
.btn-edit:hover{
  color: black;
  cursor: pointer;
  background-color: rgba(255,255,255,.3);
}

.card{
  border:none;
}

.bg-black {
  background: black;
}

.card-img-top{
  opacity: .3;
}

.notification {
  border: 1px solid grey;
  border-radius: 0.35rem;
  padding: 1em;
}

.notification:hover {
  background: #343b42;
  text-decoration: none;
}

.overlay-text{
  font-size: 1.4em;
}

.unread {
  color: #53d1af;
  border-color:#53d1af;
}

.unread a{
  color: #53d1af;
}
</style>
