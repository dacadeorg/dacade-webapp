<template>
  <div class="mt-4 flex items-center">
    <span class="w-6 h-4"><Markdown /></span>
    <span class="text-sm text-gray-500"
      ><a
        href="https://www.markdownguide.org/cheat-sheet/"
        class="underline cursor-pointer"
        target="__blank"
        >Markdown</a
      >
      is supported</span
    >
  </div>
</template>

<script>
import Markdown from '~/assets/icons/markdown-fill.svg?inline'

export default {
  name: 'MarkdownIcon',

  components: {
    Markdown,
  },
}
</script>
