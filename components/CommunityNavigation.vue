<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-3 d-none d-md-block sidebar sticky-top">
          <div>
            <ul
              id="menuList"
              class="nav flex-column noShrink"
            >
              <li class="nav-item">
                <i class="fa fa-sticky-note-o fa-lg mr-1 font-bold" />
                <nuxt-link :to="{path: communityPath($route.params.slug, 'introduction') }">
                  Introduction
                </nuxt-link>
              </li>
              <span class="nav-item">
                <i class="fa fa-folder-open-o fa-lg font-bold" />
                <span class="chapter-nav-header">Chapter</span>
              </span>
              <li v-for="chapter in communityData.chapter" :key="chapter.key" class="nav-item chapter-item">
                <nuxt-link
                  :to="{path: chapterPath($route, chapter.chapterId) }"
                >
                  {{ chapter.chapterName }}
                </nuxt-link>
              </li>
              <li class="nav-item">
                <b class="fa fa-flag-o fa-lg mr-1 font-bold" />
                <nuxt-link :to="{path: communityPath($route.params.slug, 'challenge') }">
                  Challenge
                </nuxt-link>
              </li>
              <li class="nav-item">
                <i class="fa fa fa-edit fa-lg mr-1 font-bold" />
                <nuxt-link :to="{path: communityPath($route.params.slug, 'submissions') }">
                  Submissions
                </nuxt-link>
              </li>
              <li
                v-if="$route.name === 'slug-submission-id'"
                class="nav-item"
              >
                <span style="color:#53D1AF; margin-left: 1.8em;">
                  Submission by {{ submissionDisplayName }}
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      communityData: 'content/communityData',
      submissionDisplayName: 'content/submissionDisplayName'
    })
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('scroll', function () {
        const navbar = document.getElementById('menuList')
        if (navbar) {
          const navClasses = navbar.classList
          if (document.documentElement.scrollTop >= 30) {
            if (navClasses.contains('shrink') === false) {
              navClasses.toggle('shrink')
            }
          } else if (navClasses.contains('shrink') === true) {
            navClasses.toggle('shrink')
          }
        }
      })
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
  font-size: 21px;
}

.fa{
  color: rgba(255, 255, 255, .3)
}

.font-bold{
  font-weight:600;
}

.sidebar {
  position: fixed;
  /* top: 63px; */
  bottom: 0;
  right: 0;
  z-index: 1;
  padding: 10px 0 0 10px;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  background-image: linear-gradient( #2c3238, #22262b);
}

.noShrink {
  margin-top:60px;
}

.shrink {
  margin-top:0.5em;
}

.nav-item {
  display: block;
  padding: .5rem 1rem;
  font-size: 19px;
  font-weight: 700;
  color: rgba(255,255,255,.8);
}

.nav-item a{
  color: rgba(255,255,255,.8);
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
