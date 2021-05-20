<template>
  <div>
    <div class="container-fluid">
      <div v-if="learningPoints" class="row">
        <div class="col-md-8 col-xl-6 mx-auto mt-4">
          <Bounty
            v-for="openBounty in bounties"
            :key="openBounty.id"
            :bounty="openBounty"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars, require-await, no-unused-expressions */
import { mapGetters, mapActions, Store } from 'vuex'
import firebase from '@/plugins/firebase'
import Bounty from '@/components/cards/Bounty'

export default {
  components: {
    Bounty,
  },
  data() {
    return {
      bounties: [],
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/data',
      learningPoints: 'user/learningPoints',
      communityDataPreview: 'content/communityDataPreview',
    }),
  },
  async asyncData({ params }) {
    let submissions, bountiesDb
    await firebase
      .database()
      .ref('openSubmissions')
      .once('value')
      .then((snapShot) => {
        submissions = snapShot.val()
      })
    await firebase
      .database()
      .ref('bounties')
      .once('value')
      .then((snapShot) => {
        bountiesDb = snapShot.val()
      })
    return { submissions, bountiesDb }
  },
  created() {
    this.getCommunityDataPreview().then(() => {
      this.getCommunityDataPreview().then(() => {
        this.getOpenBounties()
      })
    })
  },
  methods: {
    ...mapActions({
      getCommunityDataPreview: 'content/getCommunityDataPreview',
    }),
    getOpenBounties() {
      // Todo: Exlude submission if user hasn't made a submission to the community yet
      const bounties = []
      const userSubmissions = []
      // Get all bounty reviews
      if (this.submissions && Object.keys(this.communityDataPreview).length) {
        // Loop over all submissions to get the submissons that needs a review
        for (
          let index = 0;
          index < Object.keys(this.submissions).length;
          index++
        ) {
          const element = Object.values(this.submissions)[index]
          // Check if the submission was from the current user
          if (this.user && element.userId !== this.user.id) {
            // If there have been reviews already, check if user made no review yet
            if (
              (element.reviews &&
                !Object.keys(element.reviews).includes(this.user.id)) ||
              !element.reviews
            ) {
              // Get the communityData preview for the submission
              const result = Object.values(this.communityDataPreview).filter(
                (obj) => {
                  return obj.slug === element.communityId
                }
              )
              element.typ = 'review'
              // element.feedback = element.reviews
              if (result[0]) {
                element.lcName = result[0].name
                element.link = `/${result[0].slug}/submission/${
                  Object.keys(this.submissions)[index]
                }`
                element.color = result[0].color
                element.reward = result[0].reviewReward
                const endTime =
                  element.date + result[0].bountyTime * 60 * 60 * 1000
                element.hoursLeft = Math.round(
                  (endTime - Date.now()) / (1000 * 60 * 60)
                )
                element.endTime = endTime
                // Check if there is still time left for submission
                if (element.hoursLeft > 0) {
                  bounties.push(element)
                }
              }
            }
          } else {
            const result = Object.values(this.communityDataPreview).filter(
              (obj) => {
                return obj.slug === element.communityId
              }
            )
            userSubmissions.push(result[0].slug)
          }
        }
      }
      if (this.bountiesDb && Object.keys(this.bountiesDb).length) {
        for (
          let index = 0;
          index < Object.values(this.bountiesDb).length;
          index++
        ) {
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
      for (
        let index = 0;
        index < Object.values(this.communityDataPreview).length;
        index++
      ) {
        // todo change slug to Id
        if (
          !Object.keys(this.learningPoints).includes(
            Object.keys(this.communityDataPreview)[index]
          ) &&
          !userSubmissions.includes(
            Object.keys(this.communityDataPreview)[index]
          )
        ) {
          const element = {}
          element.typ = 'Submission'
          element.lcName = Object.values(this.communityDataPreview)[index].name
          element.color = Object.values(this.communityDataPreview)[index].color
          element.link = `/${
            Object.keys(this.communityDataPreview)[index]
          }/introduction/`
          element.reward = Object.values(this.communityDataPreview)[
            index
          ].submissionReward
          bounties.push(element)
        }
      }
      this.bounties = Object.values(bounties).sort(function (a, b) {
        return a.hoursLeft - b.hoursLeft
      })
    },
    countDown(endTime) {
      console.log(endTime)

      // Get today's date and time
      const now = new Date().getTime()

      // Find the distance between now and the count down date
      const distance = endTime - now
      let countDown = {}
      const x = setInterval(function () {
        // Time calculations for days, hours, minutes and seconds
        countDown = {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        }
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x)
          countDown = {}
        }
      }, 1000)
      return countDown
    },
  },
}
</script>
