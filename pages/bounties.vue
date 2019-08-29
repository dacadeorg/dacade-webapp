<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 col-xl-4 mx-auto mt-4">
          <div
            v-for="openBounty in getOpenBounties()"
            :key="openBounty.id"
            class="bounty mb-4"
          >
            <nuxt-link :to="openBounty.link">
              <h5 class="h-dark">
                Review for Submission of {{ openBounty.displayName }}
              </h5>
              <div>
                Community:
                <b :style="{ color: openBounty.color }">
                  {{ openBounty.lcName }}
                </b>
              </div>
              <div>
                Reward:
                <b class="earning-color">
                  {{ openBounty.reviewReward }}$
                </b>
              </div>
              <div>
                Time left:
                <b>
                  -{{ openBounty.hoursLeft }}h
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
/* eslint-disable no-console */
import Navigation from '@/components/Navigation'
import firebase from '@/plugins/firebase'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({
      submissions: 'submissions/submissions'
    })
  },
  asyncData({ params }) {
    return firebase.database().ref(`communityData`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      return { communityData }
    })
  },
  created() {
    this.getSubmissions()
  },
  methods: {
    ...mapActions({
      getSubmissions: 'submissions/getSubmissions'
    }),
    getOpenBounties() {
      const bounties = []
      for (let index = 0; index < this.submissions.length; index++) {
        const element = this.submissions[index]
        if (!element.submissionPoints) {
          const result = Object.values(this.communityData).filter((obj) => {
            return obj.id === element.lCId
          })
          element.lcName = result[0].name
          element.link = `/${result[0].slug}/submission/${element['.key']}`
          element.color = result[0].color
          element.reviewReward = result[0].reviewReward
          const endTime = element.date + 48 * 60 * 60 * 1000
          element.hoursLeft = Math.round((endTime - Date.now()) / (1000 * 60 * 60))
          bounties.push(element)
        }
      }
      return Object.values(bounties).reverse()
    }
  }
}
</script>

<style scoped>
.bounty {
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

</style>
