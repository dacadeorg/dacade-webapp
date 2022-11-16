<template>
  <div class="bg-red-50 help text-sm rounded-md border border-red-100 text-red-900 px-5 py-2">
    <p class="font-medium capitalize">{{ error?.message }}</p>
    <ul v-if="error?.details" class="pt-1 list-disc list-inside">
      <li v-for="(key) in Object.keys(error.details)" :key="key">
        {{ error?.details[key] }}
      </li>
    </ul>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "ErrorBox",
  props: {
    error: {
      type: [Error, Object],
      default: null,
    },
  }
}
</script>
