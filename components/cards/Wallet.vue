<template>
  <div class="bg-gray-100 lg:w-2/3 relative lg:flex md:flex rounded-3.5xl mb-7">
    <div class="bg-gray-50 lg:w-60 md:w-60 rounded-3.5xl">
      <div class="p-6 ">
        <div class="border-b-2 border-dotted border-black">
          <h1 class="text-2xl">
            Celo Dollar
          </h1>
          <Tag value="CUSD" />
          <div class="text-right mb-4">
            <Coin size="medium" />
          </div>
        </div>
        <div class="flex">
          <div class="w-1/2 pt-5 ">
            <h1>Balance</h1>
          </div>
          <div class="w-1/2 pt-3.5 text-right text-2xl font-bold">
            <h1>5.00</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="px-7 pt-6 lg:w-8/12 md:w-8/12 pb-24 lg:pb-24">
      <div class="xl:w-72 md:w-72 lg:w-72 text-sm text-gray-700">
        <p>
          Laborum soluta distinctio laborum laudantium velit asperiores autem
          veniam.
        </p>
      </div>
      <div class="lg:pt-5 pt-14 absolute text-sm lg:text-gray-700 md:text-gray-700 cursor-pointer text-primary font-bold lg:font-normal md:font-normal">
        <a href="#">Change Address</a>
      </div>
      <div class="right-2 absolute bottom-2 mt-5">
        <Button :padding="false" class="py-2" type="outline-primary">
          <span class="inline-block ">Cash out </span>
          <span class="inline-block lg:pl-12 pl-3"><ArrowRight /></span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Coin from '@/components/ui/Coin'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'Wallet',
  components: {
    Coin,
    Button,
    ArrowRight,
    Tag
  }
}
</script>
