<template>
  <div>
    <span v-click-outside="externalClick">
      <li
        class="
          content-wrapper
          inline-block
          align-middle
          mr-2
          max-w-2xl
          aspect-w-16
          lg:aspect-h-9
          aspect-h-2
          md:aspect-h-9
          relative
          text-gray-500
          cursor-pointer
        "
        @click="toggle"
      >
        <span
          class="
            flex
            space-x-1
            text-primary
            hover:text-primary-dark
            mt-3
            text-base
            leading-normal
          "
        >
          <PlayIcon class="-mt-1" fill="white" />
          <div class="leading-normal font-light">
            <span class="font-medium">{{ $t('app.name') }}</span>
            {{ $t('page.index.main.button.description') }}
          </div>
        </span>
      </li>
      <div class="flex justify-center">
        <div
          v-if="show"
          class="
            z-50
            mt-0
            w-full
            inline-block
            fixed
            top-14
            md:top-24
            left-0
            right-0
            bg-transparent
            px-auto
            rounded-3.5xl
            text-gray-900
            no-scrollbar
            max-w-full
            h-auto
            content-wrapper
            justify-self-center
            sm:m-auto
          "
        >
          <Video
            class="
              z-50
              aspect-w-16 aspect-h-8
              max-w-full
              m-auto
              justify-center
              bg-black
            "
            url="https://youtube.com/embed/GmVrQDulaLY"
          />
        </div>
      </div>
    </span>
    <div v-if="show" class="opacity-25 fixed inset-0 z-30 bg-black" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import vClickOutside from 'v-click-outside'
import Video from '@/components/ui/Video'
import PlayIcon from '~/assets/icons/play.svg?inline'

export default {
  name: 'VideoPopup',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    PlayIcon,
    Video,
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
      this.$store.dispatch('ui/toggleBodyScrolling', this.show)
    },
    externalClick(event) {
      if (this.show) {
        this.show = false
        this.$store.dispatch('ui/toggleBodyScrolling', this.show)
      }
    },
  },
}
</script>
