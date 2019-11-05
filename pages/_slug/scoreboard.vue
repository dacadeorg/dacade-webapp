<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="site-wraper">
          <div class="mb-6">
            <h3 class="white text-center">
              <b>
                Scoreboard
              </b>
            </h3>
          </div>
          <div v-if="scoreboard">
            <div class="row mb-2 muted">
              <div class="col col-md-2 mb-3 text-center">
                Place
              </div>
              <div class="col col-md-6 mb-3 offset-md-1 text-center">
                Name
              </div>
              <div class="col col-md-2 mb-3 offset-md-1 text-center">
                Reputation
              </div>
            </div>
            <div
              v-for=" (user, index) in reversedArr"
              :key="user.key"
              class="row mb-4"
            >
              <div v-if="index < 3" class="col col-md-2 mb-3 place">
                <div
                  v-if="index == 0"
                  style="color: white; text-shadow: 0 0 2px #fff, 0 0 4px #ffffff90, 0 0 20px #ffffff50;"
                >
                  #1
                </div>
                <div v-if="index == 1">
                  {{ index+1 }}ND
                </div>
                <div v-if="index == 2">
                  {{ index+1 }}RD
                </div>
              </div>
              <div v-else class="col col-md-2 mb-3 place muted">
                {{ index+1 }}TH
              </div>
              <div
                v-if="index == 0"
                class="col col-md-6 mb-3 name offset-md-1 big-shadow"
                style="color: white; text-shadow: 0 0 2px #fff, 0 0 4px #ffffff90, 0 0 20px #ffffff50;"
                :style="{ borderColor: communityDataPreview[$route.params.slug].color }"
              >
                {{ user.displayName }}
                <!-- {{ communityDataPreview[$route.params.slug].color }} -->
              </div>
              <div
                v-else
                class="col col-md-6 mb-3 name offset-md-1 small-shadow-no-hover"
                :style="{ borderColor: communityDataPreview[$route.params.slug].color }"
              >
                {{ user.displayName }}
              </div>
              <div class="col col-md-2 mb-3 rep offset-md-1 teaching-color">
                <span v-if="user.reputation">
                  <span v-if="index == 0" style="text-shadow: #9c58ff 0px 0px 2px, #9c58ff50 0px 0px 4px, #9c58ff30 0px 0px 20px;">
                    {{ parseFloat(user.reputation).toFixed(0) }}
                  </span>
                  <span v-else>
                    {{ parseFloat(user.reputation).toFixed(0) }}
                  </span>
                </span>
                <span v-else>
                  0
                </span>
              </div>
            </div>
            <!-- <b-table striped hover :items="reversedArr"></b-table> -->
          </div>
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
      scoreboard: null
    }
  },
  computed: {
    ...mapGetters({
      communityDataPreview: 'content/communityDataPreview'
    }),
    reversedArr() {
      return this.scoreboard.slice().reverse()
    }
  },
  mounted() {
    if ((!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0)) {
      this.getCommunityDataPreview()
    }
  },
  created() {
    this.getScoreBoard()
  },
  methods: {
    ...mapActions({
      getCommunityDataPreview: 'content/getCommunityDataPreview'
    }),
    back() {
      this.$router.back()
    },
    async getScoreBoard() {
      const route = this.$route.params.slug
      const scoreboard = []
      await firebase.database().ref(`reputation`).orderByChild(route).limitToLast(10).once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          const element = {}
          const key = childSnapshot.key
          const rep = childSnapshot.val()
          firebase.database().ref(`users/${key}`).once('value')
            .then((snapShot2) => {
              const displayName = snapShot2.val()
              element.displayName = displayName.displayName
              element.reputation = rep[route]
              scoreboard.push(element)
            })
        })
      })
      this.scoreboard = scoreboard
    }
  }
}
</script>
<style scoped>
.place {
  border-radius: 0.34rem;
  padding: 0.5em;
  display: inline-block;
  text-align: center;
  font-weight: 900;
  font-size: 19px;
}
.name {
  border: 1px solid white;
  border-radius: 0.34rem;
  padding: 0.5em;
  display: inline-block;
  text-align: center;
  font-weight: 900;
  font-size: 19px;
  color: white;
  background-image: linear-gradient(0.25turn, var(--gray-dark), #22262b);
  border:none;
  border-right: 2px solid white;
  border-left: 2px solid white;
}
.rep {
  font-weight: 900;
  padding: 0.5em;
  font-size: 19px;
  text-align: center;
}
</style>
