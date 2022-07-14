<template>
  <InteractiveModuleWrapper
    :title="stepTitle" :subtitle="stepSubtitle" :section-title="data.title"
    :percentage="completion"
    duration="15 minutes">
    <div v-if="!loading">
      <div v-if="!ended">
        <div v-for="(item, index) in items" :key="index">
          <InteractiveModuleItem
            v-if="current === index" :data="item" @completed="goToNextItem"
            @answering="answering = true"/>
        </div>
      </div>
      <div v-else>
        <Markdown :value="data.closing.text"/>
      </div>
      <Hint v-if="!isLoggedIn" class="mt-6">
        <p>Since you are not logged in, your progress won't be saved.</p>
        <p>
          <nuxt-link :to="localePath('/login')">Login</nuxt-link>
          to make sure your progress doesn't get lost.
        </p>
      </Hint>
    </div>
    <Loader v-else class="h-48" community-styles/>
  </InteractiveModuleWrapper>
</template>

<script>
import {mapGetters} from 'vuex'
import InteractiveModuleWrapper from "./Wrapper";
import Markdown from '@/components/ui/Markdown'
import Loader from "~/components/ui/Loader";
import Hint from "~/components/ui/Hint";
import InteractiveModuleItem from "~/components/sections/learning-modules/InteractiveModule/Item";

export default {
  name: 'InteractiveModule',
  components: {
    InteractiveModuleItem,
    Hint,
    Loader,
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
      ended: false,
      loading: true,
      title: '',
      subtitle: '',
      answering: false,
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
      isLoggedIn: 'auth/check',
    }),
    items() {
      return this.data?.items?.length ? this.data.items : [];
    },
    stepTitle() {
      if (this.ended && this.data?.closing?.title) {
        return this.data?.closing?.title
      }
      return this.items[this.current]?.title;
    },
    stepSubtitle() {
      if (this.answering) {
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
      return Math.round(this.current / this.items.length * 100)
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
    nextItem() {
      this.current++;
      this.answering = false;
      if (this.items.length > this.current) return;
      this.completed();
    },
    goToNextItem() {
      setTimeout(() => {
        this.nextItem()
      }, 1000);
    },
    completed() {
      this.ended = true;
      this.$store.dispatch('communities/navigation/showPageNavigation');
      if (!this.isLoggedIn) return
      this.$store.dispatch('communities/courses/learningModules/submitModuleAnswer', this.data.ref);
    },
    async checkIfAnswered() {
      try {
        if (!this.isLoggedIn) return
        const answers = await this.$store.dispatch('communities/courses/learningModules/checkAnswer', this.data.ref);
        if (!answers.length) return;
        this.current = this.items.length;
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
