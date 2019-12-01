<template>
  <div id="app">
    <Chat />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Chat from "./components/Chat.vue";

export default Vue.extend({
  name: "app",
  components: {
    Chat
  }
});
</script>

<style lang="scss"></style>
