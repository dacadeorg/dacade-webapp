<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="site-wraper">
          <div v-html="communityData.ChapterData[$route.params.id].chapterDescription" />

          <div v-if="communityData.ChapterData[$route.params.id].learningObjective" class="objective-box">
            <h5>
              <b>
                Learning Objective
              </b>
            </h5>
            <span v-html="communityData.ChapterData[$route.params.id].learningObjective" />
          </div>

          <div v-for="item in communityData.ChapterData[$route.params.id].chapterMaterials" :key="item.key" class="chapter-materials">
            <div v-if="!item.materialAdditional">
              <b-card
                class="bg-dark mb-4 small-shadow"
              >
                <!-- <div class="card w-100 mb-4">
                <div class="card-body card-lite"> -->
                <h4>
                  <b class="white">
                    {{ item.materialTitle }}
                  </b>
                </h4>
                <h6 class="mb-2">
                  <b>
                    {{ item.materialSubtitle }}
                  </b>
                  {{ item.materialTime }}min
                </h6>
                <p class="mt-2" v-html="item.materialDescription" />

                <div v-if="item.materialType === 'embeded'">
                  <div
                    class="embed-responsive embed-responsive-16by9"
                  >
                    <iframe
                      class="embed-responsive-item"
                      :src="item.materialLink"
                      allowfullscreen="allowfullscreen"
                      frameborder="0"
                    />
                  </div>
                </div>

                <div v-else style="text-align:center">
                  <a :href="item.materialLink" target="_blank" class="btn btn-outline-primary">
                    Open {{ item.materialSubtitle }}
                  </a>
                </div>

                <div v-if="item.materialCodeLink" class="code-link">
                  <a class="btn btn-code" target="blank" :href="item.materialCodeLink">SEE CODE</a>
                </div>
                <!-- </div>
              </div> -->
              </b-card>
            </div>
          </div>

          <!-- <div v-if="communityData.ChapterData[$route.params.id].chapterQuizData" class="knowledge-check">
            <h5>Knowledge check:</h5>
            <quiz />
          </div> -->

          <div v-if="communityData.ChapterData[$route.params.id].additionalChapterMaterials" class="mb-4">
            <h5 class="dark-white">
              <b>
                Additional material
              </b>
            </h5>

            <div v-for="item in communityData.ChapterData[$route.params.id].chapterMaterials" :key="item.key" class="list-group additional-material-item">
              <a
                v-if="item.materialAdditional"
                :href="item.materialLink"
                target="blank"
                class="list-group-item list-group-item-action"
                @click="trackClick(item.materialTitle)"
              >
                {{ item.materialTitle }}
                <b class="muted">
                  {{ item.materialTime }} min
                </b>
              </a>
            </div>
          </div>

          <div class="mb-4">
            <i class="muted-dark">If you have any questions or suggestions
              regarding the learning material please get in touch with us on
              <a class="underline" href="https://t.me/dacade">telegram</a>!
            </i>
          </div>
          <nuxt-link class="btn btn-primary btn-lg btn-block" :to="{ path: chapterPath($route.params) }">
            {{ nextChapterLinkText }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import { mapGetters } from 'vuex'

export default {
  scrollToTop: true,
  data () {
    return {
      nextChapterLinkText: 'Next chapter'
    }
  },
  computed: {
    ...mapGetters({
      communityData: 'content/communityData'
    })
  },
  methods: {
    chapterPath (params) {
      const newParams = parseInt(params.id, 10) + 1
      if (newParams < this.communityData.ChapterData.length) {
        return `/${params.slug}/chapter/${newParams}`
      } else {
        this.nextChapterLinkText = 'Next: Challenge'
        return `/${params.slug}/challenge/`
      }
    }
  }
}
</script>
<style scoped>
a{
  color: #53d1af;
}
.additional-material-item a{
  background: none;
  border:1px solid #53d1af;
  color: #53d1af;
  margin-bottom: 0.5em;
}
.additional-material-item a{
  color: #53d1af;
}

.btn-code{
  color:white;
}

.btn-primary{
  color: white;
}

.code-link{
  margin-top:1em;
}

.underline{
  text-decoration: underline;
}
</style>
