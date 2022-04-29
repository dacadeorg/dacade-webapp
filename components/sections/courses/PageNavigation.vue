<template>
  <Section>
    <div
      class="text-center justify-center space-x-10 pt-3"
      :class="{ flex: prevUrl, 'w-full sm:flex': !prevUrl }"
    >
      <nuxt-link v-if="prevUrl" :to="localePath(prevUrl)">
        <ArrowButton
          :custom-style="buttonStyle"
          direction="left"
          :min-width-class="null"
        >
          {{ $t('nav.page.prev') }}
        </ArrowButton>
      </nuxt-link>
      <nuxt-link v-if="nextUrl" :to="localePath(nextUrl)">
        <ArrowButton
          :class="{
            'text-.5xl py-4.5 pl-6 pr-5.5': !prevUrl,
          }"
          :min-width-class="prevUrl ? 'min-w-28' : 'min-w-3/4 sm:min-w-64' "
          :custom-style="activeButtonStyle"
        >
          {{ !prevUrl ? $t('navigation.start') : $t('navigation.next') }}
        </ArrowButton>
      </nuxt-link>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Section from '@/components/sections/communities/_partials/Section.vue'
import ArrowButton from '@/components/ui/button/Arrow'

export default {
  components: {
    ArrowButton,
    Section,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      menus: 'communities/navigation/list',
    }),
    buttonStyle() {
      return {
        color: this.colors.textAccent,
        backgroundColor: 'transparent',
      }
    },
    activeButtonStyle() {
      return {
        color: this.colors.text,
        backgroundColor: this.colors.textAccent,
      }
    },
    list() {
      const result = this.menus.map((menu) => menu.items).flat()
      return result
    },
    currentIndex() {
      return this.list.findIndex(
        (el) =>
          this.stripTrailingSlash(this.localePath(el.link)) ===
          this.stripTrailingSlash(this.$route.fullPath)
      )
    },
    prevUrl() {
      const index = this.currentIndex - 1
      if (index >= 0 && this.list[index]?.link) {
        return this.list[index].link
      }
      return null
    },
    nextUrl() {
      const index = this.currentIndex + 1
      if (index < this.list.length - 1 && this.list[index]?.link) {
        return this.list[index].link
      }
      return null
    },
  },
  methods: {
    stripTrailingSlash(str) {
      let value = str
      if (str.includes('#')) {
        value = value.split('#')[0]
      }
      return value.endsWith('/') ? value.slice(0, -1) : value
    },
  },
}
</script>
