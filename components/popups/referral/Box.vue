<template>
  <div
    class="
      relative
      flex
      items-center
      justify-between
      border border-solid
      p-2.5
      text-gray-500
      rounded
      border-gray-200
      bg-gray-50
    "
  >
    <div class="text-left flex-grow w-3/4">
      <label class="relative block text-sm">{{ label }}</label>
      <div class="text-lg mt-0.5 w-full truncate">{{ value }}</div>
    </div>
    <div class="pl-3 flex-none">
      <Button type="outline-primary" @click="copyToClipBoard()">
        {{ $t('modal.referral.button.copy') }}
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/ui/Button'

export default {
  name: 'Box',
  components: {
    Button,
  },
  props: {
    value: {
      default: null,
      type: String,
    },
    label: {
      default: null,
      type: String,
    },
  },
  methods: {
    async copyToClipBoard() {
      await navigator.clipboard.writeText(this.value)
    },
  },
}
</script>
