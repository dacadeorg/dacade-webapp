<template>
  <div
    class="border border-solid rounded-3.5xl px-7 py-9 w-full"
  >
    <div class="mx-auto w-full text-left">
      <div class="w-20 h-20 p-5 mx-auto rounded-full mb-5" :style="{backgroundColor: data.community.colors.primary,}">
        <img
          :src="data.metadata.image"
          class="relative"
        />
      </div>
      <p class="text-sm font-medium text-center">
        {{ data.metadata.name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AchievementCard',
  props: {
    data: {
      type: Object,
      required: true,
    }
  }
}
</script>
