<template>
  <Section>
    <div class="text-center">
      <nuxt-link v-if="prevUrl" :to="prevUrl">
        <Button :custom-style="buttonStyle">
          <span
            class="flex text-left items-center text-.5xl"
          ><span class="mr-3 w-3"><ArrowRightIcon class="transform -rotate-180" /></span>
            Prev
          </span>
        </Button>
      </nuxt-link>
      <nuxt-link v-if="nextUrl" :to="nextUrl">
        <Button
          :class="{ 'w-1/3': !prevUrl }"
          :custom-style="activeButtonStyle"
        >
          <span class="flex text-left items-center text-.5xl">
            {{ !prevUrl ? 'Start' : 'Next' }}
            <span
              class="ml-auto w-3"
              :class="{ 'ml-7.5': prevUrl }"
            ><ArrowRightIcon /></span>
          </span>
        </Button>
      </nuxt-link>
    </div>
  </Section>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import Button from '@/components/ui/Button'
import Section from './partials/Section.vue'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  components: {
    ArrowRightIcon,
    Button,
    Section
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      communityData: 'communities/content',
      community: 'communities/current',
      colors: 'ui/colors',
      menus: 'communities/navigation'
    }),
    buttonStyle () {
      return {
        color: this.colors.textAccent,
        backgroundColor: 'transparent'
      }
    },
    activeButtonStyle () {
      return {
        color: this.colors.text,
        backgroundColor: this.colors.textAccent
      }
    },
    list () {
      const result = this.menus.map(menu => menu.items).flat()
      return result
    },
    currentIndex () {
      return this.list.findIndex(el => this.stripTrailingSlash(el.link) === this.stripTrailingSlash(this.$route.fullPath))
    },
    prevUrl () {
      const index = this.currentIndex - 1
      if (index >= 0) {
        return this.list[index].link
      }
      return null
    },
    nextUrl () {
      const index = this.currentIndex + 1
      if (index < this.list.length - 1) {
        return this.list[index].link
      }
      return null
    }
  },
  methods: {
    stripTrailingSlash (str) {
      return str.endsWith('/')
        ? str.slice(0, -1)
        : str
    }
  }
}
</script>
