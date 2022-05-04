<template>
  <div v-if="!loading">
    <div v-if="markdown" :style="themeStyles" class="prose">
      <h2 v-if="markdown.data.title">{{ markdown.data.title }}</h2>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="markdown-content" v-html="content" />
      <!-- :style="themeStyles" -->
    </div>
  </div>
  <Loader v-else community-styles class="py-32" />
</template>

<script>
import { mapGetters } from 'vuex'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeStringify from 'rehype-stringify'
import ExtractToc from 'remark-extract-toc'
import CloneDeep from 'lodash.clonedeep'
import rehypeSlug from 'rehype-slug'
import Slugger from 'github-slugger'
import Highlighter from '@/utilities/Highlighter'
import Loader from '@/components/ui/Loader.vue'

export default {
  name: 'Markdown',
  components: {
    Loader,
  },
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      markdown: '',
      content: '',
      loading: false,
    }
  },
  async fetch() {
    this.loading = true
    const content = await fetch(this.url).then((response) => response.text())
    this.markdown = matter(content)

    this.handleNavigation(this.markdown.content)

    const { value } = await unified()
      .use(remarkParse)
      .use(Highlighter)
      .use(remarkRehype)
      .use(rehypeExternalLinks, { target: '_blank' })
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(this.markdown.content)
    this.content = value
    this.loading = false
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
      menus: 'communities/navigation/list',
    }),
    themeStyles() {
      return {
        '--text-accent-color': this.colors.textAccent,
      }
    },
  },
  methods: {
    handleNavigation(markdown) {
      const processor = unified().use(remarkParse).use(ExtractToc)
      const node = processor.parse(markdown)
      const tree = processor.runSync(node)
      const data = CloneDeep(this.menus)
      const slugger = new Slugger()
      const list = data.map((menu) => {
        if (menu.id !== 'learning-modules') {
          return menu
        }
        menu.items = menu.items.map((item) => {
          if (item.id !== this.$route.params.id) {
            return item
          }
          slugger.reset()
          item.subitems = tree.map((el) => {
            return {
              label: String(el.value).replace(/^\d+\.+\d\s*/, ''),
              link: `${slugger.slug(el.value)}`,
              exact: false,
            }
          })
          return item
        })
        return menu
      })

      this.$store.commit('communities/navigation/setList', list)
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
    text-shadow: none !important;
    font-size: 16px; // 1.2 rem?
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
