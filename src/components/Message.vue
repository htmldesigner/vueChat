
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
    class="msg"

    :class="{owner}"
   >
    <div>
     <span class="font-weight-bold">{{ message.author_name }}</span>
     <span class="msg__date ml-3 auto">{{ message.created_at }}</span>
    </div>

     <p class="mb-0">{{ message.text }}</p>

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
  padding: 10px;
  width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 15px;
  background: #fff;
  color: #000;
  position: relative;
  word-break: break-all;
  margin-bottom: 1rem;
  &__date {
   text-decoration: underline;
   font-size: 12px;
  }
 }
 .owner {
  background: #dcf8c6;
  color: #000;
  align-self: flex-end;
 }
 @media (max-width: 400px) {
  .msg {
   width: 90%;
  }
 }
</style>