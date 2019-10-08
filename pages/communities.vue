<template>
  <div>
    <Navigation />
    <div>
      <div class="container">
        <div class="row">
          <div
            v-for="(community) in communityDataPreview"
            :key="community.key"
            class="col-md-4 mb-4 sel-com"
          >
            <nuxt-link
              :to="{path: communityPath(community.slug) }"
            >
              <b-card
                :img-src="community.imgUrl"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 30rem;"
                class="mb-2 bg-dark small-shadow"
              >
                <div class="text-center">
                  <h4 class="h-dark">
                    {{ community.name }}
                  </h4>
                </div>
                <b-card-text class="muted-dark">
                  <div class="muted-dark">
                    Estimated Time: ~{{ community.time }}min
                  </div>
                  <div class="muted-dark">
                    Total Submissions: {{ community.submissions }}
                  </div>
                  <div class="muted-dark">
                    Rewards: <b class="earning-color">{{ community.submissionReward }}$/{{ community.reviewReward }}$</b>
                  </div>
                </b-card-text>
              </b-card>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({
      communityDataPreview: 'content/communityDataPreview'
    })
  },
  mounted() {
    if (!this.communityDataPreview || Object.keys(this.communityDataPreview).length === 0) {
      this.$store.dispatch('content/getCommunityDataPreview')
    }
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/introduction`
    }
  }
}
</script>
<style scoped>
  .card-body{
    padding: 1.5rem 2.1rem;
  }

  .card-text{
    text-align: center;
    color:#acb2be;
    font-size: 1.2em;
  }
  .card-title{
    text-align: center;
  }

  .container{
    margin-top:4rem;
  }
  .sel-com article:hover{
    border: 1.6px solid #53d1af;
  }

  .sel-com a:hover{
    text-decoration: none;
  }

</style>
