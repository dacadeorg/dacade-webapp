<template>
  <li class="relative mt-4 text-sm text-gray-500" :style="activeLinkStyle">
    <nuxt-link
      :to="localePath({ path: item.link, hash: subitem.link })"
      class="relative text-gray-500 opacity-50 hover:opacity-100"
      :class="{ 'activable-link': !subitem.exact }"
    >
      <span class="nav-label">{{ $t(subitem.label) }}</span>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    activeLinkStyle: {
      type: Object,
      default: () => ({}),
    },
    subitem: {
      type: Object,
      required: true,
    },
  },
}
</script>
