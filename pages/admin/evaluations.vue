<template>
  <div>
    <div class="row">
      <div class="offset-md-3 col-lg-6">
        <div class="mb-4">
          <h1>
            <b>
              SUBMISSIONS
            </b>
          </h1>
        </div>
        <div class="mb-4">
          <nuxt-link to="/admin/" class="btn btn-secondary">
            BACK
          </nuxt-link>
        </div>
      </div>
      <div v-if="submissions" class="offset-md-3 col-lg-6">
        <div>
          <b-card
            v-for="( openBounty ) in getOpenBounties()"
            :key="openBounty.id"
            class="mb-4"
            bg-variant="dark"
            text-variant="white"
          >
            <b-card-text>
              <h3>
                {{ openBounty.hoursLeft }} h
              </h3>
              <b :style="{ color: openBounty.color }">
                {{ openBounty.communityId }}
              </b>
              {{ convertDate(openBounty.date) }}
            </b-card-text>
            <b-card-text class="mb-4">
              {{ openBounty.displayName }}:
              <span class="muted-dark">
                {{ contentPreview(openBounty.text) }}..
              </span>
              <div v-if="openBounty.reviews">
                <b class="muted">
                  Feedback:
                </b>
                <b class="teaching-color">
                  {{ Object.keys(openBounty.reviews).length }}
                </b>
              </div>
            </b-card-text>
            <nuxt-link class="btn-dark mt-2" :to="openBounty.link">
              See Submission
            </nuxt-link>
          </b-card>
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
      submissions: null
    }
  },
  computed: {
    ...mapGetters({
      communityDataPreview: 'content/communityDataPreview'
    })
  },
  mounted() {
    if ((!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0)) {
      this.getCommunityDataPreview()
    }
  },
  created() {
    this.getSubmissions()
  },
  methods: {
    ...mapActions({
      getCommunityDataPreview: 'content/getCommunityDataPreview'
    }),
    back() {
      this.$router.back()
    },
    convertDate(date) {
      return util.convertDate(date)
    },
    contentPreview(content) {
      return util.contentPreview(content)
    },
    async getSubmissions() {
      await firebase.database().ref(`openSubmissions`).once('value').then((snapShot) => {
        this.submissions = snapShot.val()
      })
    },
    getOpenBounties() {
      const bounties = []
      // Get all bounty reviews
      if (this.submissions && Object.keys(this.communityDataPreview).length) {
        // Loop over all submissions to get the submissons that needs a review
        for (let index = 0; index < Object.keys(this.submissions).length; index++) {
          const element = Object.values(this.submissions)[index]
          // Get the communityData preview for the submission
          const result = Object.values(this.communityDataPreview).filter((obj) => {
            return obj.slug === element.communityId
          })
          element.typ = 'review'
          // element.feedback = element.reviews
          if (result[0]) {
            element.lcName = result[0].name
            element.link = `/admin/evaluation/${element.communityId}/${Object.keys(this.submissions)[index]}`
            element.color = result[0].color
            element.reward = result[0].reviewReward
            const endTime = element.date + (result[0].bountyTime * 60 * 60 * 1000)
            element.hoursLeft = Math.round((endTime - Date.now()) / (1000 * 60 * 60))
            bounties.push(element)
            // if (element.hoursLeft < 0) {
            //   bounties.push(element)
            // }
          }
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
.row {
  margin: 3em;
}
</style>
