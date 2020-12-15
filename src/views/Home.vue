<template>
 <v-app id="inspire" v-if="isUserLoggedIn">

  <Loader v-if="loader"/>

  <v-navigation-drawer
   :width="drawerWidth"
   v-model="drawer"
   :clipped="$vuetify.breakpoint.lgAndUp"
   app
  >

   <v-text-field
    class="mt-5 mx-3 mb-0"
    hide-details
    outlined
    dense
    prepend-inner-icon="mdi-magnify"
    label="Поиск"
    v-model="searchRoom"
   ></v-text-field>

   <v-list dense>
    <v-subheader>ТЕМЫ</v-subheader>
    <v-list-item-group v-model="item" color="primary">
     <v-list-item
      v-for="(item, i) in filterRooms"
      :key="i"
      @click="getMessage(item.id), drawer = false"
     >
      <v-list-item-icon>
       <v-icon
        v-text="item.icon"
        :color="item.color"
        size="22"
       ></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
       <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item-content>
     </v-list-item>
    </v-list-item-group>
   </v-list>

   <v-btn
    bottom
    color="pink"
    dark
    fab
    fixed
    right
    @click="dialog = !dialog"
    style="z-index: 9999"
    class="mr-sm-0 mr-xl-5"
   >
    <v-icon>mdi-plus</v-icon>
   </v-btn>

   <v-dialog
    v-model="dialog"
    width="800px"
   >
    <v-card>
     <v-card-title class="card-title">
      Создать чат
     </v-card-title>
     <v-container>
      <v-row class="mx-2">
       <v-col
        class="align-center justify-space-between"
        cols="12"
       >
        <v-row
         align="center"
         class="mr-0"
        >

         <v-text-field
          hide-details
          dense
          label="Название"
         ></v-text-field>

        </v-row>

       </v-col>


       <v-col
        cols="12"
       >
        <v-row class="mr-0">
         <v-select
          v-model="e7"
          :items="states"
          label="Получатели"
          multiple
          chips
          item-text="name"
          hint="Полусатели сообщений"
          persistent-hint
         >
          <template #selection="{ item }">
           <v-chip :color="item.color">{{item.name}}</v-chip>
          </template>
         </v-select>
        </v-row>

       </v-col>

       <v-col
        cols="12"
       >
        <v-row class="mr-0">
         <v-select
          :items="themeType"
          label="Тип темы"
         ></v-select>
        </v-row>
       </v-col>

       <v-col
        cols="12"
       >
         <v-row class="mr-2">
          <v-textarea
           outlined
           name="input-7-4"
           label="Outlined textarea"
           value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
         </v-row>
       </v-col>

       <v-col
        cols="12"
       >
         <v-row class="mr-2">
          <v-file-input
           chips
           multiple
           label="Прикрепить фаил"
          ></v-file-input>
         </v-row>
       </v-col>


      </v-row>
     </v-container>

     <v-card-actions>
      <v-btn
       text
       color="primary"
       @click="dialog = false"
      >Закрыть
      </v-btn>
      <v-btn
       text
       @click="dialog = false"
      >Сохранить
      </v-btn>
     </v-card-actions>

    </v-card>
   </v-dialog>

  </v-navigation-drawer>

  <v-app-bar
   :clipped-left="$vuetify.breakpoint.lgAndUp"
   app
   color="#009688"
   dark
   dense
   elevation="0"
  >
   <v-app-bar-nav-icon @click.stop="drawer = !drawer">
    <v-icon large>mdi-chat-processing-outline</v-icon>
   </v-app-bar-nav-icon>
   <v-toolbar-title
    style="width: 300px"
    class="ml-0 pl-4"
   >
    <span class="hidden-sm-and-down">Application UserID / {{user.id}}</span>
   </v-toolbar-title>
   <v-spacer></v-spacer>

   <v-toolbar-items>

    <v-btn
     text
     :icon="icon"
     @click="onLogout"
     style="margin-right: -12px"
     title="Закрепить"
    >
     <v-icon medium>mdi-dots-horizontal</v-icon>
    </v-btn>

    <!--LogOut-->
    <v-btn text
           :icon="icon"
           @click="onLogout"
           style="margin-right: -12px"
    >
     <v-icon medium>mdi-logout-variant</v-icon>
     <span class="ml-2 hidden-sm-and-down">Выход</span>
    </v-btn>

   </v-toolbar-items>

  </v-app-bar>

  <v-main>
   <v-container
    fluid
    style="height: 100%; padding: 0px;"
   >

    <div class="chat-wrapper">

     <div
      ref="chat"
      class="chat"
     >

      <Message
       v-for="(message, index) in getRoomMessage"
       :key="`message-${index}`"
       :message="message"
       :owner="message.created_by === user.id"
      />
     </div>

     <div class="chat__form">
      <ChatForm/>
     </div>
    </div>
   </v-container>
  </v-main>

 </v-app>
