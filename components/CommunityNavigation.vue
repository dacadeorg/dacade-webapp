<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-3 d-none d-md-block sidebar sticky-top">
          <!-- <span class="nav-item">{{ lcData.name }}</span> -->
          <div>
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
        </nav>
      </div>
    </div>

    <!-- <b-nav>
      <b-nav-item>
        <nuxt-link :to="{path: communityPath($route.params.slug, 'introduction') }">
          Introduction
        </nuxt-link>
      </b-nav-item>
      <b-nav-item-dropdown
        id="my-nav-dropdown"
        text="Chapter"
        toggle-class="nav-link-custom"
        right
      >
        <b-dropdown-item v-for="chapter in lcData.chapter" :key="chapter.key">
          <nuxt-link :to="{path: chapterPath($route.params.slug, chapter.chapterId) }">
            {{ chapter.chapterName }}
          </nuxt-link>
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item>
        <nuxt-link :to="{path: communityPath($route.params.slug, 'challenge') }">
          Challenge
        </nuxt-link>
      </b-nav-item>
      <b-nav-item>
        <nuxt-link :to="{path: communityPath($route.params.slug, 'submissions') }">
          Submissions
        </nuxt-link>
      </b-nav-item>
    </b-nav> -->
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

.font-bold{
  font-weight:600;
}

.sidebar {
  position: fixed;
  top: 63px;
  bottom: 0;
  right: 0;
  z-index: 100;
  padding: 10px 0 0 10px;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  background-image: linear-gradient( #2c3238, #22262b);
}

.nav-item {
  display: block;
  padding: .5rem 1rem;
  font-size: 19px;
  font-weight: 700;
  color: rgba(217,217,217,1.00);
}

.nav-item a{
  color: rgba(217,217,217,1.00);
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

.chapter-nav-header{
  color:rgba(255,255,255,0.5);
}

</style>
