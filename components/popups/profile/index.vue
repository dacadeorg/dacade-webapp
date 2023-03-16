<template>
    <Modal v-if="user" :show="showModal" @close="close">
      <div class="w-full p-7 relative">

        <h1 class="text-xl md:text-3xl mr-3 mb-3 text-left">
          Change names
        </h1>

      <form
        class=""
        target="_blank"
        @submit.prevent="passes(submit)"
      >
        <div class="lg:w-98 xl:w-98 mx-auto">
          <div label-for="input-1" class="mb-5 relative">
            <ValidationProvider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
              mode="passive"
            >
              <div>
                <Input
                  id="input-1"
                  v-model="form.email"
                  required
                  type="email"
                  :placeholder="$t('login-page.email.placeholder')"
                  :label="$t('login-page.email.label')"
                  class="mb-5"
                  :error="errors[0]"
                />
              </div>
            </ValidationProvider>
          </div>

          <div label-for="input-2">
            <ValidationProvider
              v-slot="{ errors }"
              name="username"
              rules="required|min:3|username"
              mode="aggressive"
            >
              <Input
                id="input-2"
                v-model="form.username"
                name="username"
                :placeholder="$t('login-page.username.placeholder')"
                :label="$t('login-page.username.label')"
                class="mb-5"
                :error="errors[0]"
              />
            </ValidationProvider>
          </div>

          <div class="flex justify-end mt-4">
            <div class="flex text-right self-end">
              <ArrowButton
                :loading="loading"
                type="submit"
                :disabled="loading"
                min-width-class="min-w-40"
                >{{ $t('login-page.signup.button') }}
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
    data() {
    return {
      form: {
        username: '',
        email: '',
      },
      loading: false,
    }
  },


    computed: {
      ...mapGetters({
        user: 'user/get',
      }),
    },
    methods: {
      close() {
        if (this.show) {
            this.show = !this.show
        }
      },
      showModal() {
      if (this.show) {
        this.show = !this.show
      }
    },
      submit() {
      this.$router.push(this.localePath('/'))
      },
      externalClick(event) {
      if (!this.show) return
      this.show = false
      this.$store.dispatch('ui/toggleBodyScrolling', this.show)
    },
    },
  }
  </script>
  