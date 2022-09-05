<template>
  <div
    v-if="locales.length > 1 && show"
    class="message-rectangle flex flex-col divide-y divide-solid divide-yellow-100"
  >
    <div class="pb-4">
      {{ $t('communities.navigation.language.text') }}
    </div>

    <div>
      <select
        v-model="currentLocale"
        class="translation outline-none focus:outline-none"
      >
        <option v-for="locale in locales" :key="locale.id" :value="locale.code">
          {{ locale.name }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      course: 'communities/courses/current',
    }),
    availableLocales() {
      const locales = {}
      this.$i18n.locales.map((locale) => {
        locales[locale.code] = locale
        return locale
      })
      return locales
    },
    selected() {
      return this.$i18n.locale
    },
    show() {
      return process.env.NUXT_ENV_SHOW_LANGUAGE_SELECTOR === 'true'
    },
    currentLocale: {
      get() {
        return this.course.locale
      },
      set(locale) {
        if (locale !== this.selected) {
          this.$i18n.setLocale(locale)
        }
      },
    },
    locales() {
      return (
        this.course?.translations
          ?.filter((locale) => locale)
          ?.map((translation) => ({
            id: translation.id,
            code: translation.locale,
            name: this.getLocale(translation.locale),
          })) || []
      )
    },
  },
  methods: {
    getLocale(locale) {
      return this.availableLocales[locale]?.name || locale
    },
  },
}
</script>
