<template>
  <ul class="relative hidden lg:block xl:block">
    <li v-for="(menu, i) in menus" :key="i" class="mb-8 relative">
      <ProfileOverviewSection :title="menu.title" class="pb-0">
        <ul class="space-y-4 flex flex-col">
          <li
            v-for="(item, k) in menu.items"
            :key="k"
            class="text-sm relative text-primary"
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
      </ProfileOverviewSection>
    </li>
  </ul>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import ChevronRightIcon from '~/assets/icons/chevron-right.svg?inline'
import ProfileOverviewSection from '~/components/sections/profile/overview/Section'

export default {
  components: {
    ProfileOverviewSection,
    ChevronRightIcon,
  },
  computed: {
    ...mapGetters({
      communities: 'profile/communities/list',
      authUser: 'user/get',
    }),
    username() {
      return this.$route.params?.username || this.authUser?.displayName
    },
    isCurrentUser() {
      return (
        this.username?.toLowerCase() ===
        this.authUser?.displayName?.toLowerCase()
      )
    },
    menus() {
      const username = this.username
      const items = []
      if (this.communities?.length) {
        items.push({
          title: this.$t('navigation.profile.communities'),
          items: this.communities?.map((community) => ({
            label: community.name,
            link: `/profile/${username}/communities/${community.slug}`,
          })),
        })
      }
      const mainItems = []
      if (this.isCurrentUser) {
        mainItems.push(
          {
            label: this.$t('navigation.profile.overview'),
            link: this.$route.params?.username
              ? '/profile/' + this.username
              : '/profile',
            exact: true,
          },
          {
            label: this.$t('navigation.profile.wallets'),
            link: '/profile/wallets',
          },
          {
            label: this.$t('navigation.profile.referrals'),
            link: '/profile/referrals',
          },
          {
            label: this.$t('navigation.profile.settings'),
            link: '/profile/settings',
          }
        )
      } else {
        mainItems.push({
          label: this.$t('navigation.profile.overview'),
          link: `/profile/${username}`,
          exact: true,
        })
      }
      items.push({
        title: this.$t('navigation.profile.title'),
        items: mainItems,
      })
      return items
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
