<template>
  <transition name="slide" type="animation">
    <div v-if="error" class="notification is-danger">
      {{ error.message }}
    </div>
    <div v-if="busy" class="notification is-danger">
      LOADING
    </div>
  </transition>
</template>

<script>
import apiJobMixin from '@/mixins/apiJobMixin'

export default {
  mixins: [apiJobMixin]
}
</script>
