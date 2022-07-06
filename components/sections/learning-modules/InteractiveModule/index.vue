<template>
  <InteractiveModuleWrapper
    :title="stepTitle" :subtitle="stepSubtitle" :section-title="data.title"
    :percentage="completion"
    duration="15 minutes">
    <div v-if="!started && !ended">
      {{ data.description }}
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
      {{ data.closing.text }}
    </div>
  </InteractiveModuleWrapper>
</template>

<script>
import {mapGetters} from 'vuex'
import InteractiveModuleWrapper from "./Wrapper";
import Button from "~/components/ui/button";
import InteractiveModuleQuestion from "~/components/sections/learning-modules/InteractiveModule/Question";

export default {
  name: 'InteractiveModule',
  components: {
    InteractiveModuleQuestion,
    Button,
    InteractiveModuleWrapper,
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
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    questions() {
      return this.data?.questions?.length ? this.data.questions : [];
    },
    stepTitle() {
      if (this.ended && this.data?.closing?.title) {
        return this.data?.closing?.title
      }
      return this.data?.title
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
      this.ended = true;
      this.started = false;
      this.$store.dispatch('communities/navigation/showPageNavigation');
    },
    goToNextQuestion() {
      this.disabled = true;
      setTimeout(() => {
        this.nextQuestion()
        this.disabled = false;
      }, 1000);
    },
  }
}
</script>
