<template>
  <div v-if="content" :style="themeStyles" class="prose">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="markdown-content" v-html="content" />
    <!-- :style="themeStyles" -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypeRaw from 'rehype-raw'
import remarkRehype from 'remark-rehype'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import Highlighter from '@/utilities/Highlighter'

export default {
  name: 'Markdown',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      content: '',
    }
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
  watch: {
    value(newValue) {
      this.parse(newValue)
    },
  },

  mounted() {
    this.parse(this.value)
  },
  methods: {
    async parse(content) {
      const { value } = await unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkGfm)
        .use(Highlighter)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeExternalLinks, { target: '_blank' })
        .use(rehypeSlug)
        .use(rehypeStringify)
        .process(content)
      this.content = value
    },
  },
}
</script>
<style lang="scss" scoped></style>
