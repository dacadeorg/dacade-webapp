<template>
  <component :is="link ? 'nuxt-link' : 'span'" :to="link" :class="[sizeClasses, shapeClasses, { 'cursor-pointer': user }]"
    class="inline-flex relative align-middle">
    <span :class="[shapeClasses]" :style="{
      backgroundColor: color,
    }"
      class="bg-primary h-full w-full flex overflow-hidden text-white items-center justify-center uppercase leading-none align-middle relative z-0">
      <img v-if="user && user.avatar" :src="user.avatar" alt="img" class="object-cover w-full h-full" />
      <span v-if="user && !user.avatar">{{ initials }}</span>
      <img v-if="icon" :src="icon" class="p-2" />
      <img v-if="image" :src="image" class="p-0 object-cover w-full h-full" />
    </span>
    <span v-if="showVerificationBadge" :class="[VerifiedIconClasses]" class="absolute z-10 rounded-full">
      <VerifiedIcon class="w-100 h-100" />
    </span>
  </component>
</template>

<script>
import VerifiedIcon from '~/assets/icons/verified.svg?inline-block'
export default {
  name: 'Avatar',
  components: {
    VerifiedIcon,
  },
  props: {
    hideVerificationBadge: {
      default: false,
      type: Boolean,
    },
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
      default: null,
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
      if (!this.user || !this.user.username || !this.useLink) return null
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
    VerifiedIconClasses() {
      switch (this.size) {
        case 'medium':
        case 'medium-fixed':
        case 'small-fixed':
          return 'w-1/3 h-1/3 right-0 -bottom-1/100'
        case 'mini':
          return 'w-3/6 h-3/6 -right-1/10 -bottom-1/10'
        default:
          return 'w-1/5 h-1/5 right-1/10 bottom-1/100'
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
    },
    kycVerified() {
      return this.user?.kycStatus === 'VERIFIED'
    },
    showVerificationBadge() {
      return !this.hideVerificationBadge && this.kycVerified
    },
  },
}
</script>
