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
  props: {
    submission: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  data() {
    return {
      translations: [
        {
          id: 'default',
          locale: 'en',
          name: 'English',
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
        this.translateSubmission({ currentLocale, newLocale })
      },
    },
  },
  methods : {
    changeLocale(locale) {
      this.$i18n.locale = locale
    },
    async translateSubmission({ currentLocale, newLocale }) {

      try {
        const fromLang = currentLocale ;
        const toLang = newLocale
        const text = this.submission.text;

        const API_KEY = process.env.NUXT_ENV_TRANSLATE_API_KEY;

        let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
        url += '&q=' + encodeURI(text);
        url += `&source=${fromLang}`;
        url += `&target=${toLang}`;

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        const { data } = await res.json();
        const translatedText = data.translations[0]?.translatedText;
        await this.$store.dispatch('communities/challenges/submissions/updateText', {
          text : translatedText})
        this.$forceUpdate();
      }
      catch (e) {
        console.log("There was an error with the translation request: ", e);
      }
    },

  },

}
</script>
