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
    <div class="text-left flex-grow w-2/5 md:w-3/4">
      <label class="relative block text-xs md:text-sm">{{ label }}</label>
      <div class="text-base md:text-lg mt-0.5 w-full truncate">{{ value }}</div>
    </div>
    <div class="pl-3 flex-none">
      <Button
        :type="copied ? 'primary' : 'outline-primary'"
        @click="copyToClipBoard()"
      >
        {{
          $t(
            copied
              ? 'modal.referral.button.copied'
              : 'modal.referral.button.copy'
          )
        }}
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
  data() {
    return {
      copied: false,
      timeout: null,
    }
  },
  methods: {
    async copyToClipBoard() {
      await navigator.clipboard.writeText(this.value)
      this.copied = true
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.copied = false
      }, 500)
    },
  },
}
</script>
