<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-12">
        <p><i class="dacade-note">{{ communityData.challengeDescription }}</i></p>
        <h4>Challenge:</h4>
        <div v-html="communityData.challenge" />
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
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      submission: {
        text: null,
        name: 'bernd'
      }
    }
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
    communityPath(slug) {
      return `/${slug}/submissions`
    },
    onSubmit() {
      this.$store.dispatch('submissions/createSubmission', this.submission)
    }
  }
}
</script>
<style scoped>

</style>
