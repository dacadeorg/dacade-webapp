<template>
  <div class="text-left relative">
    <span
      class="uppercase block text-xs font-semibold text-gray-500 leading-relaxed"
    >{{ $t("nav.certificates") }}</span
    >
    <div class='space-y-4 mt-3'>
      <CertificatesCard
        v-for="certificate in certificates"
        :key="certificate.id"
        :metadata="certificate.metadata"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CertificatesCard from "@/components/cards/Certificate";

export default {
  name: "CertificatesList",
  components: {
    CertificatesCard
  },
  fetch({ store, error }) {
    return store.dispatch("user/certificates/all", this.user.username).catch((e) => {
      error(e);
    });
  },
  computed: {
    ...mapGetters({
      certificates: "user/certificates/certificates",
      user: 'user/get',
    })
  }
};
</script>
