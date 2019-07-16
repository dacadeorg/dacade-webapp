<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-12">
        <p><i class="dacade-note">{{ lcData.challengeDescription }}</i></p>
        <h4>Challenge:</h4>
        <div v-html="lcData.challenge" />
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
              required
              placeholder="Enter Submission"
            />
          </b-form-group>
          <b-button type="submit" variant="primary">
            Submit
          </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters, mapActions } from 'vuex'
export default {
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
  middleware: 'verify-user',
  computed: {
    ...mapGetters({
      user: 'user',
      submissions: 'submissions/submissions',
      lcData: 'content/lcData'
    })
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
      console.log(this.user)
      this.submission.lCId = this.lcData.id
      this.submission.displayName = this.user.displayName
      this.submission.userId = this.user.id
      this.$store.dispatch('submissions/createSubmission', this.submission)
    }
  }
}
</script>
<style scoped>

</style>
