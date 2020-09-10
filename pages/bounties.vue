<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <div v-if="learningPoints" class="row">
        <div class="col-md-8 col-xl-6 mx-auto mt-4">
          <div
            v-for="openBounty in getOpenBounties()"
            :key="openBounty.id"
            class="bounty mb-4"
          >
            <nuxt-link :to="openBounty.link">
              <h5 v-if="openBounty.typ === 'review'" class="dark-white">
                <b>
                  Feedback for Submission of {{ openBounty.displayName }}
                </b>
              </h5>
              <h5 v-else class="dark-white">
                <b>
                  {{ openBounty.typ }}
                </b>
              </h5>
              <div>
                <b :style="{ color: openBounty.color }">
                  {{ openBounty.lcName }}
                </b>
              </div>
              <div v-if="openBounty.bountyText">
                {{ openBounty.bountyText }}
              </div>
              <div>
                <span class="muted-dark">Reward:</span>
                <b class="dark-white">
                  {{ openBounty.reward }}
                </b>
                <img class="DCN" src="/img/usp_iso_coin_dacade.png" height="18" alt="">
              </div>
              <div v-if="openBounty.hoursLeft">
                <span class="muted-dark">Hours left:</span>
                <b>
                  -{{ openBounty.hoursLeft }}h
                </b>
              </div>
              <div v-if="openBounty.typ === 'review'">
                <span class="muted-dark">Feedback:</span>
                <b v-if="openBounty.reviews">
                  {{ Object.keys(openBounty.reviews).length }}
                </b>
                <b v-else>
                  0
                </b>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars, require-await, no-unused-expressions */
import Navigation from '@/components/Navigation'
import { mapGetters, mapActions, Store } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  components: {
    Navigation
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
      learningPoints: 'user/learningPoints',
      communityDataPreview: 'content/communityDataPreview'
    })
  },
  async asyncData({ params }) {
    let submissions, bountiesDb
    await firebase.database().ref('openSubmissions').once('value').then((snapShot) => {
      submissions = snapShot.val()
    })
    await firebase.database().ref('bounties').once('value').then((snapShot) => {
      bountiesDb = snapShot.val()
    })
    return { submissions, bountiesDb }
  },
  mounted() {
    if ((!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0)) {
      this.getCommunityDataPreview()
    }
  },
  methods: {
    ...mapActions({
      getCommunityDataPreview: 'content/getCommunityDataPreview'
    }),
    getOpenBounties() {
      // Todo: Exlude submission if user hasn't made a submission to the community yet
      const bounties = []
      const userSubmissions = []
      // Get all bounty reviews
      if (this.submissions && Object.keys(this.communityDataPreview).length) {
        // Loop over all submissions to get the submissons that needs a review
        for (let index = 0; index < Object.keys(this.submissions).length; index++) {
          const element = Object.values(this.submissions)[index]
          // Check if the submission was from the current user
          if (this.user && element.userId !== this.user.id) {
            // If there have been reviews already, check if user made no review yet
            if ((element.reviews && !Object.keys(element.reviews).includes(this.user.id)) || !element.reviews) {
              // Get the communityData preview for the submission
              const result = Object.values(this.communityDataPreview).filter((obj) => {
                return obj.slug === element.communityId
              })
              element.typ = 'review'
              // element.feedback = element.reviews
              if (result[0]) {
                element.lcName = result[0].name
                element.link = `/${result[0].slug}/submission/${Object.keys(this.submissions)[index]}`
                element.color = result[0].color
                element.reward = result[0].reviewReward
                const endTime = element.date + (result[0].bountyTime * 60 * 60 * 1000)
                element.hoursLeft = Math.round((endTime - Date.now()) / (1000 * 60 * 60))
                // Check if there is still time left for submission
                if (element.hoursLeft > 0) {
                  bounties.push(element)
                }
              }
            }
          } else {
            const result = Object.values(this.communityDataPreview).filter((obj) => {
              return obj.slug === element.communityId
            })
            userSubmissions.push(result[0].slug)
          }
        }
      }
      if (this.bountiesDb && Object.keys(this.bountiesDb).length) {
        for (let index = 0; index < Object.values(this.bountiesDb).length; index++) {
          const element = {}
          element.typ = Object.values(this.bountiesDb)[index].type
          element.lcName = Object.values(this.bountiesDb)[index].community
          element.color = Object.values(this.bountiesDb)[index].color
          element.link = `${Object.values(this.bountiesDb)[index].link}`
          element.bountyText = Object.values(this.bountiesDb)[index].text
          element.reward = Object.values(this.bountiesDb)[index].reward
          bounties.push(element)
        }
      }
      // Get open submissions for user
      console.log(userSubmissions)
      for (let index = 0; index < Object.values(this.communityDataPreview).length; index++) {
        // todo change slug to Id
        if (!Object.keys(this.learningPoints).includes(Object.keys(this.communityDataPreview)[index]) && !userSubmissions.includes(Object.keys(this.communityDataPreview)[index])) {
          const element = {}
          element.typ = 'Submission'
          element.lcName = Object.values(this.communityDataPreview)[index].name
          element.color = Object.values(this.communityDataPreview)[index].color
          element.link = `/${Object.keys(this.communityDataPreview)[index]}/introduction/`
          element.reward = Object.values(this.communityDataPreview)[index].submissionReward
          bounties.push(element)
        }
      }
      return Object.values(bounties).sort(function (a, b) {
        return a.hoursLeft - b.hoursLeft
      })
    }
  }
}
</script>

<style scoped>
.bounty {
  border: 1.6px solid #00000000;
  border-radius: 0.35rem;
  background: #343b42;
  padding: 1em;
  box-shadow:
    0 1px 3px 0 rgba(0,0,0,.2),
    0 1px 1px 0 rgba(0,0,0,.14),
    0 2px 1px -1px rgba(0,0,0,.12);
}

.bounty a{
  color: #acb2be;
}

.bounty a{
  text-decoration: none;
}

.bounty:hover{
  border: 1.6px solid #53d1af;
  background: #343b42;
  text-decoration: none;
  cursor: pointer;
  box-shadow:
    0 5px 5px -3px rgba(0,0,0,.2),
    0 8px 10px 1px rgba(0,0,0,.14),
    0 3px 14px 2px rgba(0,0,0,.12);
}

.DCN{
  vertical-align: -3px;
  margin-left: -4px;
}

</style>
