<template>
  <nav
    id="community-menu-container"
    class="col-md-3 d-none d-md-block sidebar noFixed"
  >
    <div>
      <ul id="menuList" class="nav flex-column sidebar__content">
        <li class="nav-item">
          <i class="fa fa-sticky-note-o fa-lg mr-1 font-bold" />
          <nuxt-link
            :to="{
              path: communityPath($route.params.slug, 'introduction')
            }"
          >
            {{ t('community.query') }}
          </nuxt-link>
        </li>
        <span class="nav-item">
          <i class="fa fa-folder-open-o fa-lg font-bold" />
          <span class="chapter-nav-header">Chapter</span>
        </span>
        <li
          v-for="chapter in communityData.chapter"
          :key="chapter.key"
          class="nav-item chapter-item"
        >
          <nuxt-link :to="{ path: chapterPath($route, chapter.chapterId) }">
            {{ chapter.chapterName }}
          </nuxt-link>
        </li>
        <li class="nav-item">
          <b class="fa fa-flag-o fa-lg mr-1 font-bold" />
          <nuxt-link
            :to="{ path: communityPath($route.params.slug, 'challenge') }"
          >
            Challenge
          </nuxt-link>
        </li>
        <li class="nav-item">
          <i class="fa fa fa-edit fa-lg mr-1 font-bold" />
          <nuxt-link
            :to="{
              path: communityPath($route.params.slug, 'submissions')
            }"
          >
            Submissions
          </nuxt-link>
        </li>
        <li v-if="$route.name === 'slug-submission-id'" class="nav-item">
          <div style="color: #53d1af; margin-left: 1.8em">
            Submission by {{ submissionDisplayName }}
          </div>
        </li>
        <li class="nav-item">
          <i class="fa fa fa-star-o fa-lg mr-1 font-bold" />
          <nuxt-link
            :to="{
              path: communityPath($route.params.slug, 'scoreboard')
            }"
          >
            Scoreboard
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
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
  mounted () {
    window.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy () {
    try {
      window.removeEventListener('scroll', this.scrollHandler)
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    communityPath (slug, chapterLink) {
      return `/${slug}/${chapterLink}`
    },
    chapterPath (route, chapterId) {
      return `/${route.params.slug}/chapter/${chapterId}`
    },
    scrollHandler () {
      const container = document.getElementById('community-menu-container')
      if (container) {
        const containerClasses = container.classList
        if (document.documentElement.scrollTop >= 30) {
          if (!containerClasses.contains('fixed')) {
            containerClasses.toggle('fixed')
          }
        } else if (containerClasses.contains('fixed')) {
          containerClasses.toggle('fixed')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chapter-item {
  margin-left: 1.8em;
}

.navLcName {
  font-weight: 700;
  font-size: 21px;
}

.fa {
  color: rgba(255, 255, 255, 0.3);
}

.font-bold {
  font-weight: 600;
}

.sidebar {
  /* top: 63px; */
  top: 0;
  right: 0;
  z-index: 1;
  padding: 10px;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(#2c3238, #22262b);
  transition-duration: 125ms;
  transition-timing-function: linear;
  &__content {
    padding: 0.5em;
  }
}
.noFixed {
  position: absolute;
}

.fixed {
  position: fixed;
}

.nav-item {
  display: block;
  padding: 0.5rem 1rem;
  font-size: 19px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
}

.nav-item a {
  color: rgba(255, 255, 255, 0.8);
}

.nav-item a:hover {
  color: #53d1af !important;
  /* background: #53d1af13; */
  border-radius: 25px;
  text-decoration: none;
}

.nav-item a.nuxt-link-active {
  color: #53d1af;
}

.chapter-nav-header {
  color: rgba(255, 255, 255, 0.5);
}
</style>
