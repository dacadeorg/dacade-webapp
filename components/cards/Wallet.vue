<template>
  <div class="bg-gray-100 relative lg:flex md:flex sm:flex rounded-3.5xl mb-7">
    <EditAddress
      :wallet="details"
      :show="showEditModal"
      @close="showEditModal = false"
    />
    <div class="bg-gray-50 lg:w-60 md:w-60 sm:w-60 rounded-3.5xl">
      <div class="p-6">
        <div class="border-b border-dotted border-gray-900">
          <h1 class="text-2xl">
            {{ details.title }}
          </h1>
          <Tag :value="details.token" />
          <div class="text-right mb-4">
            <Coin size="medium" :token="details.token" />
          </div>
        </div>
        <div class="flex">
          <div class="w-1/2 pt-5 text-sm">
            <h1>Balance</h1>
          </div>
          <div class="w-1/2 pt-3.5 text-right text-2xl font-medium">
            <h1>
              <Currency :value="details.balance" />
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="px-7 pt-6 lg:w-96.5 md:w-8/12 sm:w-8/12 pb-24 lg:pb-24">
      <div class="xl:w-72 md:w-72 lg:w-full text-sm text-gray-700">
        <p v-if="address" class="leading-5 text-sm">
          <span v-for="(part, k) in address" :key="k" class="mr-2">{{
            part
          }}</span>
        </p>
        <p v-else>{{ details.description }}</p>
      </div>
      <div class="text-gray-700 text-sm mt-3">
        <span
          class="cursor-pointer hover:underline"
          @click="showEditModal = true"
          >{{ address ? 'Change' : 'Set' }} address</span
        >
      </div>
      <div class="right-2 absolute bottom-2 mt-5">
        <Button
          :padding="false"
          :disabled="true"
          class="py-2"
          type="outline-primary"
        >
          <span class="inline-block text-sm">Cash out </span>
          <span class="inline-block lg:pl-12 pl-3 align-middle"
            ><ArrowRight
          /></span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Coin from '@/components/ui/Coin'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Currency from '@/components/ui/Currency'
import EditAddress from '@/components/sections/profile/modals/EditAddress'
import ArrowRight from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'Wallet',
  components: {
    Coin,
    Button,
    ArrowRight,
    Tag,
    Currency,
    EditAddress,
  },
  props: {
    details: {
      type: Object,
      require: true,
      default: () => {
        return {}
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showEditModal: false,
    }
  },
  computed: {
    address() {
      if (!this.details.address) return null
      return this.details.address.match(/.{1,4}/g)
    },
  },
}
</script>
