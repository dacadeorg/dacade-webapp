<template>
  <InteractiveModuleWrapper
    :title="stepTitle" :subtitle="stepSubtitle" :section-title="data.title"
    :percentage="completion"
    duration="15 minutes">
    <div v-if="!loading">
      <div v-if="!started && !ended">
        <Markdown :value="data.description"/>
        <div class="mx-auto w-full text-center mt-8">
          <Button type="outline-primary" community-styles @click="start"> Understood
          </Button>
        </div>
      </div>
      <div v-else class="relative">
        <div v-for="(question, index) in data.questions" :key="index">
          <InteractiveModuleQuestion
            v-if="current === index" :data="question" :disable="disabled"
            @correct="goToNextQuestion"/>
        </div>
      </div>
      <div v-if="ended">
        <Markdown :value="data.closing.text"/>
      </div>
      <Hint v-if="!isLoggedIn" class="mt-6">
        <p>Since you are not logged in, your progress won't be saved</p>
        <p>
          <nuxt-link :to="localePath('/login')">
            Login
          </nuxt-link>
          to make sure your progress doesn't get lost
        </p>
      </Hint>
    </div>
    <Loader v-else class="h-48" community-styles/>
  </InteractiveModuleWrapper>
</template>

<script>
import {mapGetters} from 'vuex'
import InteractiveModuleWrapper from "./Wrapper";
import Button from "~/components/ui/button";
import InteractiveModuleQuestion from "~/components/sections/learning-modules/InteractiveModule/Question";
import Markdown from '@/components/ui/Markdown'
import Loader from "~/components/ui/Loader";
import Hint from "~/components/ui/Hint";

export default {
  name: 'InteractiveModule',
  components: {
    Hint,
    Loader,
    InteractiveModuleQuestion,
    Button,
    InteractiveModuleWrapper,
    Markdown,
  },
  props: {
    data: {
      default: null,
      type: Object,
    },
  },
  data() {
    return {
      started: false,
      current: 0,
      disabled: false,
      ended: false,
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
      isLoggedIn: 'auth/check',
    }),
    questions() {
      return this.data?.questions?.length ? this.data.questions : [];
    },
    stepTitle() {
      if (this.ended && this.data?.closing?.title) {
        return this.data?.closing?.title
      }
      return this.data?.subtitle
    },
    stepSubtitle() {
      if (this.started) {
        return 'Knowledge test - Select the best option'
      }
      if (this.ended) {
        return 'Lesson end'
      }
      return 'Explanation'
    },
    completion() {
      if (this.ended) {
        return 100
      }
      return Math.round(this.current / this.questions.length * 100)
    }
  },
  created() {
    this.$store.dispatch('communities/navigation/hidePageNavigation');
  },
  mounted() {
    this.$store.dispatch('communities/navigation/hidePageNavigation');
    this.checkIfAnswered();
  },
  beforeDestroy() {
    this.$store.dispatch('communities/navigation/showPageNavigation');
  },
  methods: {
    start() {
      this.started = true;
    },
    nextQuestion() {
      this.current++;
      if (this.questions.length > this.current) return;
      this.completed();
    },
    goToNextQuestion() {
      this.disabled = true;
      setTimeout(() => {
        this.nextQuestion()
        this.disabled = false;
      }, 1000);
    },
    completed() {
      this.ended = true;
      this.started = false;
      this.$store.dispatch('communities/navigation/showPageNavigation');
      if (!this.isLoggedIn) return
      this.$store.dispatch('communities/courses/learningModules/submitModuleAnswer', this.data.ref);
    },
    async checkIfAnswered() {
      try {
        if (!this.isLoggedIn) return
        const answers = await this.$store.dispatch('communities/courses/learningModules/checkAnswer', this.data.ref);
        if (!answers.length) return;
        this.current = this.questions.length;
        this.started = true;
        this.ended = true;
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
