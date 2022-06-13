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
          v-for="translation in translations"
          :key="translation.id"
          :value="translation.locale"
        >
          {{ translation.name }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-console */

export default {
  data() {
    return {
      translations: [
        {
          id: 'default',
          locale: 'en',
          name: 'English',
        },
        {
          id: 'no',
          locale: 'no',
          name: 'Norwegian',
        },
        // spanish
        {
          id: 'es',
          locale: 'es',
          name: 'Spanish',
        },

        {
          id: 'fr',
          locale: 'fr',
          name: 'Français',
        }


      ],
      locale: 'en',
    }
  },
  computed: {

    currentLocale: {
      get() {
        return this.locale
      },
      set(locale) {
        const currentLocale = this.locale
        const newLocale = locale
        this.locale = newLocale
        this.$emit('translateSubmission', { currentLocale, newLocale })
      },
    },
  },
  methods : {
    changeLocale(locale) {
      this.$i18n.locale = locale
    }
  },

}
</script>
