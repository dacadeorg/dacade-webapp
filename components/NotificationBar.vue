<template>
  <transition name="slide" type="animation">
    <div v-if="error" class="notification">
      {{ error.message }}
    </div>
    <div
      v-if="busy"
      class="notification"
    >
      <span>
        <i class="fa fa-clock-o mr-2 color-default" aria-hidden="true" />
      </span>
      LOADING
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      busy: 'busy',
      error: 'error'
    })
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        if (this.busy || this.error) {
          this.$store.commit('setBusy', false)
          this.$store.commit('setError', null)
        }
      }
    }
  }
}
</script>
<style scoped>
.notification {
  background: rgba(255,255,255,.9);
  border: none;
  border-left: 6px solid #acb2be;
  border-radius: 0.35rem;
  color: rgba(0,0,0,.7);
  font-style: italic;
  font-weight: bold;
  padding: 1em;
  padding-right: 2em;
  display: inline-block;
  margin: 1em;
}
</style>
