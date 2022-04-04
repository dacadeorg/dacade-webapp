<template>
  <div class="text-left">
    <span
      class="uppercase block text-xs font-semibold text-gray-500 leading-relaxed"
      >{{ $t('nav.language') }}</span
    >
    <div class="space-y-4 mt-2">
      <div
        v-for="locale in availableLocales"
        :key="locale.code"
        class="flex justify-between"
        :class="{ 'text-gray-500': locale.code !== selected }"
      >
        <div>
          <nuxt-link
            :to="switchLocalePath(locale.code)"
            :class="{
              'font-medium': locale.code === selected,
              'font-normal': locale.code !== selected,
            }"
            >{{ locale.name }}</nuxt-link
          >
        </div>
        <div v-if="locale.code === selected" class="text-primary">
          <Checkmark />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkmark from '~/assets/icons/checkmark.svg?inline'

export default {
  name: 'LanguageList',
  components: {
    Checkmark,
  },
  props: {
    value: {
      default: 0,
      type: Number,
    },
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales
    },
    selected() {
      return this.$i18n.locale
    },
  },
}
</script>
