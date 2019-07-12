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
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  middleware: 'verify-user',
  computed: {
    ...mapGetters({
      submissions: 'submissions/submissions'
    }),
    getCommunitySubmissions() {
      const communitySubmissions = []
      for (let index = 0; index < this.submissions.length; index++) {
        if (this.submissions[index].lCId === this.communityData.id) {
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
