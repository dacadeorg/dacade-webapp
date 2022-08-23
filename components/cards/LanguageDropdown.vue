<template>
  <div
    class="message-rectangle flex flex-col divide-y divide-solid divide-yellow-100"
  >
    <div class="pb-4">
      {{ $t('communities.navigation.language.translate') }}
    </div>

    <div>
      <select
        v-model="currentLocale"
        class="translation outline-none focus:outline-none"
      >
        <option
          v-for="locale in availableLocales"
          :key="locale.code"
          :value="locale.code"
        >
          {{ locale.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageDropdown",
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    currentLocale: {
      get() {
        return this.value
      },
      set(locale) {
        this.$emit('input', locale)
      },
    },
    availableLocales() {
      return [
        ...this.$i18n.locales,
        {
          code: 'fr',
          name: 'Français',
        },
      ]
    },
  },
}
</script>
