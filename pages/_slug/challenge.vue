<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-8">
        <div class="site-wraper">
          <p><i class="dacade-note">{{ lcData.challengeDescription }}</i></p>

          <h4 class="h-dark">
            Challenge:
          </h4>
          <div v-html="lcData.challenge" />

          <div v-if="lcData.challengeExampleSubmissionId">
            <a class="example-button btn" @click="SendToExample(lcData.challengeExampleSubmissionId)">See example</a>
          </div>

          <div class="learning-points-box">
            <h5 class="mb-2">
              <span class="learning-points">Earn {{ lcData.challengePoints }} Learning Points</span>
            </h5>
            <b>Rating criteria:</b>
            <div v-for="criteria in lcData.challengeRatingCriteria" :key="criteria.key">
              <span>✓ {{ criteria }}</span>
            </div>
          </div>

          <div class="challenge-reward mb-6">
            <h5>
              +{{ lcData.submissionPrice }}$ for challenge
            </h5>
            <span>
              In order to earn <b>{{ lcData.submissionPrice }}$</b>
              in {{ lcData.priceFormat }} you must get at least <b>70%</b>
              of the Learning Points from this challenge.
            </span>
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
            {{ getUserSubmission }}

            <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{ path: communityPath($route.params.slug) }">
              See Submissions
            </nuxt-link>
          </div>

          <div v-else>
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                v-if="lcData.challengeFormat[0].text"
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
                v-if="lcData.challengeFormat[0].githubLink"
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
              <b-button type="submit" variant="primary">
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
        lCId: null,
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
      lcData: 'content/lcData'
    }),
    getUserSubmission() {
      let userSubmission = null
      for (let index = 0; index < this.submissions.length; index++) {
        if (this.submissions[index].userId === this.user.id) {
          if (this.submissions[index].lCId === this.lcData.id) {
            userSubmission = this.submissions[index]
          }
        }
      }
      return userSubmission
    }
  },
  created() {
    this.getSubmissions()
  },
  methods: {
    ...mapActions({
      getSubmissions: 'submissions/getSubmissions'
    }),
    communityPath(slug) {
      return `/${slug}/submissions`
    },
    onSubmit() {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.submission.lCId = this.lcData.id
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
  color: #53D1AF;
  border: 1px solid #53D1AF;
  border-radius:.25rem;
  /* color:rgba(0,0,0,.8); */
  margin:2em 0;
  margin-bottom:1em;
  padding: 1em;
}
</style>
