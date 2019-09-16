<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-8">
        <div class="site-wraper">
          <div>
            <b-card
              v-for="submission in getCommunitySubmissions"
              :key="submission.key"
              class="bg-dark mb-4 small-shadow"
            >
              <nuxt-link
                :to="{path: submissionPath($route.params.slug, submission['.key']) }"
              >
                <span class="float-right muted-dark">
                  {{ convertDate(submission.date) }}
                </span>
                <b class="learning-color">
                  Submission
                </b>
                <span class="muted-dark">
                  by
                </span>
                <span class="h-dark">
                  {{ submission.displayName }}
                </span>
                <div v-if="submission.submissionPoints">
                  <b class="learning-color">
                    {{ submission.submissionPoints }}<span class="learning-color-muted">/{{ communityData.challengePoints }} LP</span>
                  </b>
                </div>
                <b-card-text class="mt-2">
                  {{ contentPreview(submission.text) }}..
                </b-card-text>
              </nuxt-link>
            </b-card>
          </div>
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
      communityData: 'content/communityData'
    }),
    getCommunitySubmissions() {
      const communitySubmissions = []
      for (let index = 0; index < this.submissions.length; index++) {
        if (this.submissions[index].communityId === this.communityData.id) {
          communitySubmissions.push(this.submissions[index])
        }
      }
      return communitySubmissions
    }
  },
  mounted(params) {
    if ((!this.submissions || Object.keys(this.submissions).length === 0)) {
      this.getSubmissions()
    }
  },
  methods: {
    ...mapActions({
      getSubmissions: 'submissions/getSubmissions'
    }),
    contentPreview(content) {
      const maxLength = 160
      let trimmedString = content.substr(0, maxLength)
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))
      return trimmedString
    },
    submissionPath(slug, submissionKey) {
      return `/${slug}/submission/${submissionKey}`
    },
    convertDate(date) {
      let submissionDate = new Date(date).toDateString()
      submissionDate = submissionDate.slice(4, -4)
      return submissionDate
    }
  }
}
</script>
<style scoped>
.card-date {
  color: rgba(255,255,255,.5);
  float: right;
}

a{
  color:rgba(255,255,255,.5);
}

a:hover{
  text-decoration: none;
}

.small-shadow:hover{
  border: 1.6px solid #53d1af;
}
</style>
