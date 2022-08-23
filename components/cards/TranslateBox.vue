<template>
  <div class="w-full relative">
    <div v-if="currentText" :class="['-my-5', textContainerCssClasses]">
      <Markdown
        :class="textCssClasses"
        :value="currentText"
      />
    </div>
    <div class="py-6">
      <slot/>
    </div>
    <LanguageDropdown v-if="!disabled" v-model="currentLocale"/>
  </div>
</template>

<script>
import LanguageDropdown from "~/components/cards/LanguageDropdown";
import {Translate} from "~/utilities/Translate";
import Markdown from '@/components/ui/Markdown'

export default {
  name: "TranslateBox",
  components: {LanguageDropdown, Markdown},
  props: {
    text: {
      type: String,
      default: ''
    },
    defaultLocale: {
      type: String,
      default: 'en'
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
      currentLocale: '',
      currentText: '',
    }
  },
  watch: {
    defaultLocale(value) {
      this.currentLocale = value;
    },
    text(value) {
      this.currentText = value
    },
    currentLocale(value) {
      this.translate(value)
    }
  },
  mounted() {
    this.currentLocale = this.defaultLocale
    this.currentText = this.text;
  },
  methods: {
    async translate(newLocale) {
      try {
        this.currentText = await Translate({currentLocale: this.defaultLocale, newLocale, text: this.text})
      } catch (e) {
        console.log("There was an error with the translation request: ", e);
      }
    },
  }
}
</script>
