<template>
  <div class="row">
    <div class="col-lg-8">
      <div class="site-wraper">
        <p v-if="communityData.challengeDescription">
          <i class="dacade-note muted-dark">{{ communityData.challengeDescription }}</i>
        </p>

        <section class="mb-4">
          <h4 class="white">
            <b>
              Challenge:
            </b>
          </h4>
          <div v-html="communityData.challenge" />
        </section>
        <!-- <div v-if="communityData.challengeExampleSubmissionId">
          <span class="btn btn-dark-outline mt-4 mb-4" @click="SendToExample(communityData.challengeExampleSubmissionId)">See example</span>
        </div> -->

        <section v-if="communityData.submissionPrice>0">
          <h5 class="white">
            <b>
              Earn {{ communityData.submissionPrice }}$
            </b>
          </h5>
          <p class="mb-4">
            In order to earn <b class="earning-color">{{ communityData.submissionPrice }}$</b>
            in {{ communityData.priceFormat }} token you must get at least <b class="learning-color">{{ ((communityData.challengeThreshold * 0.01) * communityData.challengePoints).toFixed(0) }}</b>
            out of <b class="learning-color muted">{{ communityData.challengePoints }}</b> Learning Points in this challenge.
          </p>
        </section>

        <section>
          <h5 class="white mb-3">
            <strong>
              Rating Rubric:
            </strong>
          </h5>
          <div class="learning-points-box mb-6">
            <div v-for="(evaluationRating, index) in communityData.challengeRubric" :key="index" class="mb-2">
              <div class="dark-white mb-1">
                <b>
                  {{ evaluationRating.text }}:
                </b>
              </div>
              <div class="row">
                <div
                  v-for="rubric in evaluationRating.rubric"
                  :key="rubric.key"
                  class="col-md-3 col-6 mb-2"
                >
                  <div class="learning-color fs-1">
                    <b>
                      {{ rubric.points }} LP
                    </b>
                  </div>
                  <div class="text-left fs-08">
                    {{ rubric.text }}
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-for="criteria in communityData.challengeRatingCriteria" :key="criteria.key">
              <span>✓ {{ criteria }}</span>
            </div> -->
          </div>
        </section>

        <div v-if="submissionDb">
          <div v-if="Object.values(submissionDb)[0].submissionPoints != null">
            Your submission was evaluated click on the link to see the evaluation and feedback of your peers.
          </div>
          <div v-else>
            <div>
              Thank you for your submission! It will take on average {{ communityData.bountyTime }} hours until you will get an evaluation of your submission,
              you will get feedback from your peers earlier.
            </div>
          </div>
          <nuxt-link
            class="btn btn-outline-primary btn-lg btn-block mt-4"
            :to="{path: submissionPath($route.params.slug, Object.keys(submissionDb)) }"
          >
            See your Submission
          </nuxt-link>
          <nuxt-link class="btn btn-primary btn-lg btn-block" :to="{ path: communityPath($route.params.slug) }">
            See Peer Submissions
          </nuxt-link>
        </div>

        <div v-else>
          <ValidationObserver v-slot="{ invalid, passes }">
            <b-form @submit.prevent="passes(onSubmit)">
              <b-form-group
                v-if="communityData.challengeFormat[0].text"
                id="input-group-1"
              >
                <h5 class="dark-white">
                  <b>Submission Text</b>
                </h5>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="submission text"
                  rules="required|min:20"
                >
                  <b-form-textarea
                    id="input-1"
                    v-model="submission.text"
                    type="text"
                    placeholder="Enter Submission Text"
                    rows="4"
                  />
                  <span class="help">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>

              <b-form-group
                v-if="communityData.challengeFormat[0].githubLink"
                id="input-group-1"
              >
                <h5 class="dark-white">
                  <b>
                    GitHub Link
                  </b>
                </h5>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="GitHub link"
                  rules="min:7"
                >
                  <b-form-input
                    id="input-2"
                    v-model="submission.githubLink"
                    type="text"
                    placeholder="Enter Github Link"
                  />
                  <span class="help">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
              <b-button
                id="submitButton"
                class="btn btn-primary btn-lg mt-2"
                type="submit"
              >
                Submit
              </b-button>
            </b-form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import apiJobMixin from '@/mixins/apiJobMixin'
import firebase from '@/plugins/firebase'

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
      },
      submissionDb: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      communityData: 'content/communityData'
    })
  },
  created() {
    this.getSubmission()
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/submissions`
    },
    submissionPath(slug, submissionKey) {
      return `/${slug}/submission/${submissionKey}`
    },
    onSubmit() {
      this.submission.communityId = this.communityData.id
      this.submission.displayName = this.user.displayName
      this.submission.userId = this.user.id
      this.$store.dispatch('submissions/createSubmission', this.submission)
      document.getElementById('submitButton').disabled = true
    },
    jobsDone() {
      this.removeErrors()
      this.$router.go()
    },
    async getSubmission() {
      await firebase.database().ref(`submissions/${this.$route.params.slug}`).orderByChild('userId').equalTo(this.user.id).once('value').then((snapShot) => {
        this.submissionDb = snapShot.val()
      })
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
  margin-bottom:1em;
  padding: 1em;
}
</style>
