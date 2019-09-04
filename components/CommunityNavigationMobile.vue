<template>
  <div>
    <div class="nav-wrapper">
      <div :style="{ color: lcData.gradient }" class="navLcName">
        {{ lcData.name }}
      </div>
      <ul class="nav flex-column">
        <li class="nav-item">
          <nuxt-link :to="{path: communityPath($route.params.slug, 'introduction') }">
            <i class="fa fa-sticky-note-o fa-lg mr-1 font-bold" :style="{ color: lcData.gradient }" />
            Introduction
          </nuxt-link>
        </li>
        <span class="nav-item">
          <i class="fa fa-folder-open-o fa-lg font-bold" :style="{ color: lcData.gradient }" />
          <span class="chapter-nav-header">Chapter</span>
        </span>
        <li v-for="chapter in lcData.chapter" :key="chapter.key" class="nav-item">
          <nuxt-link
            :to="{path: chapterPath($route, chapter.chapterId) }"
            class="chapter-item"
          >
            {{ chapter.chapterName }}
          </nuxt-link>
        </li>
        <li class="nav-item">
          <b class="fa fa-flag-o fa-lg mr-1 font-bold" :style="{ color: lcData.gradient }" />
          <nuxt-link :to="{path: communityPath($route.params.slug, 'challenge') }">
            Challenge
          </nuxt-link>
        </li>
        <li class="nav-item">
          <i class="fa fa fa-edit fa-lg mr-1 font-bold" :style="{ color: lcData.gradient }" />
          <nuxt-link :to="{path: communityPath($route.params.slug, 'submissions') }">
            Submissions
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      lcData: 'content/lcData'
    })
  },
  methods: {
    communityPath(slug, chapterLink) {
      return `/${slug}/${chapterLink}`
    },
    chapterPath(route, chapterId) {
      return `/${route.params.slug}/chapter/${chapterId}`
    }
  }
}
</script>
<style scoped>
.chapter-item{
  margin-left: 1.8em;
}

.navLcName {
  font-weight:700;
  font-size: 19px;
  margin-left: 0.725em;
}

.font-bold{
  font-weight:600;
}

.nav-item {
  display: block;
  padding: .5rem 1rem;
  font-size: 19px;
  font-weight: 700;
  color:rgba(255,255,255,0.5);
}

.nav-item a{
  color:rgba(255,255,255,0.5);
}

.nav-item a:hover{
  color: #53d1af!important;
  /* background: #53d1af13; */
  border-radius: 25px;
  text-decoration: none;
}

.nav-item a.nuxt-link-active{
  color: #53d1af;
}

.nav-wrapper{
  padding:0.25rem 0.6rem;
}

.chapter-nav-header{
  color:rgba(255,255,255,0.2);
}

</style>
