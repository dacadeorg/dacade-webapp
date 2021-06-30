<template>
  <Popup :show="show" @close="$emit('close', $event)">
    <div class="bg-white my-auto relative w-2/5 rounded-3.5xl relative">
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
  },
}
</script>
