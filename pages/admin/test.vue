<template>
  <div>
    <div class="row">
      <div class="offset-md-3 col-lg-6">
        <div class="mb-4">
          <h1>
            <b>
              SUBMISSIONS
            </b>
          </h1>
        </div>
        <div class="mb-4">
          <b-button @click="back()">
            BACK
          </b-button>
        </div>
        <div>
          <b-nav vertical class="w-25">
            <b-nav-item>
              <div class="mb-4">
                <b-button @click="test()">
                  test
                </b-button>
              </div>
            </b-nav-item>
          </b-nav>
        </div>
      </div>
      <div class="offset-md-3 col-lg-6">
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console, no-unused-vars */
import { mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'
import util from '~/assets/js/util'

export default {
  data() {
    return {
      submissions: null
    }
  },
  computed: {
    ...mapGetters({
      communityDataPreview: 'content/communityDataPreview'
    })
  },
  mounted() {
    if ((!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0)) {
      this.getCommunityDataPreview()
    }
  },
  // created() {
  //   this.getSubmissions()
  // },
  methods: {
    ...mapActions({
      getCommunityDataPreview: 'content/getCommunityDataPreview'
    }),
    back() {
      this.$router.back()
    },
    test() {
      console.log('data')
    }
  }
}
</script>
<style scoped>
.row {
  margin: 3em;
}
</style>
