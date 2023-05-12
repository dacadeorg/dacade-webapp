<template>
  <div class="pb-7">
    <p class="text-.5xl leading-snug font-medium">
      {{ wallet.title }}
    </p>
    <p class="text-.5xl font-medium text-gray-400 leading-snug">
      {{
        wallet.address
          ? $t('profile.wallets.change')
          : $t('profile.wallets.set')
      }}
      {{ $t('profile.wallets.address') }}
    </p>
    <Tag :value="wallet.token" class="text-gray-500 mt-2" />
  </div>
</template>

<script>
import Tag from '@/components/ui/Tag.vue'

export default {
  name: 'WalletHeader',
  components: { Tag },
  props: {
    wallet: {
      type: Object,
      require: true,
      default: () => {
        return {}
      },
    },
  },
}
</script>
