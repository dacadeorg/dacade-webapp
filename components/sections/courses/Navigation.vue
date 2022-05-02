<template>
  <ThemeWrapper :colors="community.colors">
    <ul class="relative">
      <li v-for="(menu, i) in menus" :key="i" class="relative mb-8">
        <span
          v-if="!menu.hideTitle"
          class="relative text-xs font-semibold uppercase"
          >{{ $t(menu.title) }}</span
        >
        <ul>
          <li
            v-for="(item, k) in menu.items"
            :key="k"
            class="relative mt-4 text-sm"
          >
            <span
              class="relative block text-gray-500 cursor-pointer"
              :class="{
                'activable-link': isCurrentLink(item.link, item.exact),
              }"
              :style="
                isCurrentLink(item.link, item.exact) ? activeLinkStyle : {}
              "
              @click="goToLink(item)"
            >
              <span
                v-show="isCurrentLink(item.link, item.exact)"
                class="absolute inline-block top-0 -left-6 nav-icon"
              >
                <ChevronRightIcon
                  :class="{
                    'transform rotate-90':
                      item.subitems &&
                      item.subitems.length &&
                      isCurrentLink(item.link, item.exact) &&
                      expanded,
                  }"
                  class="transition-transform duration-200"
                />
              </span>
              <span class="nav-label">{{ $t(item.label) }}</span>
            </span>
            <ul
              v-if="
                item.subitems &&
                item.subitems.length &&
                isCurrentLink(item.link, false) &&
                expanded
              "
            >
              <li
                v-for="(subitem, j) in item.subitems"
                :key="j"
                class="relative mt-4 text-sm text-gray-500"
                :style="activeLinkStyle"
              >
                <nuxt-link
                  :to="localePath({ path: item.link, hash: subitem.link })"
                  class="relative text-gray-500 opacity-50 hover:opacity-100"
                  :class="{ 'activable-link': !subitem.exact }"
                >
                  <span class="nav-label">{{ $t(subitem.label) }}</span>
                </nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <LanguageSwitcher />
      </li>
    </ul>
  </ThemeWrapper>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import LanguageSwitcher from './_partials/LanguageSwitcher'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'
import ChevronRightIcon from '~/assets/icons/chevron-right.svg?inline'

export default {
  components: {
    ThemeWrapper,
    ChevronRightIcon,
    LanguageSwitcher,
  },
  data() {
    return {
      expanded: true,
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      course: 'communities/courses/current',
      colors: 'ui/colors',
      menus: 'communities/navigation/list',
    }),
    activeLinkStyle() {
      return {
        color: this.colors.primary,
      }
    },
  },
  created() {
    this.$store.dispatch('communities/navigation/init')
  },
  methods: {
    goToLink(item) {
      if (this.isCurrentLink(item.link, item.exact)) {
        this.expanded = !this.expanded
        return
      }
      this.$router.push(this.localePath(item.link))
    },
    isCurrentLink(link, exact = false) {
      if (exact) {
        return this.$route.path === this.localePath(link)
      }
      return this.$route.path.includes(this.localePath(link))
    },
  },
}
</script>
<style lang="scss" scoped>
.nav-icon {
  display: block;
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
