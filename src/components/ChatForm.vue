<template>
 <v-form
  ref="form"
  @submit.prevent="send"
 >
  <v-text-field
   v-model="text"
   label="Message..."
   outlined
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
   text: "",
   rules: [v => !!v || "Text is required"],
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
      text: this.text.toString(),
      id: this.getRoomMessage[0].id,
     }
     this.$store.dispatch('sendMessage', message).then(() => {
      this.$store.dispatch('getMessage', this.getRoomMessage[0].id)
     })
     this.text = ''
     this.resetValidation();
    }
   },

   resetValidation() {
    this.$refs.form.resetValidation();
   },
  },
 };
</script>