
<template>
 <v-row
  justify="center"
  no-gutters
 >

  <v-col
   class="msg-wrapper"
  >

   <v-row
    no-gutters
    class="msg d-flex flex-column"
    :class="{owner}"
   >
    <span v-if="!owner" class="msg__date">{{ message.created_at }}</span>
    <span v-if="owner" class="owner__date">{{ message.created_at }}</span>

    <div  v-if="!owner" class="msg__user-name">
     <span class="font-weight-bold">{{ message.author_name }}</span>
    </div>

    <div v-if="owner" class="owner__user-name">
     <span class="font-weight-bold">{{ message.author_name }}</span>
    </div>

     <p v-if="!owner" class="msg__text mb-0">{{ message.text }}</p>
     <p v-if="owner" class="owner__text mb-0">{{ message.text }}</p>

    <div class="d-flex flex-column" v-if=" message.link_files">
     <a class="download-file" v-for="(link, index) in message.link_files" :key="index"
      :href="link.link"
      download
     >
      <v-icon>
       mdi-file-send
      </v-icon>
      {{link.name}}
     </a>
    </div>


    <div class="d-flex flex-column" v-if="message.message_files">
     <a class="download-file" v-for="(link, index) in message.message_files" :key="index"
        :href="link.link"
        target="_blank"
        download
     >
      <v-icon>
       mdi-file-send
      </v-icon>
      {{link.name}}
     </a>
    </div>

   </v-row>
  </v-col>

 </v-row>

</template>

<script>
 export default {
  props: {
   message: {
    type: Object,
    default: () => {},
   },
   owner: {
    type: Boolean,
   },
  },
 };
</script>

<style lang="scss" scoped>
 .system {
  margin-bottom: 1rem;
  color: #fff;
  p {
   margin-bottom: 1rem;
  }
 }
 .msg-wrapper {
  display: flex;
  flex-direction: column;
 }
 .msg {
  padding: 4px 10px;
  width: auto;
  min-width: 10%;
  max-width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 10px;
  border-top-left-radius: 0;
  background: #fff;
  color: #333;
  align-self: flex-start;
  position: relative;
  word-break: break-all;
  margin-bottom: 2rem;
  &__date {
   text-decoration: none;
   font-size: 10px;
   position: absolute;
   padding: 0px 3px;
   opacity: .7;
   left: 0;
   top: -20px;
   background: #fff;
   white-space: nowrap;
  }
  &__user-name{
   align-self: flex-start;
   font-size: 14px;
  }
  &__text{
   align-self: flex-start;
   font-size: 14px;
  }
 }
 .owner {
  background: #dcf8c6;
  color: #333;
  align-self: flex-end;
  border-radius: 10px;
  border-top-right-radius: 0;
  &__date {
   text-decoration: none;
   font-size: 10px;
   position: absolute;
   padding: 0px 3px;
   right: 0;
   opacity: .7;
   top: -20px;
   background: #fff;
   white-space: nowrap;
  }
  &__user-name{
   align-self: flex-end;
   font-size: 14px;
  }
  &__text{
   align-self: flex-end;
   font-size: 14px;
  }
 }
 @media (max-width: 800px) {
  .msg {
   width: 80%;
   max-width: 80%;
  }
 }
</style>