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
                Time:
                <b>
                  - 3h
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
  asyncData({ params }) {
    return firebase.database().ref(`communityData`).once('value').then((snapShot) => {
      const communityData = snapShot.val()
      return { communityData }
    })
  },
  computed: {
    ...mapGetters({
      submissions: 'submissions/submissions'
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
  border: 1.6px solid #53d1af;
  border-radius: 0.35rem;
  padding: 1em;
}

.bounty a{
  color: #acb2be;
}

.bounty a{
  text-decoration: none;
}

.bounty:hover{
  background: #53d1af42;
  text-decoration: none;
  cursor: pointer;
  border: none;
  box-shadow:
    0 5px 5px -3px rgba(0,0,0,.2),
    0 8px 10px 1px rgba(0,0,0,.14),
    0 3px 14px 2px rgba(0,0,0,.12);
}

</style>
