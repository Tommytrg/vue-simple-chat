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
          <div v-if="msg.participant === 'internal'" class="time">12.20</div>
          <div class="text" :class="[msg.participant]">
            <p>{{ msg.text }}</p>
          </div>
          <div v-if="msg.participant === 'external'" class="time">12.20</div>
        </div>
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
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import "dayjs/locale/es";

dayjs.extend(calendar);
type Message = {
  id: number;
  text: string;
  participant: "internal" | "external";
  time: string;
  date: string;
};

export default Vue.extend({
  name: "Chat",
  props: {
    placeholder: {
      type: String,
      default: "Write a message..."
    },
    messages: {
      type: Array,
      default: () => [
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
    }
  },
  data() {
    return {
      internalMessage: "",
      message: this.placeholder
    };
  },
  methods: {
    formatTime(time: Date) {
      return dayjs(time).format("hh:mm");
    },
    formatDate(date: Date) {
      dayjs().calendar(dayjs(date));
      return dayjs(date)
        .locale("en")
        .calendar(undefined, {
          sameDay: "[Today]",
          lastDay: "[Yesterday]", // The day before ( Yesterday at 2:30 AM )
          lastWeek: "dddd", // Last week ( Last Monday at 2:30 AM )
          sameElse: "DD/MM/YYYY" // Everything else ( 7/10/2011 )
        });
    },
    isDifferentDate(index: number) {
      return (
        index === 0 ||
        (this.messages as Array<Message>)[index].date !==
          (this.messages as Array<Message>)[index - 1].date
      );
    },
    checkInView(container: any, element: any, partial: boolean = true) {
      //Get container properties
      let cHeight = container.clientHeight;
      let cTop = container.scrollTop;
      let cBottom = cTop + cHeight;

      //Get element properties
      let eTop = element.offsetTop;
      let eBottom = eTop + element.clientHeight;

      //Check if in view
      let isTotal = eTop >= 0 && eBottom <= cHeight;
      let isPartial =
        partial && ((eTop < 0 && eBottom > 0) || (eTop > 0 && eTop <= cHeight));

      //Return outcome
      return isTotal || isPartial;
    },
    addCarriageReturn(event: Event) {
      event.preventDefault();
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
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 275px auto;
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
        padding: 8px 16px 8px 16px;
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
