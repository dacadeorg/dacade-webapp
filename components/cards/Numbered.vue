<template>
  <div>
    <div class="w-14 h-14 border border-solid border-gray-400 text-gray-400 font-medium rounded-full flex items-center justify-center">
      {{ index }}
    </div>
    <div class="py-4.5 text-base">
      <span class="font-medium ">{{ title }}</span> <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberedCard',
  props: {
    index: {
      default: 1,
      type: [Number, String]
    },
    title: {
      default: '',
      type: String
    },
    text: {
      default: '',
      type: String
    }
  }
}
</script>
