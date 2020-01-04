<template>
  <div id="app">
    <Chat
      :messages="messages"
      yesterday="Ayer"
      today="Hoy"
      placeholder="Escribe un mensaje..."
      v-on:send="pushMessage"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Chat from "./components/Chat.vue";

export default Vue.extend({
  name: "app",
  methods: {
    pushMessage(msg: string) {
      this.messages.push({
        text: msg,
        id: 1000000,
        participant: "internal",
        date: Date.now(),
        time: "0"
      });
    }
  },
  data() {
    return {
      messages: [
        {
          id: 110,
          text: "Hola",
          participant: "internal",
          time: "10.20",
          date: 1575148557000
        },
        {
          id: 11111,
          text: "Hola",
          participant: "internal",
          time: "10.20",
          date: 1575321357000
        },
        {
          id: 11116,
          text: "Hola",
          participant: "internal",
          time: "10.20",
          date: 1575580557000
        },
        {
          id: 230,
          text: "Hola",
          participant: "internal",
          time: "10.20",
          date: 1575839757000
        },
        {
          id: 40,
          text: "Hola",
          participant: "internal",
          time: "10.20",
          date: 1575926157000
        },
        {
          id: 51,
          text: `Hola adsfadsf
        
       asdfadsfadfAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa


sfdasdf
       adsf
       asdf
       adsfadsfadfs
       
       asfdadsfafd
        `,
          participant: "external",
          time: "10.20",
          date: 1576012557000
        }
      ]
    };
  },
  components: {
    Chat
  }
});
</script>

<style lang="scss"></style>
