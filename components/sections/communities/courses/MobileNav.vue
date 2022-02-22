<template>
  <div>
    <div
      :style="activeLinkStyle"
      class="text-sm font-medium -mt-4 relative pt-4 py-4 md:py-7 border-b-2"
      :class="[showTopBorder === false ? 'border-t-2' : '-mt-12']"
    >
      <span class="flex">
        <div v-if="state.visiblity === true" class="pr-1 mt-2">
          <ChevronBottomIcon />
        </div>
        <div v-else>
          <ChevronRightIcon />
        </div>
        <p class="px-4" @click="state.visiblity = !state.visiblity">
          {{ $t('nav.mobile.pages') }}
        </p>
      </span>
      <div v-if="state.visiblity === true" class="px-10 py-2 pb-0 -mb-2">
        <Navigation />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Navigation from '@/components/sections/communities/courses/Navigation'
import ChevronRightIcon from '~/assets/icons/chevron-right.svg?inline'
import ChevronBottomIcon from '~/assets/icons/chevron-bottom.svg?inline'

export default {
  components: {
    Navigation,
    ChevronRightIcon,
    ChevronBottomIcon,
  },
  props: {
    showTopBorder: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      state: {
        visiblity: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      community: 'communities/current',
      colors: 'ui/colors',
    }),
    activeLinkStyle() {
      return {
        color: this.colors.textAccent,
      }
    },
  },
  methods: {
    htmlTagsCleanup(value) {
      return value.replace(
        /<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g,
        ''
      )
    },
  },
}
</script>
