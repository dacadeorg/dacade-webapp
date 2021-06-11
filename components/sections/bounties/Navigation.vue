<template>
  <ThemeWrapper :colors="colors">
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
            class="relative mt-4 text-sm text-blue-600"
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
      colors: 'ui/colors',
      bounties: 'bounties/list',
    }),
    menus() {
      return [
        {
          title: this.$t('bounties.navigation'),
          items: [
            {
              label: this.$t('bounties.navigation.all'),
              exact: true,
              link: '/bounties',
            },
            ...this.bounties.map((bounty) => {
              return {
                label: bounty.name,
                exact: true,
                link: `/bounties/${bounty.slug}`,
              }
            }),
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
