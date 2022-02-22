<template>
  <Button
    :padding="false"
    class="action-button py-2 pl-5 pr-3.5 w-44 text-sm"
    :disabled="disabled"
    :link="link"
    :loading="loading"
    :type="type"
    :custom-style="customStyle"
    :target="target"
  >
    <span class="flex text-left items-center justify-between">
      <span class="leading-6"><slot /></span>
      <span>
        <ArrowRightIcon v-if="!loading" />
        <Spinner v-else class="animate-spin"
      /></span>
    </span>
  </Button>
</template>
<script>
import Button from './index.vue'
import Spinner from '~/assets/icons/spinner.svg?inline'
import ArrowRightIcon from '~/assets/icons/arrow-right.svg?inline'

export default {
  name: 'DAButton',
  components: {
    Button,
    Spinner,
    ArrowRightIcon,
  },
  props: {
    text: {
      default: '',
      type: [Number, String],
    },
    loading: {
      default: false,
      type: Boolean,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    rounded: {
      default: true,
      type: Boolean,
    },
    type: {
      default: 'primary',
      type: String,
    },
    padding: {
      default: true,
      type: [Boolean, String],
    },
    margin: {
      default: '',
      type: String,
    },
    customStyle: {
      default: null,
      type: Object,
    },
    link: {
      default: null,
      type: String,
    },
    target: {
      default: '_self',
      type: String,
    },
    communityStyles: {
      default: false,
      type: Boolean,
    },
  },
}
</script>
