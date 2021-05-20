/* eslint-disable vue/no-v-html */
<template>
  <div v-if="markdown">
    <h2>{{ markdown.data.title }}</h2>
    <div class="markdown-content" v-html="$md.render(markdown.content)" />
  </div>
</template>

<script>
import matter from 'gray-matter'
export default {
  name: 'Markdown',
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      markdown: '',
    }
  },
  async fetch() {
    const content = await fetch(this.url).then((response) => response.text())
    this.markdown = matter(content)
  },
}
</script>

<style lang="scss">
.markdown-content {
  h1,
  h2,
  h3 {
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .hljs code {
    color: white;
  }

  p {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  pre {
    padding: 2rem;
  }

  code span,
  .hljs code {
    font-size: 1rem;
  }

  img {
    margin-top: 2rem;
  }

  code {
    color: rgb(49, 194, 77);
  }
}
</style>
