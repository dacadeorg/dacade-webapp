<template>
  <ul class="relative">
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
          <nuxt-link :to="item.link" class="relative text-gray-500" :class="{'activable-link': !item.exact}">
            <span class="inline-block absolute -left-6 nav-icon">
              <ChevronRightIcon />
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
import ChevronRightIcon from '~/assets/icons/chevron-right.svg?inline'

export default {
  components: {
    ChevronRightIcon
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      communityData: 'communities/content',
      community: 'communities/current',
      colors: 'ui/colors',
      menus: 'communities/navigation'
    }),
    activeLinkStyle () {
      return {
        color: this.colors.textAccent
      }
    }
  },
  created () {
    this.setNavigationList()
  },
  methods: {
    communityPath (link = '') {
      return `/communities/${this.$route.params.slug}/${link}`
    },
    chapterPath (chapterId) {
      return `/communities/${this.$route.params.slug}/chapters/${chapterId}`
    },
    setNavigationList () {
      const list = [
        {
          title: 'Introduction',
          hideTitle: true,
          items: [
            {
              label: this.$t('communities.navigation.overview'),
              exact: true,
              link: this.communityPath('')
            }
          ]
        },
        {
          title: this.$t('communities.navigation.chapters'),
          items: this.community.chapters.map((chapter, i) => ({
            label: chapter.title,
            link: this.chapterPath(i),
            exact: false,
            items: chapter.materials
              ? chapter.materials.map(material => ({
                label: material.title,
                link: this.chapterPath(i),
                exact: false
              }))
              : []
          }))
        },
        {
          title: this.$t('communities.navigation.bounties'),
          items: [
            {
              label: this.$t('communities.navigation.challenge'),
              link: this.communityPath('challenge'),
              exact: false
            },
            {
              label: this.$t('communities.navigation.submissions'),
              link: this.communityPath('submissions'),
              exact: false
            },
            {
              label: this.$t('communities.navigation.scoreboard'),
              link: this.communityPath('scoreboard'),
              exact: false
            }
          ]
        }
      ]
      this.$store.commit('communities/setNavigation', {
        list
      })
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
.nuxt-link-exact-active,
.activable-link.nuxt-link-active {
  color: inherit !important;
}
.nuxt-link-exact-active > .nav-icon,
.activable-link.nuxt-link-active > .nav-icon {
  display: block;
}
</style>
