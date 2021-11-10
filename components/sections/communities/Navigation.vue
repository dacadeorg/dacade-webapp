<template>
  <ThemeWrapper :colors="community.colors">
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
          >
            <span class="relative block" :style="activeLinkStyle">
              <nuxt-link
                :to="item.link"
                class="relative text-gray-500"
                :class="{ 'activable-link': !item.exact }"
              >
                <span class="absolute inline-block -top-1 -left-6 nav-icon">
                  <ChevronRightIcon
                    :class="{
                      'transform rotate-90':
                        item.subitems && item.subitems.length,
                    }"
                  />
                </span>
                <span class="nav-label">{{ item.label }}</span>
              </nuxt-link>
            </span>
            <ul v-if="item.subitems && item.subitems.length">
              <li
                v-for="(subitem, j) in item.subitems"
                :key="j"
                class="relative mt-4 text-sm text-gray-500"
                :style="activeLinkStyle"
              >
                <nuxt-link
                  :to="{ path: item.link, hash: subitem.link }"
                  class="relative text-gray-500 opacity-50 hover:opacity-100"
                  :class="{ 'activable-link': !subitem.exact }"
                >
                  <span class="nav-label">{{ subitem.label }}</span>
                </nuxt-link>
              </li>
            </ul>
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
    learningModulePath(learningModuleId) {
      return `/communities/${this.$route.params.slug}/learning-modules/${learningModuleId}`
    },
    setNavigationList() {
      const list = [
        {
          id: 'introduction',
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
          id: 'learning-modules',
          title: this.$t('communities.navigation.learning-modules'),
          items: this.community.learningModules?.map((learningModule, i) => ({
            id: learningModule.id,
            label: learningModule.title,
            link: this.learningModulePath(learningModule.id),
            exact: false,
            subitems: learningModule.materials
              ? learningModule.materials.map((material) => ({
                  label: material.title,
                  link: this.learningModulePath(i),
                  exact: false,
                }))
              : [],
          })),
        },
        {
          id: 'boutnies',
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
          id: 'challenge',
          label: this.$t('communities.navigation.challenge'),
          link: this.communityPath(
            `challenges/${this.community.challenges[0].id}`
          ),
          exact: false,
        })

        links.push({
          id: 'submissions',
          label: this.$t('communities.navigation.submissions'),
          link: this.communityPath('submissions'),
          exact: false,
        })
      }

      links.push({
        id: 'scoreboard',
        label: this.$t('communities.navigation.scoreboard'),
        link: this.communityPath('scoreboard'),
        exact: false,
      })
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
  opacity: 1;
}

.nuxt-link-exact-active > .nav-icon,
.activable-link.nuxt-link-active > .nav-icon {
  display: block;
}
</style>
