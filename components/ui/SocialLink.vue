<template>
  <a
    :href="link.url"
    target="__blank"
    :title="link.title"
    class="
      h-14
      w-14
      border border-solid
      bg-gray-50
      border-gray-200
      box-border
      inline-flex
      items-center
      justify-center
      text-lg
      rounded-full
    "
  >
    <font-awesome-icon :icon="['fab', link.icon]" />
  </a>
</template>

<script>
export default {
  name: 'SocialLink',
  props: {
    link: {
      default: () => {},
      type: Object,
    },
  },
}
</script>
