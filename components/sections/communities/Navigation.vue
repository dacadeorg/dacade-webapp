<template>
  <ul class="relateive">
    <li v-for="(menu, i) in menus" :key="i" class="mb-8  relative">
      <span
        v-if="!menu.hideTitle"
        class="text-xs uppercase font-semibold relative"
      >{{ menu.title }}</span>
      <ul>
        <li
          v-for="(item, k) in menu.items"
          :key="k"
          class="text-sm mt-4 relative"
          :style="activeLinkStyle"
        >
          <nuxt-link :to="item.link" class="relative text-gray-500">
            <span class="inline-block absolute -left-6 nav-icon">
              <ArrowRightIcon />
            </span>
            <span class="nav-label">{{ item.label }}</span>
          </nuxt-link>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  components: {
    ArrowRightIcon
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      communityData: 'communities/content',
      community: 'communities/current',
      colors: 'ui/colors'
    }),
    activeLinkStyle () {
      return {
        color: this.colors.textAccent
      }
    },
    menus () {
      return [
        {
          title: 'Introduction',
          hideTitle: true,
          items: [
            {
              label: this.$t('communities.navigation.overview'),
              active: true,
              link: this.communityPath(this.$route.params.slug)
            }
          ]
        },
        {
          title: this.$t('communities.navigation.chapters'),
          items: this.community.chapters.map((chapter, i) => ({
            label: chapter.title,
            link: this.chapterPath(this.$route, i),
            items: chapter.materials
              ? chapter.materials.map(material => ({
                label: material.title,
                link: this.chapterPath(this.$route, i)
              }))
              : []
          }))
        },
        {
          title: this.$t('communities.navigation.bounties'),
          items: [
            {
              label: this.$t('communities.navigation.challenge'),
              link: this.communityPath(this.$route.params.slug, 'challenge')
            },
            {
              label: this.$t('communities.navigation.submissions'),
              link: this.communityPath(this.$route.params.slug, 'submissions')
            },
            {
              label: this.$t('communities.navigation.scoreboard'),
              link: this.communityPath(this.$route.params.slug, 'scoreboard')
            }
          ]
        }
      ]
    }
  },
  methods: {
    communityPath (slug, link = '') {
      return `/communities/${slug}/${link}`
    },
    chapterPath (route, chapterId) {
      return `/communities/${route.params.slug}/chapters/${chapterId}`
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-icon {
  display: none;
}
.nuxt-link-active + ul {
  display: block;
}
.nuxt-link-exact-active {
  color: inherit !important;
}
.nuxt-link-exact-active > .nav-icon {
  display: block;
}
</style>
