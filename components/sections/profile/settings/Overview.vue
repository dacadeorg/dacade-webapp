<template>
    <ProfileSettingsSection
      title="Profile Information"
      see-more
      see-all
    >

      <div
        class="grid grid-cols-3 gap-4 p-4">
        <div class="text-gray text-sm">{{ $t('profile.edit.username') }}</div>
        <div class="text-gray text-sm">{{ user.displayName }}</div>
        <button
          class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
            @click="() => console.log()"></button>
      </div>

      <div
        class="grid grid-cols-3 gap-4 p-4">
        <div class="text-gray text-sm">{{ $t('profile.edit.email') }}</div>
        <div class="text-gray text-sm">{{ user.email }}</div>
        <button
          class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
          @click="() => togglePopUp()"
        >{{ user?.email?.length ? 'Change' : 'Set' }}
        </button>
      </div>

      <div
        class="grid grid-cols-3 gap-4 p-4">
        <div class="text-gray text-sm">{{ $t('profile.edit.fullname') }}</div>
        <div class="text-gray text-sm">{{ fullName }}</div>
        <button
          class="bg-transparent hover:bg-transparent flex justify-end text-primary text-xs"
          @click="() => togglePopUp()"
        >{{ fullName.length ? 'Change' : 'Set' }}
        </button>
      </div>

      <Popup
        v-show="showPopup"
        :selected-info="selectedInfo"
        :show-popup="showPopup"
        class="w-3/5"
        @close=" () => togglePopUp()"
        @togglePopup="() => togglePopUp()"/>

    </ProfileSettingsSection>
  </template>

<script>
import {mapGetters} from "vuex";
import ProfileSettingsSection from '~/components/sections/profile/overview/Section'
import Popup from '~/components/popups/SettingsProfile'
export default {
  name: 'ProfileSettingsOverview',
  components: {
    ProfileSettingsSection,
    Popup
  },
  data() {
    return {
      showPopup: false,
      selectedInfo: {},
      content: [],
      itemsToggle: [{
        title: 'Change Name',
        info: 'Name',
        firstId: 'firstname',
        lastId: 'lastname'
      }]
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
    }),
    fullName() {
      if (!this.user?.firstName || !this.user?.lastName) return ''
      return this.user.firstName + ' ' + this.user.lastName
    },
    status() {
      return this.fullName.length ? 'Change':'Set'
   }
  },
  methods: {
    togglePopUp(title, info, content, status, firstId, lastId) {
      this.itemsToggle.title = title
      this.itemsToggle.info = info
      this.fullName = content
      this.status = status
      this.itemsToggle.firstId = firstId
      this.itemsToggle.lastId = lastId
      this.selectedInfo = info
      this.showPopup = !this.showPopup
    },
  },
}
</script>
