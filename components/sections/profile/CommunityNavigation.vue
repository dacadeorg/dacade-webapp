<template>
  <ul
    class="
      relative
      border-gray-200 border-b border-t
      lg:border-0
      lg:px-0
      lg:pt-0
      lg:mb-0
      lg:mx-0
      px-15
      pt-3
      -pb-2
      mb-12
      -mx-15
      md:-mx-5
    "
  >
    <li v-for="(menu, i) in menus" :key="i" class="mb-6 md:mb-8 relative">
      <span
        v-if="!menu.hideTitle"
        class="
          hidden
          lg:flex
          -mt-6
          lg:mt-0
          text-xs
          uppercase
          font-semibold
          relative
          text-gray-500
        "
        >{{ menu.title }}</span
      >
      <ul>
        <li
          v-for="(item, k) in menu.items"
          :key="k"
          class="text-sm mt-4 relative text-primary"
        >
          <nuxt-link
            :to="item.link"
            class="relative text-gray-500"
            :class="{ 'activable-link': !item.exact }"
          >
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
import ChevronRightIcon from '~/assets/icons/chevron-right.svg?inline'

export default {
  components: {
    ChevronRightIcon,
  },
  data() {
    return {
      menus: [
        {
          title: 'COMMUNITIES',
          items: [
            {
              label: 'Introduction to Blockchain',
              link: '/profile/intro-to-blockchain',
            },
            {
              label: 'Web Development 101',
              link: '/profile/web-dev-101',
            },
          ],
        },
      ],
    }
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
