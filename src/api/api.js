import r from './routes'
import axios from 'axios';

export default {
 dataPost(route, data) {
  let headers = {}
  headers['Content-Type'] = 'multipart/form-data';

  return {
   method: 'POST',
   url: r(route),
   data: data,
   headers: headers,
   transformRequest: [(data) => {
    let fData = new FormData();
    for (let key in data) {
     fData.set(key, data[key])
    }
    return fData;
   }],
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

 getBackground() {
  return axios(this.dataGet('/data/getbackground'));
 },

 setHoldStatus(param){
  return axios(this.dataPost('/data/room/'+param.room_id+'/hold', {hold: param.status}));
 },

 setFinishStatus(param){
  return axios(this.dataPost('/data/room/'+param.room_id+'/finish', {finish: param.status}));
 },

 getRooms() {
  return axios(this.dataGet('/data/rooms'));
 },

 getRecipients() {
  return axios(this.dataGet('/data/getrecipients'));
 },

 createRoom(param, withFile) {
  return axios(this.dataPost('/data/rooms', param));
 },

 loginUser(param) {
  return axios(this.dataPost('/login', param));
 },

 sendMessage(params) {
  return axios(this.dataPost('/data/room/'+params.id+'/messages', params));
 },

}