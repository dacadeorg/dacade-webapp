<template>
  <div class="pt-14">
    <h3 class="leading-normal text-default capitalize font-medium">
      Cryptography
    </h3>
    <p class="text-sm pb-3 pt-1">
      <span
        :style="{
          color: colors.textAccent,
        }"
      >
        15 min
      </span>
      Interactive lessons
    </p>
    <Progress />
    <div class="pt-9">
      <h3 class="leading-normal text-default capitalize font-medium">
        Cryptography
      </h3>
      <span class="pt-1 text-gray-500 text-sm">Explanation</span>
    </div>
    <div class="pt-6">
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
    </div>

    <div class="mx-auto w-full text-center mt-8">
      <button class=" bg-transparent border border-solid border-green-500 text-green-500"> Understood
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Progress from '@/components/ui/Progress'

export default {
  name: 'InteractiveModule',
  components: {
    Progress,
  },
  computed: {
    ...mapGetters({
      colors: 'ui/colors',
      community: 'communities/current',
    }),
    
  },
}
</script>
