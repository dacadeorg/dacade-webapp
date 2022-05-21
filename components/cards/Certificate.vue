<template>
  <div
    class="flex hover:bg-gray-50 py-4 -mx-5 px-5 cursor-pointer"
  >
    <div class="flex mr-2">
      <CertificateBadge :image="metadata.image" class="w-10 h-10" />
    </div>
    <div class="pt-1 -mt-2">
      <span class="block text-base text-gray-700">{{ metadata.name }}</span>
      <span class="block text-base text-gray-700">{{ metadata.description }}</span>
      <span class="block text-gray-900 font-medium text-sm">{{ date }}</span>
    </div>
  </div>
</template>

<script>
import DateManager from '@/utilities/DateManager'
import CertificateBadge from "~/components/ui/CertificateBadge";

export default {
  name: 'CertificateCard',
  components: {
    CertificateBadge
  },
  props: {
    metadata: {
      default: () => {
        return {}
      },
      type: Object,
    }
  },
  computed: {
    date() {
      return DateManager.fromNow(this.metadata.issuedOn, this.$i18n.locale)
    },
  },
  methods: {

  },
}
</script>
