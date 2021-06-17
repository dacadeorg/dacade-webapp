<template>
  <ThemeWrapper class="top-0 sticky self-start py-4" :colors="community.colors">
    <ul class="relative">
      <li v-for="(menu, i) in menus" :key="i" class="relative mb-8">
        <span
          v-if="!menu.hideTitle"
          class="relative text-xs font-semibold uppercase"
          >{{ menu.title }}</span
        >
        <ul>
          <li
            v-for="(item, k) in menu.items"
            :key="k"
            class="relative mt-4 text-sm"
            :style="activeLinkStyle"
          >
            <nuxt-link
              :to="item.link"
              class="relative text-gray-500"
              :class="{ 'activable-link': !item.exact }"
            >
              <span class="absolute inline-block -left-6 nav-icon">
                <ChevronRightIcon />
              </span>
              <span class="nav-label">{{ item.label }}</span>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </ThemeWrapper>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import ChevronRightIcon from '~/assets/icons/chevron-right.svg?inline'

export default {
  components: {
    ThemeWrapper,
    ChevronRightIcon,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      colors: 'ui/colors',
      menus: 'communities/navigation',
    }),
    activeLinkStyle() {
      return {
        color: this.colors.primary,
      }
    },
  },
  created() {
    this.setNavigationList()
  },
  methods: {
    communityPath(link = '') {
      return `/communities/${this.$route.params.slug}/${link}`
    },
    chapterPath(chapterId) {
      return `/communities/${this.$route.params.slug}/chapters/${chapterId}`
    },
    setNavigationList() {
      const list = [
        {
          title: 'Introduction',
          hideTitle: true,
          items: [
            {
              label: this.$t('communities.navigation.overview'),
              exact: true,
              link: this.communityPath(''),
            },
          ],
        },
        {
          title: this.$t('communities.navigation.chapters'),
          items: this.community.chapters?.map((chapter, i) => ({
            label: chapter.title,
            link: this.chapterPath(chapter.id),
            exact: false,
            items: chapter.materials
              ? chapter.materials.map((material) => ({
                  label: material.title,
                  link: this.chapterPath(i),
                  exact: false,
                }))
              : [],
          })),
        },
        {
          title: this.$t('communities.navigation.bounties'),
          items: this.bountyLinks(),
        },
      ]
      this.$store.commit('communities/setNavigation', {
        list,
      })
    },
    bountyLinks() {
      const links = []

      if (this.community.challenges?.length) {
        links.push({
          label: this.$t('communities.navigation.challenge'),
          link: this.communityPath(
            `challenges/${this.community.challenges[0].id}`
          ),
          exact: false,
        })

        links.push({
          label: this.$t('communities.navigation.submissions'),
          link: this.communityPath('submissions'),
          exact: false,
        })
      }

      // links.push({
      //   label: this.$t('communities.navigation.scoreboard'),
      //   link: this.communityPath('scoreboard'),
      //   exact: false,
      // })
      return links
    },
  },
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
