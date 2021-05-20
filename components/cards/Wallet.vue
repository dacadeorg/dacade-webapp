<template>
  <div
    class="bg-gray-100 lg:w-9/12 xl:w-2/3 relative lg:flex md:flex sm:flex rounded-3.5xl mb-7"
  >
    <div class="bg-gray-50 lg:w-60 md:w-60 sm:w-60 rounded-3.5xl">
      <div class="p-6 ">
        <div class="border-b border-dotted border-gray-900">
          <h1 class="text-2xl">
            {{ title }}
          </h1>
          <Tag value="CUSD" />
          <div class="text-right mb-4">
            <Coin size="medium" />
          </div>
        </div>
        <div class="flex">
          <div class="w-1/2 pt-5 text-sm">
            <h1>Balance</h1>
          </div>
          <div class="w-1/2 pt-3.5 text-right text-2xl font-medium">
            <h1>{{ amount }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="px-7 pt-6 lg:w-96.5 md:w-8/12 sm:w-8/12 pb-24 lg:pb-24">
      <div class="xl:w-72 md:w-72 lg:w-full text-sm text-gray-700">
        <p>
          Laborum soluta distinctio laborum laudantium velit asperiores autem
          veniam.
        </p>
      </div>
      <div>
        <Address />
      </div>
      <div class="right-2 absolute bottom-2 mt-5">
        <div v-if="hasAddress">
          <Button :padding="false" class="py-2" type="outline-primary">
            <span class="inline-block text-sm">Cash out </span>
            <span
              class="inline-block lg:pl-12 pl-3 align-middle"
            ><ArrowRight /></span>
          </Button>
        </div>
        <div v-else>
          <Button :padding="false" class="py-2" type="outline-gray">
            <span class="inline-block text-sm">Cash out </span>
            <span
              class="inline-block lg:pl-12 pl-3 align-middle"
            ><ArrowRight /></span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Coin from '@/components/ui/Coin'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Address from '@/components/cards/Address'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'Wallet',
  components: {
    Coin,
    Button,
    ArrowRight,
    Tag,
    Address
  },
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    },

    amount: {
      type: Number,
      require: true,
      default: null
    }
  },

  computed: {
    hasAddress () {
      return true
    }
  }
}
</script>
