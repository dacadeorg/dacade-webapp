<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="site-wraper">
          <div v-html="lcData.introductionText" />

          <div v-if="lcData.learningObjective" class="objective-box">
            <h5>
              <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/direct-hit_1f3af.png">
              Learning Objective
            </h5>
            <span v-html="lcData.learningObjective" />
          </div>

          <div v-if="lcData.motivationVideo" class="card intro-videos w-100">
            <div class="card-body">
              <h5 class="card-lite-title">
                Why should you learn to code?
              </h5>
              <h7 class="card-subtitle mb-2">
                <span>
                  <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/stopwatch_23f1.png">
                  130 sec
                </span>
              </h7>
              <div class="embed-responsive embed-responsive-16by9">
                <iframe
                  class="embed-responsive-item"
                  :src="lcData.motivationVideo"
                  allowfullscreen="allowfullscreen"
                  frameborder="0"
                />
              </div>
            </div>
          </div>

          <div v-if="lcData.introductionVideo" class="card intro-videos w-100">
            <div class="card-body card-lite">
              <h4>
                Trailer
              </h4>
              <h6 class="mb-2">
                <span>
                  <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/129/stopwatch_23f1.png">
                  {{ lcData.introductionVideoTime }} sec
                </span>
              </h6>
              <div class="embed-responsive embed-responsive-16by9 mt-1">
                <iframe
                  class="embed-responsive-item"
                  :src="lcData.introductionVideo"
                  allowfullscreen="allowfullscreen"
                  frameborder="0"
                />
              </div>
            </div>
          </div>

          <h4 class="h-dark">
            Chapter Overview
          </h4>
          <div v-for="item2 in lcData.chapter" :key="item2.key" class="chapter-outline mt-4">
            <h5 class="h-dark">
              {{ item2.chapterName }}
              <span class="chapter-time">
                {{ item2.chapterTime }} min
              </span>
            </h5>
            <p v-html="item2.chapterShortDescription" />
          </div>

          <h4 class="h-dark mt-4">
            Creative Challenge
          </h4>

          <p>{{ lcData.introductionChallenge }}</p>
          <!--Shows how much submission have been made in community and how much was earned-->
          <div>
            <span>
              <b>22 </b> Submissions
            </span>
            <span>
              <b>21 $</b> Earned
            </span>
          </div>

          <!--Shows sponsor of the community-->
          <div class="community-sponsor">
            <p>This community is made possible by</p>
            <a :href="lcData.communitySponsorLink" target="_blank">
              <img :src="lcData.communitySponsorImg">
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
      lcData: 'content/lcData'
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
.chapter-time {
  color:rgba(255, 255, 255, 0.3);
  font-weight:bold;
}
.chapter-time img{
  padding-bottom: 0.3em;
  width:20px;
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
  color:rgba(0,0,0,.2)!important;
}
.intro-videos img {
  padding-bottom: 0.3em;
  width:16px;
}
</style>
