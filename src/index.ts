import Chat from './components/Chat.vue'

export default {
 install(Vue: any, options: any) {
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  Vue.component("vue-simple-chat", Chat);
 }
};
