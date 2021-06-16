<template>
  <div class="container">
    <div class="row align-items-center error-page-container">
      <div class="col-md-6 mx-auto text-center">
        <div v-if="error.statusCode === 404">
          <h1>Page not found</h1>
          <p>{{ error.message }}</p>
        </div>
        <div v-else>
          <h1>Oops!</h1>
          <p>An error occured and your request couldn't be completed.</p>
        </div>
        <n-link to="/"> Home page </n-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  }, // If you prefers you can set a custom layout for the error page
}
</script>
<style lang="scss" scoped>
.error-page-container {
  min-height: 80vh;
}
</style>
