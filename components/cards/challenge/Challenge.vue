<template>
  <div
    class="border-solid border border-gray-900 bg-gray-50 rounded-3xl mb-5 group text-gray-700"
  >
    <div
      class="border-solid border-b border-gray-200 bg-white rounded-3xl sm:p-8 w-full p-6"
    >
      <div class="divide-y-3 divide-red-700 divide-dashed">
        <div class="flex">
          <div class="pr-20 w-full sm:w-3/5 lg:w-2/3">
            <div class="text-lg text-gray-900 font-medium leading-normal">
              Build a Celo dApp
            </div>
            <div class="text-sm mt-3 pb-2 max-w-xxs text-gray-700">
              This course teaches developers how to build the frontend for a
              simple marketplace dapp on the Celo blockchain with the Celo
              Composer, using Next.js.
            </div>
          </div>

          <div class="flex flex-col rounded-full max-w-max mr-4 text-sm">
            <div class="flex items-center mb-8">
              <Coin size="medium" token="cUSD" />
              <div class="text-base lg:pl-2 lg:pr-3 md:px-2 max-w-max">
                <div class="flex">
                  <span class="block font-medium text-base pr-1">150</span>
                  <span class="block font-medium text-base">cUSD Rewards</span>
                </div>
                <div class="text-gray-500 text-sm font-normal">
                  Upon successful completion
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <Coin size="medium" token="ETH" />
              <div class="text-base lg:pl-2 lg:pr-3 md:px-2 max-w-max">
                <div class="flex">
                  <span class="block font-medium text-base pr-1">150</span>
                  <span class="block font-medium text-base">cUSD Rewards</span>
                </div>
                <div class="text-gray-500 text-sm font-normal">
                  Upon successful completion
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="text-xxs px-2.5 mb-9 bg-gray-200 text-gray-500 rounded-3xl max-w-max tracking-wider uppercase font-medium"
        >
          Beginner
        </div>
      </div>
      <div class="flex flex-row mt-6 items-center text-sm">
        <div class="text-gray-400 sm:w-3/5 lg:w-2/3 text-base font-normal">
          <span>Deadline</span>
          <span class="font-bold">March 12th, 2022</span>
        </div>

        <div>
          <nuxt-link :to="localePath(path)">
            <ArrowButton :community-styles="true" type="outline-primary">
              See the challenge
            </ArrowButton>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="mt-7 sm:p-8 w-full p-6 rounded-3xl text-sm">
      <div class="mb-5 text-gray-400 font-semibold uppercase text-xxs">
        related content
      </div>
      <div class="w-1/2 mb-8">
        <div class="mb-3 text-lg font-medium leading-normal">
          Celo Development 101
        </div>
        <div>
          In this course, you will learn the most important blockchain concepts
          that you will need to navigate the Celo ecosystem.
        </div>
      </div>
      <div class="w-1/2 mb-8">
        <div class="mb-3 text-lg font-medium leading-normal">
          Celo Development 101
        </div>
        <div>
          In this course, you will learn the most important blockchain concepts
          that you will need to navigate the Celo ecosystem.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Coin from '@/components/ui/Coin'
import ArrowButton from '@/components/ui/button/Arrow'
export default {
  name: 'ChallengeCard',
  components: {
    Coin,
    ArrowButton,
  },
  props: {
    course: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
}
</script>
