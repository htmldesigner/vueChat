<template>
 <v-app id="app">
  <router-view></router-view>
  <template v-if="error">
   <v-snackbar
    content-class="snack-message"
    :timeout="4000"
    :value="true"
    top
    color="error"
    tile
    @input="errorClose"
    elevation="4"
   >
    {{error}}
    <template v-slot:action="{ attrs }">
     <v-btn
      tile
      color="white"
      text
      v-bind="attrs"
      @click="errorClose"
      small
     >
      Закрыть
     </v-btn>
    </template>
   </v-snackbar>
  </template>
 </v-app>
</template>

<script>

 import Home from "./views/Home"
 import Login from "./views/Login";
 import {mapActions, mapGetters, mapState, mapMutations} from "vuex";

 export default {
  name: 'App',
  components: {
   Home,
   Login
  },
  computed: {
   error() {
    return this.$store.getters.error
   },
   isUserLoggedIn() {
    return this.$store.getters.isUserLoggedIn
   },
  },
  methods: {
   errorClose() {
    this.$store.dispatch('clearError')
   },
  },
  // async mounted() {},
  // created() {
  //  if (this.$route.query['loginError']) {
  //   this.$store.dispatch('setError', 'Автоизируйтесь для доступа к чату.')
  //  }
  // }
 };
</script>
<style scoped>

</style>
