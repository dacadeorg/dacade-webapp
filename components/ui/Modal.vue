<template>
  <Popup :show="show" class="py-8" @close="$emit('close', $event)">
    <div
    :class="[sizeClasses]"
      class="bg-white my-auto rounded-3.5xl relative mx-auto"
    >
      <slot />
    </div>
  </Popup>
</template>

<script>
// import { mapGetters } from 'vuex'
import Popup from '@/components/ui/Popup'

export default {
  name: 'Modal',
  components: {
    Popup,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    size: {
      default: '',
      type: String,
    },
  },
  computed: {
    sizeClasses() {
      switch (this.size) {
        case 'medium':
          return 'w-11/12 md:w-9/12 lg:w-8/12 xl:w-1/2'
        default:
          return 'w-11/12 md:w-9/12 lg:w-8/12 xl:w-2/5'
      }
    },
  }
}
</script>
