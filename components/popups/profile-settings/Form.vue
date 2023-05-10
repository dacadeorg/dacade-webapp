<template>
  <ValidationObserver ref="form" v-slot="{ passes }">
    <form class="" target="_blank" @submit.prevent="passes(onSave)">
      <div class="lg:w-98 xl:w-98 mx-auto">
        <h1 class="text-xl md:text-3xl mr-3 mb-3 text-left">
          {{ title }}
        </h1>
        <slot />
        <div class="flex justify-end mt-4">
          <div class="flex text-right self-end">
            <ArrowButton
              :custom-style="activeButtonStyle"
              :loading="loading"
              type="submit"
              min-width-class="min-w-40"
              >{{ $t('profile.settings.popup.button') }}
            </ArrowButton>
          </div>
        </div>
        <button
          class="bg-transparent text-blue-400 self-start px-2.5 py-2.5 absolute bottom-6"
          @click="close"
        >
          <!-- <Crossmark class="text-xl text-gray-600 w-6" /> -->
          {{ $t('profile.edit.close') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
import ArrowButton from '@/components/ui/button/Arrow'

export default {
  name: 'ProfileSettingsForm',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    ArrowButton,
  },
  props: {
    title: {
      default: '',
      type: String,
    },
    loading: {
      default: false,
      type: Boolean,
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters({
      user: 'user/get',
      colors: 'ui/colors',
    }),
    getFormField() {
      return this.selectedInfo
    },
    activeButtonStyle() {
      return {
        color: this.colors.text,
        backgroundColor: this.colors.textAccent,
      }
    },
  },
  watch: {
    errors(e) {
        console.log('seeting errors', e)
      this.$refs.form.setErrors(e)
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
    onSave() {
      this.$emit('save')
    },
  },
}
</script>
