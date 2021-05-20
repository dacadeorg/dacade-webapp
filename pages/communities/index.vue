<template>
  <div>
    <div class="container">
      <div v-if="communityDataPreview" class="row">
        <div
          v-for="community in orderedCommunityDataPreview"
          :key="community.key"
          class="col-md-4 mb-4 sel-com"
        >
          <nuxt-link :to="{ path: communityPath(community.slug) }">
            <b-card
              :img-src="community.imgUrl"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 30rem"
              class="mb-2 bg-dark small-shadow"
            >
              <div class="text-center">
                <h4 class="dark-white">
                  <b v-html="community.nameDisplay" />
                </h4>
              </div>
              <b-card-text class="muted-dark">
                <div class="muted-dark">
                  Estimated Time: ~ {{ community.time }}min
                </div>
                <div class="muted-dark">
                  Total Submissions: {{ community.submissions }}
                </div>
                <div class="muted-dark">
                  Rewards:
                  <b v-if="community.rewardToken === 'DCN'" class="dark-white">
                    {{ community.submissionReward
                    }}<span class="muted-dark">/</span
                    >{{ community.reviewReward }}
                    <coin height="18" />
                  </b>
                  <b v-else class="earning-color">
                    {{ community.submissionReward
                    }}<span class="muted-dark">/</span
                    >{{ community.reviewReward }}$
                  </b>
                </div>
              </b-card-text>
            </b-card>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      communityDataPreview: 'content/communityDataPreview',
    }),
    orderedCommunityDataPreview() {
      const orderedCommunityDataPreview = this.communityDataPreview
      for (const key in orderedCommunityDataPreview) {
        if (
          orderedCommunityDataPreview[key].order === undefined ||
          orderedCommunityDataPreview[key].order === 0
        ) {
          delete orderedCommunityDataPreview[key]
        }
      }
      return Object.values(orderedCommunityDataPreview).sort(function (a, b) {
        return a.order - b.order
      })
    },
  },
  mounted() {
    if (
      !this.communityDataPreview ||
      Object.keys(this.communityDataPreview).length === 0
    ) {
      this.$store.dispatch('content/getCommunityDataPreview')
    }
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/introduction`
    },
  },
}
</script>
<style scoped>
.card-body {
  padding: 1.5rem 2.1rem;
}
.card-text {
  text-align: center;
  color: #acb2be;
  font-size: 1.2em;
}
.card-title {
  text-align: center;
}
.container {
  margin-top: 4rem;
}
.DCN {
  vertical-align: -2px;
  margin-left: -4px;
}
.sel-com article {
  border: 1.6px solid #0000;
}
.sel-com article:hover {
  border: 1.6px solid #53d1af;
}
.sel-com a:hover {
  text-decoration: none;
}
</style>
