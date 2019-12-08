<template>
  <div class="chat">
    <div class="date">Hoy</div>
    <div class="message-list">
      <div v-for="msg in msgList" :key="msg.id" class="message" :class="[msg.participant]">
        <div v-if="msg.participant === 'internal'" class="time"> 12.20 </div>
        <div class="text" :class="[msg.participant]">
          <p>{{ msg.text }}</p>
        </div>
        <div v-if="msg.participant === 'external'" class="time"> 12.20 </div>
      </div>
    </div>
    <form class="message-bar" v-on:submit.prevent="onSubmit">
      <textarea v-model="internalMessage" class="hidden" />
      <div
        contenteditable="true"
        class="user-input"
        ref="messageInput"
        @click="setFocus"
        @keyup.prevent.shift.13="addCarriageReturn"
        @input="write"
        @keyup.prevent.exact.13="onSubmit"
      >
        {{ message }}
      </div>
      <button class="send">Enviar</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Chat",
  props: {
    msgList: {
      type: Array,
      default: () => [
        { id: 0, text: "Hola", participant: "internal" },
        { id: 1, text: `Hola adsfadsf
        
       asdfadsfadfAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa


sfdasdf
       adsf
       asdf
       adsfadsfadfs
       
       asfdadsfafd
        `, participant: "external" },
      ]
    }
  },
  data() {
    return {
      internalMessage: "",
      message: "Escribe un mensaje...",
      placeholder: "Escribe un mensaje..."
    };
  },
  methods: {
    addCarriageReturn(event: Event) {
      event.preventDefault();
      console.log("----");
      // this.message += '\n '
    },
    setFocus(target: HTMLElement) {
      if (this.message === this.placeholder) {
        this.message = "";
      }
    },
    write(input: { target: HTMLElement }) {
      this.internalMessage = input.target.innerText;
    },
    onSubmit(e: Event) {
      e.preventDefault();
      this.$emit("onSendMessage", this.internalMessage);
    }
  }
});
</script>

<style lang="scss">
.chat {
  border: 1px solid black;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 250px auto;
  height: 335px;
  justify-content: center;
  padding: 8px 32px;
  width: 536px;

  .date {
    font-size: 14px;
    font-weight: 900;
    text-align: center;
  }

  .message-list {
    padding: 0 8px;
    height: max-content;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 8px 0;

    .message {
      display: flex;
      align-content: flex-end;

      .internal,
      .external {
        display: flex;
        padding: 8px 16px 8px 16px;
        border: 1px solid black;
        display: flex;
        border-radius: 28px;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
        
        p {
          padding: 0;
          margin: 0;
        }
      }

      &.internal {
        justify-content: flex-end;
      }

      &.external {
        justify-content: flex-start;
      }


      .text {
        // display: flex;
        max-width: 300px;
        white-space: pre-wrap;
        word-wrap: anywhere;
        
        // line-break: anywhere;
      }

      .time {
        display: flex;
        align-self: end;
        font-size: 12px;
        color: #aaa;
        font-weight: 300;
        margin: 0 8px;
      }
    }
  }

  .message-bar {
    border: 1px solid black;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    max-height: 72px;
    min-height: 32px;
    padding: 8px 16px 8px 24px;
    width: 472px;

    .user-input {
      align-items: center;
      color: black;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      max-height: 80px;
      outline: none;

    }

    .hidden {
      display: none;
    }

    .send {
      cursor: pointer;
      border: none;
      background: transparent;
      font-weight: bold;
      outline: none;

      &:active {
        border: none;
        color: black;
        outline: none;
      }

      &:focus {
        color: grey;
      }

      &::-moz-focus-inner {
        border: 0;
      }
    }
  }
}
</style>
