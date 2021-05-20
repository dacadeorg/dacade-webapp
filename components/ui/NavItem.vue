<template>
  <li :class="`nav-${type}`">
    <nuxt-link :to="to">
      <slot />
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    type: {
      default: 'item',
      type: String,
    },
    to: {
      default: '/',
      type: String,
    },
  },
}
</script>
