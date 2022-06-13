<template>
  <UserCard
    :user="submission.user"
    :timestamp="{
      date: submission.created_at,
      text: $t('submissions.submitted'),
    }"
  >
    <div class="pb-6">
      <div class="-my-5">
        <Markdown
          class="text-base md:text-lg leading-normal text-gray-700"
          :value="submission.text"
        />
      </div>
    </div>
    <div
      class="inline-grid space-y-2 md:space-y-5 md:contents mt-6 space-x-0 md:space-x-2"
    >
      <ArrowButton
        v-if="submission.link"
        :link="submission.link"
        target="__blank"
        :custom-style="primaryButtonStyles"
        type="outline-primary"
      >
        {{ $t('submissions.link.github') }}
      </ArrowButton>

<SubmissionTranslate @translateSubmission="translateSubmission" />
    </div>
  </UserCard>
</template>
<script>
/* eslint-disable no-console */
import { mapGetters } from 'vuex'
import ArrowButton from '@/components/ui/button/Arrow'
import UserCard from '@/components/cards/User'
import Markdown from '@/components/ui/Markdown'
import SubmissionTranslate from "~/components/sections/submissions/_partials/SubmissionTranslate";


export default {
  name: 'SubmissionViewCard',
  components: {
    SubmissionTranslate,
    UserCard,
    ArrowButton,
    Markdown,
  },
  props: {
    submission: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    badgeButtonStyles() {
      return {
        backgroundColor: this.colors.textAccent,
        color: this.colors.text,
      }
    },
    primaryButtonStyles() {
      return {
        borderColor: this.colors.textAccent,
        color: this.colors.text,
        backgroundColor: this.colors.textAccent,
        '--button-color--hover': this.colors.text,
        '--button-background-color--hover': this.colors.accent,
        '--button-border-color--hover': this.colors.accent,
      }
    },
    outlineButtonStyles() {
      return {
        borderColor: this.colors.textAccent,
        color: this.colors.textAccent,
        '--button-color--hover': this.colors.text,
        '--button-background-color--hover': this.colors.textAccent,
        '--button-border-color--hover': this.colors.textAccent,
      }
    },
  },

  methods: {
    async translateSubmission({ currentLocale, newLocale }) {

      try {
        const fromLang = currentLocale ;
        const toLang = newLocale
        const text = this.submission.text;

        // Todo replace env with a new one
        const API_KEY = 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM';

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
  }
}
</script>
