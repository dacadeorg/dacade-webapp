<template>
  <div v-if="markdown" :style="themeStyles" class="prose">
    <h2 v-if="markdown.data.title">{{ markdown.data.title }}</h2>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="markdown-content" v-html="$md.render(markdown.content)" />
    <!-- :style="themeStyles" -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    themeStyles() {
      return {
        '--text-accent-color': this.colors.textAccent,
      }
    },
  },
}
</script>

<style lang="scss">
.markdown-content {
  // h1,
  // h2,
  // h3 {
  //   font-weight: bold;
  //   margin-top: 1rem;
  //   margin-bottom: 1rem;
  // }

  // .hljs code {
  //   color: white;
  // }

  // p {
  //   margin-top: 2rem;
  //   margin-bottom: 2rem;
  // }

  // pre {
  //   margin: 28px 0;
  //   padding: 20px 22px;
  //   border-radius: 4px;
  // }

  // a {
  //   text-decoration: underline;
  // }

  // code span,
  // .hljs code {
  //   font-size: 1rem;
  // }

  // img {
  //   margin-top: 2rem;
  // }

  code {
    color: var(--text-accent-color);
    &::before,
    &::after {
      content: '' !important;
    }
  }
}
</style>
