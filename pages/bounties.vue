<template>
  <div>
    <Navigation />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 col-xl-6 mx-auto mt-4">
          <div
            v-for="openBounty in getOpenBounties()"
            :key="openBounty.id"
            class="bounty mb-4"
          >
            <nuxt-link :to="openBounty.link">
              <h5 v-if="openBounty.typ === 'review'" class="h-dark">
                Review for Submission of {{ openBounty.displayName }}
              </h5>
              <h5 v-else class="h-dark">
                Submission
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
                  {{ openBounty.reward }}$
                </b>
              </div>
              <div v-if="openBounty.hoursLeft">
                Hours left:
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
      user: 'user',
      lcData: 'content/lcData',
      submissions: 'submissions/submissions'
    })
  },
  asyncData({ params }) {
    return firebase.database().ref(`communityDataPreview`).once('value').then((snapShot) => {
      const communityDataPreview = snapShot.val()
      return { communityDataPreview }
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
      const userSubmissions = []
      for (let index = 0; index < this.submissions.length; index++) {
        const element = this.submissions[index]
        // Todo: Exlude submission if user hasn't made a submission to the community yet
        if (!element.submissionPoints) {
          const result = Object.values(this.communityDataPreview).filter((obj) => {
            return obj.slug === element.communityId
          })
          element.typ = 'review'
          element.lcName = result[0].name
          element.link = `/${result[0].slug}/submission/${element['.key']}`
          element.color = result[0].color
          element.reward = result[0].reviewReward
          if (result[0].bountyTime) {
            const endTime = element.date + (result[0].bountyTime * 60 * 60 * 1000)
            element.hoursLeft = Math.round((endTime - Date.now()) / (1000 * 60 * 60))
          } else {
            const endTime = element.date + 168 * 60 * 60 * 1000
            element.hoursLeft = Math.round((endTime - Date.now()) / (1000 * 60 * 60))
          }
          // Exclude submission if its from current user
          // console.log(element)
          if (this.user) {
            if (element.userId !== this.user.id) {
              bounties.push(element)
            }
          }
        }
        if (this.user && element.userId === this.user.id) {
          userSubmissions.push(element.communityId)
        }
      }
      // Get open submissions for user
      for (let index = 0; index < Object.values(this.communityDataPreview).length; index++) {
        // todo change slug to Id
        if (!userSubmissions.includes(Object.values(this.communityDataPreview)[index].slug)) {
          const element = {}
          element.typ = 'submission'
          element.lcName = Object.values(this.communityDataPreview)[index].name
          element.color = Object.values(this.communityDataPreview)[index].color
          element.link = `/${Object.values(this.communityDataPreview)[index].slug}/challenge/`
          element.reward = Object.values(this.communityDataPreview)[index].submissionReward
          bounties.push(element)
        }
      }
      console.log('bounties')
      console.log(bounties)
      return Object.values(bounties)
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
