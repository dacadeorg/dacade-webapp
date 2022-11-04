<template>
  <component
    :is="link ? 'nuxt-link' : 'span'" :to="link"
    :class="[sizeClasses, shapeClasses, { 'cursor-pointer': user }]" :style="{
      backgroundColor: color,
    }"
    class="bg-primary inline-flex overflow-hidden text-white items-center justify-center uppercase leading-none align-middle">
    <img v-if="user && user.avatar" :src="user.avatar" alt="img" class="object-cover w-full h-full" />
    <span v-if="user && !user.avatar">{{ initials }}</span>
    <img v-if="icon" :src="icon" class="p-2" />
    <img v-if="image" :src="image" class="p-0 object-cover w-full h-full" />
  </component>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    icon: {
      default: null,
      type: String,
    },
    image: {
      default: null,
      type: String,
    },
    color: {
      default: null,
      type: String,
    },
    user: {
      default: () => {
        return {}
      },
      type: Object,
    },
    size: {
      default: 'small',
      type: String,
    },
    shape: {
      default: 'circular',
      type: String,
    },
    useLink: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    initials() {
      return this.user?.displayName ? this.user?.displayName[0] : null
    },
    link() {
      if (!this.user || !this.user.username || !this.useLink) return null;
      return this.localePath(`/profile/${this.user.username}`)
    },
    sizeClasses() {
      switch (this.size) {
        case 'extra':
          return 'w-32 h-32 text-4xl'
        case 'large':
          return 'w-15 h-15 text-2xl'
        case 'medium':
          return 'w-10 h-10 sm:h-12 sm:w-12 md:w-15 md:h-15 text-xl sm:text-2xl'
        case 'medium-fixed':
          return 'w-10 h-10 text-2xl'
        case 'small-fixed':
          return 'w-7 h-7 text-xl'
        case 'mini':
          return 'w-5 h-5 text-xl'
        default:
          return 'w-9 h-9 text-lg'
      }
    },
    shapeClasses() {
      switch (this.shape) {
        case 'rounded':
          return 'rounded-xl'
        case 'rounded-3xl':
          return 'rounded-3xl'
        case 'full':
          return 'rounded-full'
        case 'squared':
          return 'rounded-none'
        default:
          return 'rounded-full'
      }
    }
  }
}
</script>
