<template>
  <ul class="relative hidden lg:block xl:block">
    <li v-for="(menu, i) in menus" :key="i" class="mb-8 relative">
      <div v-if="menu.items && menu.items.length">
        <span
          v-if="!menu.hideTitle"
          class="text-xs uppercase font-semibold relative text-gray-500"
          >{{ menu.title }}</span
        >
        <ul>
          <li
            v-for="(item, k) in menu.items"
            :key="k"
            class="text-sm mt-4 relative text-primary"
          >
            <nuxt-link
              :to="localePath(item.link)"
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
      </div>
    </li>
  </ul>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import ChevronRightIcon from '~/assets/icons/chevron-right.svg?inline'

export default {
  components: {
    ChevronRightIcon,
  },
  computed: {
    ...mapGetters({
      communities: 'user/communities/list',
    }),
    menus() {
      return [
        {
          title: 'COMMUNITIES',
          items: this.communities?.map((community) => ({
            label: community.name,
            link: `/profile/${community.slug}`,
          })),
        },
        {
          title: this.$t('navigation.title'),
          items: [
            {
              label:  this.$t('navigation.profile.notifications'),
              link: '/profile',
              exact: true,
            },
            {
              label:  this.$t('navigation.profile.wallets'),
              link: '/profile/wallets',
            },
            {
              label:  this.$t('navigation.profile.referrals'),
              link: '/profile/referrals',  
            },
          ],
        },
      ]
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
