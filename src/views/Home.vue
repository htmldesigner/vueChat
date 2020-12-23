<template>
 <v-app id="inspire" v-if="isUserLoggedIn">
  <Loader v-if="loader"/>

  <v-snackbar
   top
   :value="updateExists"
   :timeout="-1"
   tile
   color="primary"
   elevation="4"
  >
   Доступно новое обнавление
   <v-btn text @click="refreshApp">
    Обнавить
   </v-btn>
  </v-snackbar>

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
    <v-list-item-group
     v-model="item" color="primary">
     <v-list-item
      v-for="(item, i) in filterRooms"
      :key="i"
      @click="getMessage(item.id, room_id = item.id)"
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

      <v-form
       ref="form" v-model="valid" validation enctype="multipart/form-data"
      >

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
           v-model="name"
           :rules="nameRule"
          ></v-text-field>

         </v-row>

        </v-col>


        <v-col
         cols="12"
        >
         <v-row class="mr-0">
          <v-select
           v-model="recipients"
           :items="getRecipients"
           label="Получатели"
           multiple
           :rules="recipientsRules"
           chips
           item-text="title"
           item-value="id"
           hint="Получатели сообщений"
           persistent-hint
          >
           <template #selection="{ item }">
            <v-chip :color="item.color">{{item.title}}</v-chip>
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
           item-text="text"
           item-value="value"
           label="Тип темы"
           v-model="theme"
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
           label="Текст сообщения"
           v-model="message"
           :rules="messageRules"
          ></v-textarea>
         </v-row>
        </v-col>

        <v-col
         cols="12"
        >
         <v-row class="mr-2">
          <v-file-input
           chips
           accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
           multiple
           v-model='file'
           label="Прикрепить фаил"
          ></v-file-input>
         </v-row>
        </v-col>


       </v-row>
      </v-form>
     </v-container>

     <v-card-actions>
      <v-btn
       color="primary"
       @click="dialog = false"
      >Закрыть
      </v-btn>
      <v-btn
       :disabled="!valid"
       color="primary"
       @click="createRoom"

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
    <span class="hidden-sm-and-down">Application UserID / {{user.id}}{{getCanFinish}}{{getCanHold}}</span>
   </v-toolbar-title>
   <v-spacer></v-spacer>

   <v-toolbar-items>

    <v-menu v-if="getCanHold || getCanFinish"
     bottom
     left
     tile
     content-class="elevation-0"
    >
     <template v-slot:activator="{ on, attrs }">
      <v-btn
       dark
       icon
       v-bind="attrs"
       v-on="on"
      >
       <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
     </template>

     <v-list>
      <v-list-item
       v-for="(item, i) in holdStatus"
       :key="i"
       @click="setHoldStatus(item.status, item.type)"
      >
       <v-list-item-icon style="margin-right: 5px">
        <v-icon dense :color="item.color" v-text="item.icon"></v-icon>
       </v-list-item-icon>
       <v-list-item-content>
        <v-list-item-title v-text="item.text"></v-list-item-title>
       </v-list-item-content>
      </v-list-item>
     </v-list>
    </v-menu>

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
     <div class="room-title" v-if="roomTitle">
      <v-alert
       v-for="(item, index) in roomTitle"
       :key="index"
       v-model="alertRoomTitle"
       color="#fff"
       dismissible
       border="left"
       dense

       transition="scale-transition"
      >
       <template slot="prepend">
        <v-icon
         :color="item.color"
        >
         {{item.icon}}
        </v-icon>
       </template>
       <p class="mx-1">{{item.title}}</p>
      </v-alert>
     </div>
     <div
      ref="chat"
      class="chat"
      :style="userBackground"
     >

      <Message
       v-for="(message, index) in getRoomMessage"
       :key="`message-${index}`"
       :message="message"
       :owner="message.created_by === user.id"
      />
     </div>

     <div class="chat__form">
      <ChatForm ref="chatForm" @resetForm="resetForm"/>
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
 import update from "../mixin/update";

 export default {
  name: 'Home',
  components: {
   Message,
   ChatForm,
   Loader
  },
  mixins: [update],
  computed: {
   ...mapGetters([
    'user',
    'getRoomMessage',
    'getRecipients',
    'getCanHold',
    'getCanFinish'
   ]),


   holdStatus() {
    let result = null

    if(this.getCanFinish && !this.getCanHold){
     result = [
      {status: 1, type: 'close', text: 'Завершить', icon: 'mdi-check-circle-outline', color: 'red'},
      {status: 0, type: 'close', text: 'Возобнавить', icon: 'mdi-check-circle-outline', color: 'green'}
     ]
    }

    if(this.getCanHold && !this.getCanFinish){
     result = [
      {status: 1, type: 'hold', text: 'Закрепить', icon: 'mdi-lock', color: 'red'},
      {status: 0, type: 'hold', text: 'Открепить', icon: 'mdi-lock-open', color: 'green'},
     ]
    }

    if(this.getCanHold && this.getCanFinish){
     result = [
      {status: 1, type: 'close', text: 'Завершить', icon: 'mdi-close-octagon-outline', color: 'red'},
      {status: 0, type: 'close', text: 'Возобнавить', icon: 'mdi-folder-open-outline', color: 'green'},
      {status: 1, type: 'hold', text: 'Закрепить', icon: 'mdi-lock', color: 'red'},
      {status: 0, type: 'hold', text: 'Открепить', icon: 'mdi-lock-open', color: 'green'},
     ]
    }

    return result
   },

   userBackground() {
    return `background-image: url("${this.$store.getters.userBackground}"); background-repeat: repeat;`
   },

   isUserLoggedIn() {
    let user = this.$store.getters.isUserLoggedIn
    if (user) {
     return user
    } else {
     this.$router.push('/login')
    }
   },

   getRooms() {
    if (this.$store.getters.getRooms) {
     this.$store.getters.getRooms.forEach(el => {
      if (el.no_answer) {
       el.icon = 'mdi-clock-outline', el.color = 'orange'
      }
      if (el.finished) {
       el.icon = 'mdi-check-circle-outline', el.color = 'red'
      }
      if (!el.finished) {
       el.icon = 'mdi-chat-processing-outline', el.color = 'green'
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
      return '40%'
     case 'lg':
      return '30%'
     case 'xl':
      return '30%'
    }
   },

  },

  watch: {
   getRoomMessage(newValue, oldValue) {
    if (newValue?.length !== oldValue?.length) {
     setTimeout(() => {
      if (this.$refs.chat) {
       this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight
      }
     }, 0);
    }
   },
  },

  data() {
   return {
    recipients: [],
    name: '',
    message: '',
    theme: null,
    file: [],
    valid: false,
    interval: null,
    roomTitle: null,
    room_id: null,
    alertRoomTitle: true,

    nameRule: [v => !!v || 'Название обязательно', v => (v && v.length >= 3) || 'Мин. 3 символа '],
    messageRules: [v => !!v || 'Сообщение обязательно', v => (v && v.length >= 3) || 'Мин. 3 символа '],

    recipientsRules: [
     v => !!v || v.length, v => (v && v.length >= 1) || 'Мин. 1 получатель'
    ],

    themeType: [{value: 1, text: 'открытая'}, {value: 0, text: 'закрытая'}],

    loader: true,
    searchRoom: '',
    dialog: false,
    drawer: true,
    item: 0,
   }
  },
  methods: {
   createRoom() {
    if (this.$refs.form.validate()) {

     const room = {
      ...this.file,
      title: this.name,
      description: this.message,
      is_open: this.theme,
      recipients: this.recipients
     };
     this.$store.dispatch('createRoom', room).then(() => {
      this.$store.dispatch('getRooms')
     })
     this.dialog = false
    }
   },

   setHoldStatus(status, type) {
    if (this.room_id === null) {
     this.$store.dispatch('setError', 'Выбирете группу')
    } else {
     let param = {room_id: this.room_id, status: status, type: type}
     this.$store.dispatch('satStatus', param).then(() => {
      this.$store.dispatch('getRooms')
     })
    }
   },

   getMessage(id) {
    clearInterval(this.interval)
    this.interval = null
    this.alertRoomTitle = true

    this.$store.dispatch('getMessage', id)

    if(!this.interval){
     this.interval = setInterval(() => {
      this.$store.dispatch('getMessage', id)
     }, 1000 * 5)
    }else {
     clearInterval(this.interval)
     this.interval = null
    }

    this.roomTitle = this.getRooms.filter(el => {
     return el.id === id
    })

    switch (this.$vuetify.breakpoint.name) {
     case 'xs':
      return this.drawer = false
     case 'sm':
      return this.drawer = false
     case 'md':
      return this.drawer = false
     case 'lg':
      return this.drawer = true
     case 'xl':
      return this.drawer = true
    }


   },

   onLogout() {
    this.$store.dispatch('logOut')
     .then(this.$router.push('/login'))
   },

   resetForm() {
    let chatForm = document.querySelector('.chat__form')
    let chat = document.querySelector('.chat')
    chatForm.style.height = '124px'
    chat.style.bottom = '124px'
   },

   resizePanel() {
    return this.$refs.chatForm?.$el.clientHeight
   }
  },
  mounted() {

   let chatForm = document.querySelector('.chat__form')
   let chat = document.querySelector('.chat')
   if (chatForm) {
    chatForm.style.height = this.resizePanel() + 30 + 'px'
    chat.style.bottom = this.resizePanel() + 30 + 'px'
   }

   addEventListener('change', () => {
    chatForm.style.height = this.resizePanel() + 30 + 'px'
    chat.style.bottom = this.resizePanel() + 30 + 'px'
   })

   addEventListener('input', () => {
    chatForm.style.height = this.resizePanel() + 30 + 'px'
    chat.style.bottom = this.resizePanel() + 30 + 'px'
   })

   if (this.isUserLoggedIn) {
    this.$store.dispatch('getRooms')
    this.$store.dispatch('getRecipients')
    this.$store.dispatch('getBackground')
    localStorage.setItem('localMessages', JSON.stringify([]))
   } else {
    this.$router.push('/login')
   }

   // document.addEventListener('contextmenu', event => event.preventDefault());

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
  height: 400px;
 }

 .chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 400px;
  padding: 10px 0;
  overflow-y: auto;
  color: #000;
  background-color: #e5ddd5;
 }

 .room-title {
  position: relative;
  /*background-color: #fff;*/
  z-index: 1;
  /*width: auto;*/
  display: flex;
  justify-content: center;
  /*opacity: .9;*/
  padding: 7px;
 }

 .room-title p {
  width: 100%;
  margin: 0px;
  word-wrap: break-word;
  text-align: center;
  font-size: 14px;
  color: #333;
  font-weight: 700;
 }

</style>