</template>

<script>
 import {mapActions, mapGetters, mapState, mapMutations} from "vuex";
 import Message from "../components/Message";
 import ChatForm from "../components/ChatForm";
 import Loader from "../components/Loader";

 export default {
  name: 'Home',
  components: {
   Message,
   ChatForm,
   Loader
  },
  computed: {
   ...mapGetters(['user', 'getRoomMessage', 'isUserLoggedIn']),
   getRooms() {
    if (this.$store.getters.getRooms) {
     this.$store.getters.getRooms.forEach(el => {
      if (el.no_answer) {
       el.icon = 'mdi-clock-outline', el.color = 'orange'
      }
      if (el.finished) {
       el.icon = 'mdi-chat-processing-outline', el.color = 'green'
      }
      if (!el.finished) {
       el.icon = 'mdi-check-circle-outline', el.color = 'green'
      }
      if (el.is_hold) {
       el.icon = 'mdi-lock', el.color = 'red'
      }
     })
     return this.$store.getters.getRooms
    }
   },

   filterRooms() {
    return this.getRooms?.filter(el => {
     return el.title.toLowerCase().indexOf(this.searchRoom.toLowerCase()) !== -1
    })
   },

   icon() {
    switch (this.$vuetify.breakpoint.name) {
     case 'xs':
      return true
     case 'sm':
      return true

    }
   },
   drawerWidth() {
    switch (this.$vuetify.breakpoint.name) {
     case 'xs':
      return '100%'
     case 'sm':
      return '100%'
     case 'md':
      return '100%'
     case 'lg':
      return '40%'
     case 'xl':
      return '30%'

    }
   },
  },
  data() {
   return {
    e6: [],
    e7: [],
    states: [
     {name: 'Alabama', color: 'red'},
     {name: 'Alaska', color: 'green'},
     {name: 'Arizona', color: 'blue'},
     {name: 'Delaware', color: 'orange'},
     {name: 'Florida', color: ''},
     {name: 'Georgia', color: 'red'},
     {name: 'Hawaii', color: 'red'},

    ],
    themeType: ['открытая', 'закрытая'],
    loader: true,
    searchRoom: '',
    dialog: false,
    drawer: true,
    item: 0,
   }
  },
  methods: {
   getMessage(id) {
    this.$store.dispatch('getMessage', id)
   },
   onLogout() {
    this.$store.dispatch('logOut')
     .then(this.$router.push('/login'))
   },
  },
  async mounted() {
   if (this.isUserLoggedIn) {
    await this.$store.dispatch('getRooms')
   }
   this.loader = false
  }
 };
</script>
<style scoped>
 .chat-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
 }

 .chat__form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
 }

 .chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
  color: #000;
  background-color: #e5ddd5;
 }

 .chat__typing {
  position: absolute;
  display: flex;
  bottom: 50px;
 }

 .chat__typing-user:not(first-child) {
  margin-left: 15px;
 }
</style>
