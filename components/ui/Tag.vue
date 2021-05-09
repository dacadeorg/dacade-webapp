<template>
  <div class="px-3 py-1 bg-gray-200 font-medium text-gray-600 leading-none  text-center inline-flex items-center justify-center rounded-full text-md">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    value: {
      default: '',
      type: String
    },
    size: {
      default: 'small',
      type: String
    },
    customStyle: {
      default: null,
      type: Object
    }
  },
  computed: {
    sizeClasses () {
      switch (this.size) {
        case 'medium':
          return 'w-6 h-6 text-sm'
        default:
          return 'h-4 w-4 text-xs'
      }
    }
  }
}
</script>
