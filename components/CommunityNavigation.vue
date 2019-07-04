<template>
  <div>
    <b-nav>
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
        <b-dropdown-item v-for="chapter in communityData.chapter" :key="chapter.key">
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
    </b-nav>
  </div>
</template>
<script>
/* eslint-disable no-console */
export default {
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  methods: {
    communityPath(slug, chapterLink) {
      return `/${slug}/${chapterLink}`
    },
    chapterPath(slug, chapterId) {
      return `/${slug}/chapter/${chapterId}`
    }
  }
}
</script>
<style scoped>
</style>
