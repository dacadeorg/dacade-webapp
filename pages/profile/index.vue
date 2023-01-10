<template>
  <div
    class="flex flex-col divide-y divide-solid divide-gray-200 space-y-8 text-gray-700"
  >
    <ProfileOverviewAchievements />

    <ProfileOverviewCommunities />

    <ProfileOverviewReferrals />

    <ProfileOverviewSection title="Notifications" see-more>
      <NotificationList extended />
    </ProfileOverviewSection>

    <!--     connecting to discord modal -->
    <Modal :show="showDiscordModal" size="medium">
      <div class="px-6 pt-6">
        <div class="pb-7">
          <p class="text-.5xl font-medium leading-snug">
            {{ $t('profile.header.discord') }}
          </p>
        </div>

        <div class="pb-7">
          <p :class="discordError ? 'bg-red-50 text-red-700' : discordSuccess ? 'bg-green-50 text-green-700' : 'bg-white'"
             class="p-3 rounded text-.2xl font-medium leading-snug">
            {{ getDiscordMessage() }}
          </p>
        </div>

        <div class="pb-7">
          <Button :class="discordLoading && 'text-gray-500'" :disabled="discordLoading"
                  class="bg-white disabled:text-gray-500 -ml-4 text-blue-500 font-semibold py-2 px-4 border-none! rounded"
                  @click="closeModal()">
            {{ $t('profile.header.discord.close') }}
          </Button>
        </div>
      </div>

    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NotificationList from '@/components/list/Notification'
import ProfileOverviewCommunities from '~/components/sections/profile/overview/Communities'
import ProfileOverviewAchievements from '~/components/sections/profile/overview/Achievements'
import ProfileOverviewReferrals from '~/components/sections/profile/overview/Referrals'
import ProfileOverviewSection from '~/components/sections/profile/overview/Section'
import {getMetadataTitle} from '~/utilities/Metadata'
import Modal from "~/components/ui/Modal.vue";

export default {
  name: 'ProfileOverview',
  components: {
    Modal,
    ProfileOverviewSection,
    ProfileOverviewReferrals,
    ProfileOverviewAchievements,
    ProfileOverviewCommunities,
    NotificationList,
  },
  layout: 'profile',
  middleware: 'auth',
  data() {
    return {
      username: '',
      discordError: false,
      discordSuccess: false,
      discordLoading: false,
      showDiscordModal: false,
    }
  },
  mounted() {
    //   call discord api with token param
    this.discordCallback()
  },
  methods: {
    async discordCallback() {
      try {
        const code = this.$route.query.code
        if (!code) {
          return
        }

        this.discordLoading = true
        this.showDiscordModal = true

        const res = await this.$api.post('auth/discord', {
          code,
        })
        if (!res) {
          this.discordError = true
          return
        }
        this.discordSuccess = true
      } catch (e) {
        console.log({e})
        this.discordError = true
      } finally {
        this.discordLoading = false
      }

    },

    closeModal() {
      this.showDiscordModal = false
      this.discordError = false
      this.discordSuccess = false
      this.discordLoading = false
    },

    getDiscordMessage() {
      if (this.discordError) {
        return this.$t('profile.header.discord.error')
      }
      if (this.discordSuccess) {
        return this.$t('profile.header.discord.success')
      }
      return this.$t('profile.header.discord.connect')
    }
  },
  fetch({store, params, error}) {
    this.username = store.getters['auth/get'].displayName

    return Promise.all([
      store.dispatch('profile/certificates/all', this.username),
      store.dispatch('profile/reputations/all', this.username),
    ]).catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(this.user?.displayName),
      // meta: getMetadataDescription(this.challenge.description)
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
  },
}
</script>
