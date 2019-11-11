<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <div class="mb-4">
          <h1>
            <b>
              ADMIN
            </b>
          </h1>
        </div>
        <div>
          <b-nav vertical class="w-25">
            <b-nav-item>
              <h2>
                <i>
                  <nuxt-link to="/admin/evaluations/">
                    SUBMISSIONS
                  </nuxt-link>
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i>
                  <nuxt-link to="/admin/functions/">
                    FUNCTIONS
                  </nuxt-link>
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i>
                  PAYMENTS
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i>
                  <nuxt-link to="/admin/stats/">
                    STATS
                  </nuxt-link>
                </i>
              </h2>
            </b-nav-item>
            <b-nav-item>
              <h2>
                <i>
                  <nuxt-link to="/">
                    DACADE
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
  }
}
</script>
<style scoped>
a {
  color: #53d1af;
}

a:hover{
  color: #53d1af;
  font-size: 1.2em;
  margin-left: 0.4em;
  text-decoration: none;
}

.row {
  margin: 3em;
}
</style>
