<template>
  <div>
    <div v-if="!answering">
      <Markdown :value="data.text"/>
      <div class="mx-auto w-full text-center mt-8">
        <Button type="outline-primary" community-styles @click="start"> Understood
        </Button>
      </div>
    </div>
    <div v-else class="relative">
      <InteractiveModuleQuestion
        :data="data.question" :disable="disabled"
        @retry="disabled = false"
        @wrong="disabled = true"
        @correct="completed"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Button from "~/components/ui/button";
import InteractiveModuleQuestion from "~/components/sections/learning-modules/InteractiveModule/Question";
import Markdown from '@/components/ui/Markdown'

export default {
  name: 'InteractiveModuleItem',
  components: {
    InteractiveModuleQuestion,
    Button,
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
      answering: false,
      disabled: false,
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
      isLoggedIn: 'auth/check',
    }),
    questions() {
      return this.data?.items?.length ? this.data.items : [];
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
  methods: {
    completed() {
      this.$emit('completed', true)
      this.disabled = true
    },
    start() {
      this.answering = true;
      this.$emit('start', true)
      this.$emit('answering', true)
    },
  }
}
</script>
