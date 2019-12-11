<template>
  <div class="chat">
    <div class="message-list" ref="messageList">
      <div
        v-for="(msg, index) in messages"
        :key="msg.id"
        class="row"
        :ref="`message-${index}`"
        :data-index="index"
      >
        <div v-if="isDifferentDate(index)" class="date">
          {{ formatDate(msg.date) }}
        </div>
        <div class="message" :class="[msg.participant]">
          <div v-if="msg.participant === 'internal'" class="time">{{ formatTime(msg.date) }}</div>
          <div class="text" :class="[msg.participant]">
            <p>{{ msg.text }}</p>
          </div>
          <div v-if="msg.participant === 'external'" class="time">{{ formatTime(msg.date) }}</div>
        </div>
      </div>
    </div>
    <form class="message-bar" v-on:submit.prevent="onSubmit">
      <textarea v-model="internalMessage" class="hidden" />
      <div
        tabindex="0"
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
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import "dayjs/locale/es";

dayjs.extend(calendar);

type Message = {
  id: number
  text: string
  participant: "internal" | "external"
  date: number 
}

export default Vue.extend({
  name: "Chat",
  props: {
    today: {
      type: String
    },
    yesterday: {
      type: String
    },
    placeholder: {
      type: String,
      default: "Write a message..."
    },
    messages: {
      type: Array,
    }
  },

  mounted() {
    this.scrollMessageListDown()
  },
  updated() {
    this.scrollMessageListDown()
  },

  data() {
    return {
      isMessageSent: false,
      internalMessage: "",
      message: this.placeholder
    };
  },
  watch: {
    messages() {
      this.scrollMessageListDown()
    }
  },
  methods: {
    goToInputEnd(input: any) {
      input.scrollLeft = input.scrollWidth;
      input.setSelectionRange(input.value.length, input.value.length )
    },
    scrollMessageListDown() {
      (this.$refs.messageList as HTMLElement).scrollTop = (this.$refs.messageList as HTMLElement).scrollHeight
    },
    formatTime(time: Date) {
      return dayjs(time).format("hh:mm");
    },
    formatDate(date: Date) {
      dayjs().calendar(dayjs(date));
      return dayjs(date)
        .locale("en")
        .calendar(undefined, {
          sameDay: this.today ? `[${this.today}]` : "[Today]",
          lastDay: this.yesterday ? `[${this.yesterday}]` : "[Yesterday]",
          lastWeek: "dddd",
          sameElse: "DD/MM/YYYY"
        });
    },
    isDifferentDate(index: number) {
      return (
        index === 0 ||
        (this.messages as Array<Message>)[index].date !==
          (this.messages as Array<Message>)[index - 1].date
      );
    },
    addCarriageReturn(event: Event) {
      event.preventDefault();
    
    },
    setFocus() {
      if (this.message === this.placeholder) {
        this.message = "";
      }
    },
    write(input: { target: HTMLElement }) {
      // this.goToInputEnd(this.$refs.messageInput)
      if (this.isMessageSent) {
        this.message = ''
        input.target.innerText = input.target.innerText.replace(this.placeholder, '')
        this.isMessageSent = false
      }

      this.internalMessage = input.target.innerText;
    },
    onSubmit(e: Event) {
      // e.preventDefault();
      if (this.internalMessage.trim()) {
        this.$emit("send", this.internalMessage.trim());
        (this.$refs.messageInput as HTMLElement).innerText = this.placeholder
        this. isMessageSent = true
        this.message = '' as string
        this.scrollMessageListDown()
      }
    }
  }
});
</script>

<style lang="scss">
.chat {
  font-family: Arial, Helvetica, sans-serif;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 275px 48px;
  height: 335px;
  justify-content: center;
  padding: 8px 32px;
  width: 536px;

  .date {
    font-size: 14px;
    font-weight: 900;
    text-align: center;
    padding: 8px;
  }

  .message-list {
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;
    margin: 8px 0;

    .message {
      padding: 4px 0;
      display: flex;
      align-content: flex-end;

      .internal,
      .external {
        display: flex;
        padding: 16px 16px 16px 16px;
        border: 1px solid black;
        display: flex;
        border-radius: 28px;
        // box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);

        p {
          padding: 0;
          margin: 0;
        }
      }

      &.internal {
        justify-content: flex-end;

        .text {
        }
      }

      &.external {
        justify-content: flex-start;

        .text {
          background: black;
          color: white;
        }
      }

      .text {
        max-width: 300px;
        white-space: pre-wrap;
        word-break: break-all;
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
    border-radius: 10px;
    border: 1px solid black;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    // min-height: 32px;
    padding: 8px 16px 8px 16px;
    width: 472px;

    .user-input {
      resize: none;
      border: none;
      outline: none;
      border-bottom-left-radius: 10px;
      box-sizing: border-box;
      padding: 4px;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.33;
      white-space: pre-wrap;
      word-wrap: break-word;
      color: #565867;
      -webkit-font-smoothing: antialiased;
      overflow: scroll;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
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
      padding-left: 16px;
      border-left: 1px solid #aaa;
      margin: 0;

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
