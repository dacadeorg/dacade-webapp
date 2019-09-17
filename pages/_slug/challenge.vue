<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-8">
        <div class="site-wraper">
          <p v-if="communityData.challengeDescription">
            <i class="dacade-note">{{ communityData.challengeDescription }}</i>
          </p>

          <h4 class="h-dark">
            Challenge:
          </h4>
          <div v-html="communityData.challenge" />

          <div v-if="communityData.challengeExampleSubmissionId">
            <span class="btn btn-dark-outline mt-4 mb-4" @click="SendToExample(communityData.challengeExampleSubmissionId)">See example</span>
          </div>

          <div class="learning-points-box mb-6">
            <h5 class="learning-color">
              <b>
                Earn {{ communityData.submissionPrice }}$
              </b>
            </h5>
            <p class="mb-4">
              In order to earn <b>{{ communityData.submissionPrice }}$</b>
              in {{ communityData.priceFormat }} you must get at least <b>70%</b>
              of the Learning Points from this challenge.
            </p>
            <b>Rating criteria:</b>
            <div v-for="criteria in communityData.challengeRatingCriteria" :key="criteria.key">
              <span>✓ {{ criteria }}</span>
            </div>
          </div>

          <!-- <div class="submissions-earnings">
            There were already
            <span>
                <b>{{getSubmissionFromLcId()[0]}}</b> Submissions
            </span>
            issued in this community and
            <span>
            </span>
                <b>{{getSubmissionFromLcId()[1]}}$</b> earned.
            </span>
          </div> -->

          <div v-if="getUserSubmission">
            <div v-if="getEvaluationsDb">
              Your submission was evaluated click on the link to see the evaluation and feedback of your peers.
            </div>
            <div v-else>
              Thank you for your submission! It will take on average 48 hours until you will get an evaluation of your submission and feedback from your peers.
            </div>
            <nuxt-link
              class="btn btn-outline-primary btn-lg btn-block mt-4"
              :to="{path: submissionPath($route.params.slug, getUserSubmission['.key']) }"
            >
              See your Submission
            </nuxt-link>
            <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{ path: communityPath($route.params.slug) }">
              See Peer Submissions
            </nuxt-link>
          </div>

          <div v-else>
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                v-if="communityData.challengeFormat[0].text"
                id="input-group-1"
              >
                <h5 class="h-dark">
                  Submission Text
                </h5>
                <b-form-textarea
                  id="input-1"
                  v-model="submission.text"
                  v-validate="'required|min:20'"
                  type="text"
                  name="submission"
                  required
                  placeholder="Enter Submission Text"
                  rows="4"
                />
                <p v-show="errors.has('submission')" class="help is-danger">
                  {{ errors.first('submission') }}
                </p>
              </b-form-group>

              <b-form-group
                v-if="communityData.challengeFormat[0].githubLink"
                id="input-group-1"
              >
                <h5 class="h-dark">
                  GitHub Link
                </h5>
                <b-form-input
                  id="input-2"
                  v-model="submission.githubLink"
                  v-validate="'required|min:10'"
                  type="text"
                  name="submission"
                  required
                  placeholder="Enter Github Link"
                />
                <p v-show="errors.has('submission')" class="help is-danger">
                  {{ errors.first('submission') }}
                </p>
              </b-form-group>
              <b-button type="submit" variant="primary" class="mt-2">
                Submit
              </b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters, mapActions } from 'vuex'
import apiJobMixin from '@/mixins/apiJobMixin'

export default {
  mixins: [apiJobMixin],
  data() {
    return {
      submission: {
        text: null,
        communityId: null,
        displayName: null,
        userId: null,
        date: Date.now()
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      submissions: 'submissions/submissions',
      communityData: 'content/communityData',
      evaluations: 'submissions/evaluations'
    }),
    getUserSubmission() {
      let userSubmission = null
      console.log(this.user)
      for (let index = 0; index < this.submissions.length; index++) {
        if (this.user &&
        this.user.id &&
        this.submissions[index].userId === this.user.id &&
        this.submissions[index].communityId === this.communityData.id) {
          userSubmission = this.submissions[index]
        }
      }
      return userSubmission
    },
    getEvaluationsDb() {
      let evaluationsNew = null
      for (let index = 0; index < this.evaluations.length; index++) {
        if (this.evaluations[index].submissionId === this.getUserSubmission['.key']) {
          evaluationsNew = this.evaluations[index]
        }
      }
      return evaluationsNew
    }
  },
  created() {
    this.getSubmissions()
    this.getEvaluations()
  },
  methods: {
    ...mapActions({
      getSubmissions: 'submissions/getSubmissions',
      getEvaluations: 'submissions/getEvaluations'
    }),
    communityPath(slug) {
      return `/${slug}/submissions`
    },
    submissionPath(slug, submissionKey) {
      return `/${slug}/submission/${submissionKey}`
    },
    onSubmit() {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.submission.communityId = this.communityData.id
            this.submission.displayName = this.user.displayName
            this.submission.userId = this.user.id
            this.$store.dispatch('submissions/createSubmission', this.submission)
          }
        })
    },
    jobsDone() {
      this.removeErrors()
    }
  }
}
</script>
<style scoped>
.challenge-reward {
  border: 1px solid #fab34b;
  border-radius: .25rem;
  padding: 1em;
  color: #fab34b;
}
.challenge-reward h5{
  color:#fab34b;
  font-weight:bold;
}
.challenge-reward img{
  padding-bottom: 0.6em;
  width:30px;
}
.example-button{
  border: 1px solid #53d1af;
  color: #53d1af;
  margin: 1em 0;
}
.example-button a{
  color: #53d1af!important;
}
.learning-points{
  color: #53D1AF;
  font-weight: 700;
}

.learning-points-box {
  border: 1px solid #53D1AF;
  border-radius:.25rem;
  /* color:rgba(0,0,0,.8); */
  margin:2em 0;
  margin-bottom:1em;
  padding: 1em;
}
</style>
