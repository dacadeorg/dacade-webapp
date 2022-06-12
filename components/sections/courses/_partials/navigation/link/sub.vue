<template>
  <Skeleton :loading="loading" height="20px">
  <li class="relative mt-4 text-sm text-gray-500" :style="activeLinkStyle">
    <nuxt-link
      :to="localePath({ path: item.link, hash: subitem.link })"
      class="relative text-gray-500 opacity-50 hover:opacity-100"
      :class="{ 'activable-link': !subitem.exact }"
    >
      <span class="nav-label">{{ $t(subitem.label) }}</span>
    </nuxt-link>
  </li>
  </Skeleton>
</template>

<script>
import Skeleton from '@/components/ui/Skeleton.vue'
export default {
  components:{
    Skeleton
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    activeLinkStyle: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      default: true,
      type: Boolean
    },
    subitem: {
      type: Object,
      required: true,
    },
  },
}
</script>
