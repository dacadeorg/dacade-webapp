<template>
  <div class="w-full relative">
    <div v-if="currentText" :class="['-my-5', textContainerCssClasses]">
      <Markdown :class="textCssClasses" :value="currentText" />
    </div>
    <div v-if="translatable" class="pt-5 text-gray-400">
      <div v-if="loading">
        <span>{{ $t('ui.translating') }}...</span>
      </div>
      <div v-else class="flex divide-x divide-gray-200">
        <div
          :class="['pr-3', { 'cursor-pointer underline': !translated }]"
          @click="translate"
        >
          <span
            >{{ $t(translated ? 'ui.translated' : 'ui.translate') }}
            {{ getLocaleName(currentLocale) }}</span
          >
        </div>
        <div
          v-if="translated"
          class="pl-3 cursor-pointer underline"
          @click="revert"
        >
          <span
            >{{ $t('ui.translation.action.original', getDefaultLocale()) }} ({{
              getLocaleName(getDefaultLocale())
            }})</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Translate } from '~/utilities/Translate'
import Markdown from '@/components/ui/Markdown'

export default {
  name: 'TranslationBox',
  components: { Markdown },
  props: {
    text: {
      type: String,
      default: '',
    },
    defaultLocale: {
      type: String,
      default: 'en',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textContainerCssClasses: {
      type: [String, Object, Array],
      default: null,
    },
    textCssClasses: {
      type: [String, Object, Array],
      default: null,
    },
  },
  data() {
    return {
      currentText: '',
      locale: '',
      loading: false,
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    translatable() {
      return (
        this.currentLocale !== this.getDefaultLocale() &&
        !this.disabled &&
        this.getLocaleName(this.getDefaultLocale())
      )
    },
    translated() {
      return this.locale !== this.getDefaultLocale()
    },
    locales() {
      const values = [
        ...this.$i18n.locales,
        {
          code: 'fr',
          name: 'Français',
        },
      ]
      const list = {}
      values.forEach((locale) => {
        list[locale.code] = locale
      })
      return list
    },
  },
  watch: {
    defaultLocale(value) {
      this.locale = value || 'en'
      this.loading = false
      this.translate()
    },
    text(value) {
      this.currentText = value
      this.locale = this.getDefaultLocale()
      this.loading = false
    },
    currentLocale(value) {
      this.locale = this.getDefaultLocale()
      this.loading = false
      this.translate()
    },
  },
  created() {
    this.currentText = this.text
    this.locale = this.getDefaultLocale()
    this.translate()
  },
  methods: {
    async translate() {
      if (this.translated) return
      this.loading = true
      try {
        this.currentText = await Translate({
          currentLocale: this.getDefaultLocale(),
          newLocale: this.currentLocale,
          text: this.text,
        })
        this.locale = this.currentLocale
      } catch (e) {
        console.log('There was an error with the translation request: ', e)
      }
      this.loading = false
    },
    getDefaultLocale() {
      return this.defaultLocale || 'en'
    },
    revert() {
      this.currentText = this.text
      this.locale = this.getDefaultLocale()
    },
    getLocaleName(code) {
      return this.locales[code]?.name
    },
  },
}
</script>
