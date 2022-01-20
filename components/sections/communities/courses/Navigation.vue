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
                <span class="nav-label">{{ $t(item.label) }}</span>
              </nuxt-link>
            </span>
            <ul
              v-if="
                item.subitems &&
                item.subitems.length &&
                $route.path === item.link
              "
              v-scroll-spy-active
              v-scroll-spy-link
            >
              <li
                v-for="(subitem, j) in item.subitems"
                :key="j"
                class="relative mt-4 text-sm text-gray-500"
                :style="activeLinkStyle"
              >
                <nuxt-link
                  :to="{ path: item.link, hash: subitem.link }"
                  class="
                    relative
                    text-gray-500
                    opacity-50
                    hover:opacity-100
                    scroll-spy-link
                  "
                >
                  <span class="nav-label">{{ $t(subitem.label) }}</span>
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
}
</script>
<style lang="scss" scoped>
.nav-icon {
  display: none;
}
.nuxt-link-active + ul {
  display: block;
}
a:not(.scroll-spy-link).nuxt-link-exact-active,
a:not(.scroll-spy-link).activable-link.nuxt-link-active,
li.active a {
  color: inherit !important;
  opacity: 1;
}

.nuxt-link-exact-active > .nav-icon,
.activable-link.nuxt-link-active > .nav-icon {
  display: block;
}
</style>
