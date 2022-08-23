<template>
  <div
    class="content-wrapper achievement-content mx-auto h-screen flex items-center"
  >
    <div class="w-full">
      <div class="flex flex-col md:flex-row border rounded-3xl">
        <div
          class="flex justify-center items-center p-7 md:rounded-l-3xl rounded-t-3xl md:rounded-t-none w-full md:w-1/2 md:bg-none bg-gray-100"
        >
          <div
            class="p-12 h-52 w-52 rounded-full"
            :style="{ backgroundColor: achievement.community.colors.primary }"
          >
            <img :src="achievement.metadata.image" alt="certificate badge" />
          </div>
        </div>
        <div class="p-5 md:pt-7 md:px-7 md:pb-14 w-full md:w-1/2">
          <div>
            <h2
              class="font-medium leading-7 text-xl md:text-3xl mb-3 md:mb-1.5"
            >
              {{ achievement.metadata.name }}
            </h2>
            <p class="text-gray-700 md:text-base text-sm">
              {{ achievement.metadata.description }}
            </p>
          </div>

          <div class="mt-5 flex flex-col md:gap-6 gap-5">
            <AchievementViewItem :name="$t('profile.achievement.award')">
              <div
                class="inline-flex items-center space-x-2 pr-3 bg-gray-200 p-1 rounded-full"
              >
                <Avatar :user="achievement.user" size="small-fixed" />
                <p class="text-sm md:text-base">
                  {{ achievement.metadata.recipientName }}
                </p>
              </div>
            </AchievementViewItem>

            <AchievementViewItem :name="$t('profile.achievement.issued')">
              {{ achievement.metadata.issuerName }}
            </AchievementViewItem>

            <AchievementViewItem :name="$t('profile.achievement.date')">
              {{ issuedOn }}
            </AchievementViewItem>

            <AchievementViewItem
              v-if="achievement.metadata.comment"
              :name="$t('profile.achievement.comment')"
              mobile-block
              items-start
            >
              {{ achievement.metadata.comment }}
            </AchievementViewItem>

            <AchievementViewItem
              v-if="achievement.metadata.linkToWork"
              :name="$t('profile.achievement.link')"
              mobile-block
            >
              <AchievementLinkField :link="achievement.metadata.linkToWork" />
            </AchievementViewItem>
          </div>
        </div>
      </div>
      <div class="text-center pt-16">
        <ul class="relative">
          <NavItem type="logo" class="w-8 h-8 md:w-11 md:h-11">
            <Logo />
          </NavItem>
          <NavItem type="brand mx-0.5">
            {{ $t('app.name') }}
          </NavItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from '@/components/layout/Logo'
import NavItem from '@/components/ui/NavItem'
import Avatar from '~/components/ui/Avatar'
import DateManager from '~/utilities/DateManager'
import AchievementViewItem from '~/components/sections/profile/achievements/ListItem'
import AchievementLinkField from '~/components/sections/profile/achievements/LinkField'
import { getMetadataDescription, getMetadataTitle } from '~/utilities/Metadata'
// import Checkmark from '~/assets/icons/checkmark.svg?inline'

export default {
  name: 'Achievement',
  components: {
    AchievementLinkField,
    AchievementViewItem,
    Avatar,
    Logo,
    NavItem,
    // Checkmark,
  },
  layout: 'achievement',
  fetch({ store, params, error }) {
    return Promise.all([
      store.dispatch('profile/certificates/find', { id: params.id }),
    ]).catch((e) => {
      error(e)
    })
  },
  head() {
    return {
      title: getMetadataTitle(
        this.achievement?.metadata?.name,
        this.$t('profile.achievement.title')
      ),
      meta: getMetadataDescription(this.achievement?.metadata?.description),
    }
  },
  computed: {
    ...mapGetters({
      achievement: 'profile/certificates/current',
    }),
    issuedOn() {
      return DateManager.format(
        this.achievement.metadata.issuedOn,
        'do MMMM yyyy',
        this.$i18n.locale
      )
    },
  },
}
</script>
