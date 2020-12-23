<template>
 <v-form
  ref="form"
  @submit.prevent="send"
 >

  <v-file-input
   class="ma-0 pa-0"
   small-chips
   accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
   multiple
   label="Прикрепить фаил(ы)"
   color="#333"
   v-model='file'
  ></v-file-input>

  <v-textarea
   color="#333"
   v-model="text"
   label="Сообщение..."
   outlined
   dense
   rows="1"
   auto-grow
   hide-details
   :rules="rules"
   append-icon="mdi-send-circle-outline"
   @click:append="send"
   @blur="resetValidation"
  />

 </v-form>
</template>

<script>
 import { mapActions, mapGetters } from "vuex";
 export default {
  data: () => ({
   file: [],
   text: "",
   rules: [v => !!v || 'Введите текст', v => (v && v.length >= 1) || 'Введите текст'],
  }),
  computed: {
   ...mapGetters({
    getRoomMessage: 'getRoomMessage'
   })
  },
  methods: {
   send() {
    if (this.$refs.form.validate()) {

     let message = {
      ...this.file,
      text: this.text.toString(),
      id: this.getRoomMessage[0].room_id,
     }
     this.$store.dispatch('sendMessage', message).then(() => {
      this.$store.dispatch('getMessage', this.getRoomMessage[0].room_id)
     })
     this.text = ''
     this.file = []
     this.$emit('resetForm')
     this.resetValidation();
    }
   },

   resetValidation() {
    this.$refs.form.resetValidation();
   },
  },
 };
</script>
<style lang="scss" scoped>
 .v-file-input {
  flex-direction: row-reverse;
 }
</style>