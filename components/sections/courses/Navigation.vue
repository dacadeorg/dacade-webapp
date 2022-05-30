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
          <li v-for="(item, k) in menu.items" :key="k" class="relative mt-4">
            <NavigationLink :item="item" />
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
import NavigationLink from './_partials/navigation/link'
import ThemeWrapper from '@/components/wrappers/ThemeWrapper'

export default {
  components: {
    ThemeWrapper,
    LanguageSwitcher,
    NavigationLink,
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
  },
  created() {
    this.$store.dispatch('communities/navigation/init')
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
