<template>
  <div>
    <div class="row marketing">
      <div class="col-lg-12">
        {{ submissions }}
        <div>
          <b-card v-for="submission in submissions" :key="submission.key">
            <b-card-text>
              by {{ submission.name }}
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
    submissionPath(slug, submissionKey) {
      console.log(submissionKey)
      return `/${slug}/submission/${submissionKey}`
    }
  }
}
</script>
<style scoped>

</style>
