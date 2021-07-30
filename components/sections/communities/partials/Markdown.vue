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
  p {
    max-width: 65ch;
  }

  pre {
    margin: 28px 0;
  }
  ol > li::before {
    color: var(--text-primary-color);
    font-weight: 400;
  }

  a {
    color: var(--text-primary-color);
    text-decoration: underline;
    font-weight: 400;
  }
  a:hover {
    color: var(--text-accent-color);
  }
  .prose {
    width: 100%;
    max-width: auto !important;
  }
  .prose h2 {
    font-weight: 500 !important;
  }
  code {
    font-size: 16px;
    font-weight: 400;
    color: var(--text-accent-color);
    &::before,
    &::after {
      content: '' !important;
    }

    max-width: fit-content;
  }
  @media (min-width: 1024px) {
    code {
      width: 125%;
    }
  }
  h2 {
    font-weight: 500 !important;
    margin-top: 24px !important;
    margin-bottom: 14px !important;
    font-size: 22px !important;
  }
  @media (max-width: 768px) {
    h2 {
      font-size: 20px !important;
    }
  }
}
</style>
