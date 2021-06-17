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
          "
        >
          <PlayIcon class="-mt-1" fill="white" />
          <div>
            <span class="font-medium">{{ $t('app.name') }}</span>
            {{ $t('page.index.main.button.description') }}
          </div>
        </span>
      </li>
      <div class="flex justify-center">
        <div
          v-show="show"
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
            bottom-20
            content-wrapper
            justify-self-center
            sm:m-auto
          "
        >
          <Video
            class="z-50 aspect-w-16 aspect-h-8 max-w-full m-auto justify-center"
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
      if (this.show) {
        const body = document.body
        body.style.position = 'fixed'
        body.style.width = '100%'
      } else {
        const body = document.body
        body.style.position = 'relative'
        body.style.top = ''
        const scrollY = body.style.top
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    },
    externalClick(event) {
      if (this.show) {
        this.show = false
        const body = document.body
        const scrollY = body.style.top
        body.style.position = 'relative'
        body.style.top = ''
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    },
  },
}
</script>
