<template>
  <ul class="relative hidden lg:block xl:block">
    <li v-for="(menu, i) in menus" :key="i" class="mb-8  relative">
      <span
        v-if="!menu.hideTitle"
        class="text-xs uppercase font-semibold relative text-gray-500"
      >{{ menu.title }}</span>
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
    ChevronRightIcon
  },
  data () {
    return {
      menus: [
        {
          title: 'COMMUNITIES',
          items: [
            {
              label: 'Introduction to Blockchain',
              link: '/profile/intro-to-blockchain'
            },
            {
              label: 'Web Development 101',
              link: '/profile/web-dev-101'
            }
          ]
        },
        {
          title: 'PROFILE',
          items: [
            {
              label: 'Notifications',
              link: '/profile/notifications'
            },
            {
              label: 'Wallet',
              link: '/profile/wallet'
            }
          ]
        }
      ]
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
