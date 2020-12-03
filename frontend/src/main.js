import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import VueMaterialIcon from 'vue-material-icon'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css'
import Directives from '../plugin/directives'
import WebPush from 'web-push'
import router from './router/index';

// 채팅 서버와 연결
import io from 'socket.io-client';
const socket = io('http://172.10.200.110:3001');

Vue.prototype.$socket = socket;

Vue.use(VueMaterial);
Vue.use(Directives);
Vue.use(WebPush);

Vue.config.productionTip = false;

Vue.component('md-icon', VueMaterialIcon);

// const applicationServerPublicKey = 'BHg3PMgDvoICOnn4lKlEQJ9rPtkuB7PXwPyIiVdxsKDX4FH02KULuWjc--Q2lIjkO-p3cS1CbaJ9VXPXPTgoGPc';

let swRegistration = null;
let isSubscribed = false;
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./serviceWorker/sw.js')
  .then(function(registration) {
    // Registration was successful
    swRegistration = registration;
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    initialiseUI();
  })
  .catch(error => {
    // Registration failed :(
    console.log('ServiceWorker registration failed: ', error);
  });

} else {
  console.warn('Push messaging is not supported');
}
// function urlB64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, '+')
//     .replace(/_/g, '/');

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }
function initialiseUI() {
  swRegistration.pushManager.getSubscription()
  .then(subscription => {
    isSubscribed = subscription !== null;

    if(isSubscribed) {
      console.log('User IS subscried.');
    } else {
      console.log('User is NOT subscribed.');
    }
  });
}

// function subScribeUser() {
//   const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//   swRegistration.pushManaber.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: applicationServerKey
//   })
//   .then(subscription => {
//     console.log('User is subscribed: ', subscription);
//     isSubscribed = true;

//   })
//   .catch(error => {
//     console.log('Failed to subscribe the user: ', error);
//   });
// }


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
