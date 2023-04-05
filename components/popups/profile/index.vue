<template>
    <Modal v-if="user" :show="showPopup" size="small" @close="close">
      <div class="w-full p-7 relative">

    

      <form
        class=""
        target="_blank"
        @submit.prevent="passes(onSave)"
      >
        <div class="lg:w-98 xl:w-98 mx-auto">
            <h1 class="text-xl md:text-3xl mr-3 mb-3 text-left">
          {{  selectedInfo.title }}
        </h1>

        {{  selectedInfo }}

          <div
          label-for="input-1" class="mb-5 relative">
            <ValidationProvider
              v-slot="{ errors }"
              name="form"
              rules="required|email"
              mode="passive"
            >
              <div>
                <Input
                v-for="(field, i) in selectedInfo.form" id="input"
                  :key="i"
                  v-model="form.field"
                  required
                  type="form"
                  :placeholder="field"
                  :label="field"
                  class="mb-5"
                  :error="errors[0]"
                />
              </div>
            </ValidationProvider>
          </div>

          <div class="flex justify-end mt-4">
            <div class="flex text-right self-end">
              <ArrowButton
                :disabled="disabled" 
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
          close
        </button>
        </div>
      </form>
      </div>
    </Modal>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import vClickOutside from 'v-click-outside'
  import Modal from '@/components/ui/Modal'
  import ArrowButton from '@/components/ui/button/Arrow'
  import Input from '@/components/ui/Input'


  export default {
    name: 'ReferralPopup',
    directives: {
      clickOutside: vClickOutside.directive,
    },
    components: {
      Modal,
      ArrowButton,
      Input,
    },
    props: {
    showPopup: {
        default: false,
      type: Boolean,
    },
    togglePopup: {
      default: () => {},
      type: Function,
    },
    userInfo: {
      default: () => [],
      type: Array,
    },
    selectedInfo: {
      default: () => {
        return {}
      },
      type: Object,
    },
  },
    data() {
    return {
      // userInfo: [],
      show: false,
      form: {
        field: '',
      },
      loading: false,
    }
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
    methods: {
      close() {
          this.$emit('close')
      },
      showModal() {
        this.$emit('togglePopUp')
      },
      // submit() {
      //   this.$router.push(this.localePath('/'))
      //   },
      onSave() {
              this.loading = true
      this.$store
        .dispatch('user/update', {
          userName: this.userName,
          email: this.email,
        })
        .then(() => {
          this.userName = null
          this.email = null
          this.loading = false
          this.$emit('close', true)
        })
        .catch((error) => {
          this.loading = false
          if (error.details) {
            this.$refs.form.setErrors(error.details)
          }
        })
      }
    },
  }
  </script>
  