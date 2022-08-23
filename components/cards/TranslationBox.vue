<template>
  <div class="w-full relative">
    <div v-if="currentText" :class="['-my-5', textContainerCssClasses]">
      <Markdown :class="textCssClasses" :value="currentText"/>
    </div>
    <div v-if="translatable" class="flex divide-x pt-5 text-gray-400 divide-gray-200">
      <div :class="['pr-3', { 'cursor-pointer underline': !translated}]" @click="translate">
        <span>{{ $t(translated ? 'ui.translated' : 'ui.translate') }} {{ getLocaleName(currentLocale) }}</span>
      </div>
      <div v-if="translated" class="pl-3 cursor-pointer underline" @click="revert">
        <span>{{ $t('ui.translation.action.original', getDefaultLocale()) }} ({{ getLocaleName(getDefaultLocale()) }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import {Translate} from '~/utilities/Translate'
import Markdown from '@/components/ui/Markdown'

export default {
  name: 'TranslateBox',
  components: {Markdown},
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
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    translatable() {
      return this.currentLocale !== this.getDefaultLocale() && !this.disabled;
    },
    translated() {
      return this.locale !== this.getDefaultLocale()
    },
    locales() {
      const list = {};
      this.$i18n.locales.forEach((locale) => {
        list[locale.code] = locale
      })
      return list;
    }
  },
  watch: {
    defaultLocale(value) {
      this.locale = value || 'en'
      this.translate()
    },
    text(value) {
      this.currentText = value
      this.locale = this.getDefaultLocale()
    },
    currentLocale(value) {
      this.locale = this.getDefaultLocale()
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
    }
  },
}
</script>
