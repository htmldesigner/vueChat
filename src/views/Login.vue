<template>
 <v-app id="inspire">
  <v-main>
   <v-container
    class="fill-height"
    fluid
   >
    <v-row
     align="center"
     justify="center"
    >
     <v-col
      cols="12"
      sm="8"
      md="4"
     >
      <v-card class="elevation-2" tile>
       <v-toolbar
        color="#009688"
        dark
        flat
        dense
       >
        <v-toolbar-title>Вход</v-toolbar-title>

       </v-toolbar>
       <v-card-text>

        <v-form ref="form" v-model="valid" validation>
         <v-text-field
          label="Логин"
          name="login"
          v-model="login"
          prepend-icon="mdi-account"
          type="text"
          :rules="loginRules"
         ></v-text-field>

         <v-text-field
          id="password"
          label="Password"
          counter
          maxlength="25"
          v-model="password"
          name="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          prepend-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
         ></v-text-field>
        </v-form>

       </v-card-text>
       <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#009688" depressed tile dark @click="onSubmit" :loading="loading" :disabled="!valid || loading">Войти</v-btn>
       </v-card-actions>
      </v-card>
     </v-col>
    </v-row>
   </v-container>
  </v-main>
 </v-app>
</template>

<script>
 export default {
  name: 'Login',
  data() {
   return {
    showPassword: false,
    login: '',
    password: '',
    valid: false,
    loginRules: [v => !!v || 'Логин обязателен', v => (v && v.length >= 3) || 'Логин мин. 3 символа '],
    passwordRules: [v => !!v || 'Пароль обязателен', v => (v && v.length >= 6) || 'Пароль мин. 6 символов.'],
   };
  },
  computed: {
   loading() {
    return this.$store.getters.loading;
   },
  },
  methods: {
   onSubmit() {
    if (this.$refs.form.validate()) {
     const user = {username: this.login, password: this.password};
     this.$store
      .dispatch('loginUser', user)
      .then(() => {
       this.$router.push('/');
      })
      .catch(() => {
      });
    }
   },
   checkAuth() {
    this.$store.dispatch('checkAuth').then(() => {
     if(this.$store.getters.user){
      this.$router.push('/')
     }
    })
   },
  },
 async mounted() {
   await this.checkAuth()
  }
 };
</script>

<style scoped></style>
