<template>
 <v-row
  justify="center"
  no-gutters
 >

  <v-col>

  <div class="message" style="height: 100%">
   <div v-for="(item, index) in chat" :key="index"
        :class="['d-flex flex-row align-center my-2', item.from == 'user' ? 'justify-end': null]">
    <span v-if="item.from == 'user'" class="blue--text mr-3">{{ item.msg }}</span>
    <v-avatar :color="item.from == 'user' ? 'indigo': 'red'" size="36">
     <span class="white--text">{{ item.from[0] }}</span>
    </v-avatar>
    <span v-if="item.from != 'user'" class="blue--text ml-3">{{ item.msg }}</span>
   </div>
  </div>




     <div class="d-flex flex-row align-center" style="position: absolute;">
      <v-text-field v-model="msg" placeholder="Type Something" @keypress.enter="send"></v-text-field>
      <v-btn icon class="ml-4" @click="send"><v-icon>mdi-send</v-icon></v-btn>
     </div>

   </v-col>
</v-row>
</template>

<script>
 export default {
  name: "Chat",
  data(){
   return {
    chat: [],
     msg: null,
   }
  },
  methods: {
   send: function(){
    this.chat.push(
     {
      from: "user",
      msg: this.msg
     })
    this.msg = null
    this.addReply()
   },
   addReply(){
    this.chat.push({
     from: "sushant",
     msg: "Hmm"
    })
   }
  }
 }
</script>

<style scoped>

</style>