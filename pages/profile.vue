<template>
  <div>
    <Navigation />
    <div v-if="Object.keys(communityDataPreview).length != 0 && user" class="container">
      <div class="row">
        <div class="col-md-4 mt-4">
          <h2 class="dark-white">
            <b>
              {{ user.displayName }}
            </b>
          </h2>
          <h4 class="muted-dark">
            {{ user.email }}
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
              <h4 v-for="(balance, key) in userBalance" :key="balance.id">
                {{ key }} token:
                <b class="earning-color">
                  {{ parseFloat(balance).toFixed(0) }}$
                </b>
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
/* eslint-disable no-console */
import Navigation from '@/components/Navigation'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navigation
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
  mounted() {
    if (!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0) {
      this.$store.dispatch('content/getCommunityDataPreview')
    }
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

.bg-rep{
  border:4px solid rgba(255,255,255,.1);
  border-radius:.32rem;
  padding-bottom: 3em;
}

.bg-black {
  background: black;
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

.points {
  font-style: italic;
  font-size: 3em;
}

.unread {
  color: #53d1af;
  border-color:#53d1af;
}

.unread a{
  color: #53d1af;
}
</style>
