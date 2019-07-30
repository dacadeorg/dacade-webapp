<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-12">
        <p><i class="dacade-note">{{ lcData.challengeDescription }}</i></p>
        <h4>Challenge:</h4>
        <div v-html="lcData.challenge" />
        <div v-if="getUserSubmission">
          {{ getUserSubmission }}
          <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{ path: communityPath($route.params.slug) }">
            See Submissions
          </nuxt-link>
        </div>

        <div v-else>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
              id="input-group-1"
              label="Submission:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="submission.text"
                type="text"
                name="submission"
                v-validate="'required|min:20'"
                required
                placeholder="Enter Submission"
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
        userId: null
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
