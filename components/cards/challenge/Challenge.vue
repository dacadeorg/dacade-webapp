<template>
  <div
    class="flex flex-col sm:flex-row p-6 bg-white mb-10 rounded-3xl group text-gray-700 sm:p-7 w-full border-solid border-2 border-gray-900"
  >
    <div
      class="flex flex-col sm:pr-20 justify-between w-full sm:w-3/5 lg:w-2/3 pb-6 sm:pb-0"
    >
      <div class="text-lg font-medium leading-normal">Build a Celo dApp</div>
      <div class="text-sm mt-3 pb-2 max-w-xxs">
        This course teaches developers how to build the frontend for a simple
        marketplace dapp on the Celo blockchain with the Celo Composer, using
        Next.js.
      </div>
    </div>
    <div
      class="flex items-center rounded-full max-w-max mr-4"
    >
      <Coin class="flex-none" size="medium" token="cUSD"/>
      <div class="text-base lg:pl-2 lg:pr-3 md:px-2 max-w-max">
        <div class="flex">
          <span class="block font-medium text-base pr-1">150</span>
          <span class="block font-medium text-base">cUSD Rewards</span>
        </div>
        <div class="flex">
          <div class="text-gray-500 text-sm font-normal pr-1">
            Per
          </div>
          <div class="text-gray-500 text-sm font-normal">
            Submission
          </div>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
import Coin from '@/components/ui/Coin'
export default {
  name: 'ChallengeCard',
  components: {
    Coin,
  },
   
}
</script>