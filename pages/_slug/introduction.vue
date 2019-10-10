<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="site-wraper">
          <i class="muted-dark" v-html="communityData.introductionText" />

          <div class="container mb-4">
            <div class="mb-4">
              <h3 class="white">
                <b>
                  Stats
                </b>
              </h3>
            </div>
            <div class="row">
              <div class="col col-md-3 mb-3 stats-column">
                <div>
                  <b-card
                    title="Earn"
                    tag="article"
                    :style="{ borderColor: communityData.gradient }"
                    class="mb-2 small-shadow text-center bg-dark card-stats"
                  >
                    <b-card-text class="text-center mt-4 pb-2">
                      <h3><b class="dark-white points">{{ communityData.submissionPrice }}$</b></h3>
                      <span class="muted-dark">Submission</span>
                    </b-card-text>
                  </b-card>
                </div>
              </div>
              <div class="col col-md-3 mb-3 stats-column">
                <div>
                  <b-card
                    title="Earn"
                    tag="article"
                    :style="{ borderColor: communityData.gradient }"
                    class="mb-2 small-shadow text-center bg-dark card-stats"
                  >
                    <b-card-text class="text-center mt-4 pb-2">
                      <h3><b class="dark-white points">{{ communityData.feedbackPrice }}$</b></h3>
                      <span class="muted-dark">Feedback</span>
                    </b-card-text>
                  </b-card>
                </div>
              </div>
              <div class="col col-md-3 mb-3 stats-column">
                <div>
                  <b-card
                    title="Total"
                    tag="article"
                    :style="{ borderColor: communityData.gradient }"
                    class="mb-2 small-shadow text-center bg-dark card-stats"
                  >
                    <b-card-text class="text-center mt-4 pb-2">
                      <h3><b class="dark-white points">{{ communityData.totalSubmissions }}</b></h3>
                      <span>Submissions</span>
                    </b-card-text>
                  </b-card>
                </div>
              </div>
              <div class="col col-md-3 mb-3 stats-column">
                <div>
                  <b-card
                    title="Total"
                    tag="article"
                    :style="{ borderColor: communityData.gradient }"
                    class="mb-2 small-shadow text-center bg-dark card-stats"
                  >
                    <b-card-text class="text-center mt-4 pb-2">
                      <h3><b class="dark-white points">{{ communityData.earned }}$</b></h3>
                      <span class="muted-dark">Earned</span>
                    </b-card-text>
                  </b-card>
                </div>
              </div>
            </div>
          </div>

          <div v-if="communityData.learningObjective" class="objective-box">
            <h3 class="learning-color">
              <b>
                Learning Objective
              </b>
            </h3>
            <span v-html="communityData.learningObjective" />
          </div>

          <div v-if="communityData.motivationVideo" class="card intro-videos w-100">
            <div class="card-body card-lite">
              <h4>
                Why should you learn to code?
              </h4>
              <h6 class="mb-2">
                <b>
                  130 sec
                </b>
              </h6>
              <div class="embed-responsive embed-responsive-16by9">
                <iframe
                  class="embed-responsive-item"
                  :src="communityData.motivationVideo"
                  allowfullscreen="allowfullscreen"
                  frameborder="0"
                />
              </div>
            </div>
          </div>

          <div v-if="communityData.introductionVideo" class="card intro-videos w-100">
            <div class="card-body card-lite">
              <h3>
                <b class="light-black">
                  Trailer
                </b>
              </h3>
              <h6 class="mb-2">
                <b>
                  {{ communityData.introductionVideoTime }} sec
                </b>
              </h6>
              <div class="embed-responsive embed-responsive-16by9 mt-1">
                <iframe
                  class="embed-responsive-item"
                  :src="communityData.introductionVideo"
                  allowfullscreen="allowfullscreen"
                  frameborder="0"
                />
              </div>
            </div>
          </div>

          <h3 class="white">
            <b>
              Chapter Overview
            </b>
          </h3>
          <div v-for="item2 in communityData.chapter" :key="item2.key" class="chapter-outline mt-4">
            <h5 class="dark-white">
              <b>
                {{ item2.chapterName }}
              </b>
              <span class="chapter-time">
                {{ item2.chapterTime }} min
              </span>
            </h5>
            <p v-html="item2.chapterShortDescription" />
          </div>

          <h3 class="white mt-4">
            <b>
              Creative Challenge
            </b>
          </h3>

          <p>{{ communityData.introductionChallenge }}</p>

          <!--Shows sponsor of the community-->
          <div class="community-sponsor">
            <div class="muted-dark mb-4">
              <i>This community is made possible by</i>
            </div>
            <a :href="communityData.communitySponsorLink" target="_blank">
              <img :src="communityData.communitySponsorImg">
            </a>
          </div>
          <br>

          <nuxt-link class="btn btn-outline-primary btn-lg btn-block" :to="{ path: communityPath($route.params.slug) }">
            Start now
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
      communityData: 'content/communityData'
    })
  },
  methods: {
    communityPath(slug) {
      return `/${slug}/chapter/0`
    }
  }
}
</script>
<style scoped>
.card-title {
  font-weight: 600;
  color:rgba(255, 255, 255, 0.3);
}
.card-text {
  color:rgba(255, 255, 255, 0.3);
}
.card-stats{
  background-image: linear-gradient( #2c3238, #22262b);
  border:none;
  border-bottom: 2px solid white;
}
.chapter-time {
  color:rgba(255, 255, 255, 0.3);
  font-weight:bold;
}
.chapter-time img{
  padding-bottom: 0.3em;
  width:20px;
}
.col-md-3 {
  padding-right: 5px;
  padding-left: 5px;
}
.community-sponsor {
  margin: 4em 0 2em 0;
  text-align:center;
}
.community-sponsor p{
  color:rgba(255, 255, 255, 0.4);
}
.community-sponsor img{
  max-width:80px;
}
.intro-videos {
  margin-bottom:2em;
}
.intro-videos h6 {
  color:rgba(0,0,0,.3)!important;
}
.intro-videos img {
  padding-bottom: 0.3em;
  width:16px;
}

</style>
