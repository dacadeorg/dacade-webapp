<template>
  <div
    class="
      cursor-pointer
      flex
      md:flex-row-reverse
      md:space-x-5
      px-5
      min-h-32
      md:h-auto
      md:w-full
      justify-between
      hover:bg-secondary
      relative
      rounded-xl
    "
    @click="openLink()"
  >
    <div
      class="
        bg-theme-accent
        flex-col
        w-full
        h-full
        justify-between
        md:-space-y-1
        pl-3
        pr-5
        mt-7
        mb-5
      "
    >
      <div class="relative w-full md:flex md:justify-between">
        <div class="font-medium text-md mb-2">
          {{ referral.name }}
        </div>
      </div>

      <div
        class="
          inline-flex
          md:flex
          h-2/3
          md:flex-row
          flex-col-reverse
          justify-between
        "
      >
        <div class="text-sm pt-8 md:pt-2 md:pb-4 text-gray-600">
          {{ type }}
        </div>
        <div>
          <Reward type="gray" :reward="reward" />
        </div>
      </div>
    </div>
    <div class="self-start relative mt-15 md:mt-7">
      <Avatar
        class="w-15 h-15"
        :icon="referral.icon"
        :color="referral.colors.primary"
        size="medium-fixed"
        shape="rounded"
      />
    </div>
  </div>
</template>

<script>
import Reward from '@/components/badges/Reward'
import Avatar from '@/components/ui/Avatar'

export default {
  name: 'Referral',
  components: {
    Reward,
    Avatar,
  },
  computed: {
    reward() {
      return {
        amount: 25,
        token: 'cUSD',
      }
    },
    type() {
      return 'Referral'
    },
    referral() {
      return {
        name: 'Celo Development 101',
        icon: '/img/communities/celo.svg',
        colors: {
          text: '#fff',
          accent: '#2E3337',
          textAccent: '#34b276',
          primary: '#35C07D',
        },
      }
    },
  },
  methods: {
    openLink() {
      window.open('https://forms.gle/PLjPugvJpj9m2Qn7A')
    },
  },
}
</script>
