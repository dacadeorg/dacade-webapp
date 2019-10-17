<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="mb-4">
          <h1>
            <b>
              FUNCTIONS
            </b>
          </h1>
        </div>
        <div class="mb-4">
          <b-button @click="back()">
            BACK
          </b-button>
        </div>
        <div>
          <b-nav vertical class="w-25">
            <b-nav-item>
              <h2>
                <i>
                  <nuxt-link to="/admin/test/">
                    test
                  </nuxt-link>
                </i>
              </h2>
            </b-nav-item>
          </b-nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */

export default {
  data() {
    return {
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.row {
  margin: 3em;
}
</style>
