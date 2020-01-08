<template>
  <div id="app">
    <Chat
      :messages="messages"
      yesterdayLiteral="Ayer"
      todayLiteral="Hoy"
      placeholder="Escribe un mensaje..."
      v-on:send="pushMessage"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Chat from '@/Chat.vue'

export default Vue.extend({
  name: 'app',
  methods: {
    pushMessage (msg: string) {
      this.messages.push({
        text: msg,
        id: 1000000,
        participant: 'internal',
        date: Date.now(),
      })
    }
  },
  data () {
    return {
      messages: [
        {
          id: 1,
          text: 'Hi',
          participant: 'internal',
          date: 1575148557000
        },
        {
          id: 2,
          text: 'How are you?',
          participant: 'internal',
          date: 1575321357000
        },
        {
          id: 3,
          text: 'Great!',
          participant: 'external',
          date: 1575580557000
        },
        {
          id: 4,
          text: 'See you',
          participant: 'internal',
          date: 1575839757000
        },
      ]
    }
  },
  components: {
    Chat
  }
})
</script>

<style lang="scss"></style>
