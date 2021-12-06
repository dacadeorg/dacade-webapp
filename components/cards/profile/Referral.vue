<template>
  <div
    class="
      bg-gray-50
      text-sm text-gray-700
      border-solid border border-gray-200
      rounded-3xl
      mb-5
      md:mb-0
    "
  >
    <div class="flex p-7">
      <div class="">
        <Avatar size="medium" :user="user" />
      </div>
      <div class="ml-5">
        <span class="text-lg leading-loose font-medium text-gray-900 pb-1">
          {{ user.name }}
        </span>
        <p>Joined 3 weeks ago</p>
        <div class="pt-1">
          <ul class="text-sm leading-loose font-light text-gray-700 pb-1 test">
            <li>
              <span class="ml-5">in a challenge in</span>
              <span class="font-bold">Celo Community</span>
              <span class="hidden md:inline-block">{{ timestamp.date }}</span>
            </li>

            <li>
              <span class="ml-5">Submission evaluated</span>
              <span class="font-bold">15/20</span> points
              <span class="hidden md:inline-block">{{ timestamp.date }}</span>
            </li>
            <li>
              <span class="ml-5">You earned the referral reward</span>
              <span class="font-bold"> </span>
              <span class="hidden md:inline-block">{{ timestamp.date }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/ui/Avatar'
import DateManager from '@/utilities/DateManager'
export default {
  name: 'Referral',
  components: {
    Avatar,
  },
  data() {
    return {
      user: {
        name: 'lorovani',
        text: 'AEQuiz is a web æpp that engages the audience in a unique and fun way and connects them to the learning material. It also gives immediate results to participants...',
      },
      timestamp: {
        date: '3 days ago',
      },
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    date() {
      return DateManager.fromNow(this.timestamp.date)
    },
  },
}
</script>
