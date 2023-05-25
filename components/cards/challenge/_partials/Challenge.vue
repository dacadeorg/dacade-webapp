<template>
  <div
    class="border-solid border border-gray-200 rounded-3xl mb-5 group text-gray-700 p-6"
  >
    <div class="text-gray-900 text-lg leading-normal capitalize">
      <span class="text-default font-medium"
        >ready ready to complete the challenge?</span
      >
      <span class="ml-1.5">Build a Celo dApp</span>
    </div>

    <div class="flex flex-row rounded-full max-w-max text-sm mt-6 space-x-8">
      <div class="flex items-center">
        <Coin size="medium" token="cUSD" />
        <div class="text-base lg:pl-2 max-w-max">
          <div class="flex text-gray-700">
            <span class="block font-medium text-base pr-1">150</span>
            <span class="block font-medium text-base">cUSD Rewards</span>
          </div>
          <div class="text-gray-400 text-xs font-normal">
            Upon successful completion
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <Coin size="medium" token="ETH" />
        <div class="text-base lg:pl-2 max-w-max">
          <div class="flex text-gray-700">
            <span class="block font-medium text-base pr-1">150</span>
            <span class="block font-medium text-base">cUSD Rewards</span>
          </div>
          <div class="text-gray-400 text-xs font-normal">
            Upon successful completion
          </div>
        </div>
      </div>
    </div>
    <div class="text-gray-400 sm:w-3/5 lg:w-2/3 text-base font-normal pt-6">
      <span>Deadline</span>
      <span class="font-medium">March 12th, 2022</span>
    </div>
  </div>
</template>
<script>
import Coin from '@/components/ui/Coin'
export default {
  name: 'ChallengeCourseCard',
  components: {
    Coin,
  },
}
</script>
