<template>
  <span class="relative block text-sm">
    <LinkAction
      :item="item"
      :is-active="isActive"
      :active-link-style="activeLinkStyle"
      @goToLink="goToLink"
    >
      <LinkContent :item="item" :is-active="isActive" :expanded="expanded" />
    </LinkAction>
    <ul
      v-if="
        item.subitems &&
        item.subitems.length &&
        isCurrentLink(item.link, false) &&
        expanded
      "
    >
    <!-- <Skeleton :loading="loading" :count="7" height="10px" className="mt-1"> -->
      <SubLink
        v-for="(subitem, j) in item.subitems"
        :key="j"
        :item="item"
        :subitem="subitem"
        :active-link-style="activeLinkStyle"
      />
    <!-- </Skeleton> -->
    </ul>
  </span>
</template>
<script>
import { mapGetters } from 'vuex'
import LinkContent from './content.vue'
import LinkAction from './action.vue'
import SubLink from './sub.vue'
// import Skeleton from '@/components/ui/Skeleton.vue'

export default {
  components: {
    LinkContent,
    LinkAction,
    SubLink,
    // Skeleton
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    loading: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      expanded: true,
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    isActive() {
      return this.isCurrentLink(this.item.link, this.item.exact)
    },
    activeLinkStyle() {
      return {
        color: this.colors.primary,
      }
    },
  },
  methods: {
    goToLink() {
      if (this.isCurrentLink(this.item.link, this.item.exact)) {
        this.expanded = !this.expanded
        return
      }
      this.$router.push(this.localePath(this.item.link))
    },
    isCurrentLink(link, exact = false) {
      if (exact) {
        return this.$route.path === this.localePath(link)
      }
      return this.$route.path.includes(this.localePath(link))
    },
  },
}
</script>
