<template>
  <span
    :class="[sizeClasses, shapeClasses,  'cursor-pointer']"

    class="bg-primary inline-flex overflow-hidden text-white items-center justify-center uppercase leading-none align-middle"

  >
    <img v-if="image" :src="image" class="p-0" />
  </span>
</template>

<script>
export default {
  name: 'CertificateBadge',
  props: {
    image: {
      default: null,
      type: String,
    },
    size: {
      default: 'small',
      type: String,
    },
    shape: {
      default: 'circular',
      type: String,
    },
  },
  computed: {
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
        case 'full':
          return 'rounded-full'
        case 'squared':
          return 'rounded-none'
        default:
          return 'rounded-full'
      }
    },
  },
  methods: {

  },
}
</script>
