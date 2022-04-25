<template>
  <transition name="slide" type="animation">
    <div class="w-full flex justify-center">
      <div
        v-if="error"
        class="bg-red-50 border border-red-100 text-red-900 px-4 py-3 rounded-md relative w-full max-w-md justify-center flex"
        role="alert"
      >
        <span class="block sm:inline">
          {{ $t(error.code || error.message) }}
        </span>
      </div>
      <!-- <div v-if="busy" class="notification max-w-md justify-center flex">
        <span>
          <i class="fa fa-clock-o mr-2 color-default" aria-hidden="true" />
        </span>
        LOADING
      </div> -->
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      busy: 'busy',
      error: 'error',
    }),
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (this.busy || this.error) {
          this.$store.commit('setBusy', false)
          this.$store.commit('setError', null)
        }
      },
    },
  },
}
</script>
