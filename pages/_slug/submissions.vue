<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-12">
        <div>
          <b-card v-for="submission in getCommunitySubmissions" :key="submission.key">
            <b-card-text>
              by {{ submission.displayName }}
            </b-card-text>
            <b-card-text>
              {{ submission.text }}
            </b-card-text>
            <a href="#" class="card-link">
              <nuxt-link :to="{path: submissionPath($route.params.slug, submission['.key']) }">
                See Submission
              </nuxt-link>
            </a>
          </b-card>
        </div>
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
    }
  },
  computed: {
    ...mapGetters({
      submissions: 'submissions/submissions',
      lcData: 'content/lcData'
    }),
    getCommunitySubmissions() {
      const communitySubmissions = []
      for (let index = 0; index < this.submissions.length; index++) {
        if (this.submissions[index].lCId === this.lcData.id) {
          communitySubmissions.push(this.submissions[index])
        }
      }
      return communitySubmissions
    }
  },
  created() {
    this.getSubmissions()
  },
  methods: {
    ...mapActions({
      getSubmissions: 'submissions/getSubmissions'
    }),
    submissionPath(slug, submissionKey) {
      console.log(submissionKey)
      return `/${slug}/submission/${submissionKey}`
    }
  }
}
</script>
<style scoped>

</style>
