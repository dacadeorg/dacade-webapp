<template>
  <InteractiveModuleWrapper
    title="Cryptography"
    subtitle="Explanation"
    section-title="Blockchain Concepts"
    duration="15 minutes"
  >
    <div v-if="!started">
      Cryptography (from greek: kryptós "hidden, secret") is the practice and
      study of techniques for secure communication. Secure communication can
      guarantee: Privacy - Only the receiver is able to read the message.
      Integrity - A message has not been tampered with by a third party.
      Authenticity - A message was sent by the described sender. Cryptographic
      techniques allow us to send sensitive information via unsecured
      communication channels. To send a secure message, a sender can encrypt it.
      In this process, the original information (plaintext) gets converted into
      an encrypted version (ciphertext) via an algorithm (cipher). In order for
      the receiver of the message to read it, they need to decrypt it, which
      describes the process of converting the ciphertext back to plaintext, via
      a key. Public-key cryptography is one of the most widely used forms of
      encryption. It is used in blockchain technology to create addresses and
      private keys.
      <div class="mx-auto w-full text-center mt-8">
        <Button type="outline-primary" community-styles @click="start">
          Understood
        </Button>
      </div>
    </div>
    <div v-else class="relative">
      <InteractiveModuleAnswer
        v-for="(answer, index) in answers"
        :key="index"
        :data="answer"
        :selected="selected === index"
        :correct="correct === index"
        @select="select(index)"
      />
    </div>
  </InteractiveModuleWrapper>
</template>

<script>
import { mapGetters } from 'vuex'
import InteractiveModuleWrapper from './Wrapper'
import InteractiveModuleAnswer from './Answer'
import Button from '~/components/ui/button'

export default {
  name: 'InteractiveModule',
  components: {
    Button,
    InteractiveModuleAnswer,
    InteractiveModuleWrapper,
  },
  data() {
    return {
      answers: [
        {
          text: 'The practice and study of techniques for secure communication.',
        },
        {
          text: 'The practice and study of techniques for securing information.',
        },
        {
          text: 'The practice and study of techniques for securing data.',
        },
      ],
      selected: null,
      correct: 2,
      started: false,
    }
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
  },
  methods: {
    select(index) {
      if (this.selected === index) {
        this.selected = null
        return
      }
      this.selected = index
    },
    start() {
      this.started = true
    },
  },
}
</script>
