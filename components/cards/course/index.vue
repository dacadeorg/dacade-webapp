<template>
  <div
    class="flex flex-col sm:flex-row p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 bg-gray-50 rounded-3xl group text-gray-700 sm:p-7 mb-4 w-full border-solid border border-gray-200"
  >
    <div
      class="flex flex-col sm:pr-20 justify-between w-full sm:w-3/5 lg:w-2/3 pb-6 sm:pb-0"
    >
      <div class="flex flex-col">
        <div class="text-lg font-medium leading-normal">
          <Skeleton :as="div" className="w-full" minHeight="10px" :loading="loading">
            {{ course.name }}
          </Skeleton>
        </div>

        <Skeleton :as="div" className="w-17" height="17px" pill :loading="loading">
        <div
          v-if="course.level"
          class="mt-2 text-xxs px-2.5 py-0.5 bg-gray-200 text-gray-500 rounded-3xl max-w-max tracking-wider uppercase font-medium"
        >
          {{ $t(`course.challenge.level-${course.level}`) }}
        </div>
        </Skeleton>

        
        <div class="text-sm mt-3 pb-2 max-w-xxs">
          <Skeleton
            :count="3"
            as="div"
            class-name="mt-1 w-full"
            min-height="10px"
            :loading="loading"
            >
          {{ course.description }}
          </Skeleton>
        </div>
      </div>
      <div class="hidden sm:block">
        <Skeleton pill className="w-1/2" :loading="loading" height="40px">
        <nuxt-link :to="localePath(path)" v-if="!loading">
          <ArrowButton :community-styles="true" type="outline-primary">
            {{ $t('course.challenge.button') }}
          </ArrowButton>
        </nuxt-link>
        </Skeleton>
      </div>
    </div>

    <div
      class="text-base text-left sm:flex flex-start flex flex-col pt-6 sm:pt-0 space-y-4 pb-5 sm:pl-7 sm:pb-10 w-full sm:w-2/5 lg:w-1/3 tracking-wider"
    >
      <Skeleton as="span" pill height="15px" width="40px" :loading="loading" >
        <Reward :reward="reward" size="small" />
      </Skeleton>
      <div class="font-light text-sm max-w-xs pb-2 text-gray-700">
        <Skeleton :count="3"  :loading="loading" >
        {{
          $t(
            reward.stable
              ? 'course.challenge.reward.stable.description'
              : 'course.challenge.reward.description',
            {
              currency: `$`,
              amount: `${reward.amount}`,
              token: reward.token,
            }
          )
        }}
        </Skeleton>
      </div>
    </div>
    <div class="block sm:hidden pt-6">
      <nuxt-link :to="localePath(path)">
        <ArrowButton :community-styles="true" type="outline-primary">
          {{ $t('course.challenge.button') }}
        </ArrowButton>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Reward from '@/components/cards/course/_partials/Reward.vue'
import ArrowButton from '@/components/ui/button/Arrow'
import Skeleton from '~/components/ui/Skeleton.vue'

export default {
  name: 'CourseCard',
  components: {
    Reward,
    ArrowButton,
    Skeleton
  },
  props: {
    course: {
      default: () => {
        return {}
      },
      type: Object,
    },
    community: {
      default: () => {},
      type: Object,
    },
    loading: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
    }),
    path() {
      return `/communities/${this.community.slug}/courses/${this.course.slug}`
    },
    reward() {
      return this.course?.challenge?.rewards?.find(
        (entity) => entity.type === 'SUBMISSION'
      )
    },
  },
  methods: {
    debug(event) {
      console.log('course', this.course)
      console.log('course challenge', this.course.slug)
      console.log('colors', this.colors)
    },
  },
}
</script>
