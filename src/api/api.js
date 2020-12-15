import r from './routes'
import axios from 'axios';

export default {
 dataPost(route, data, token, withFile) {
  return {
   method: 'POST',
   url: r(route),
   data: data,
   headers: {}
  };
 },


 dataGet(route) {
  return {
   method: 'get',
   url: r(route),
   headers: {}
  };
 },


 getMessage(id) {
  return axios(this.dataGet('/data/room/'+id+'/messages'));
 },

 getRooms() {
  return axios(this.dataGet('/data/rooms'));
 },

 loginUser(param) {
  return axios(this.dataPost('/login', param));
 },

 sendMessage(params) {
  return axios(this.dataPost('/data/room/'+params.id+'/messages', {text: params.text}));
 },

}