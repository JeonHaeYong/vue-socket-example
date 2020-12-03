<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <span class="md-title">My Chat App</span>
        </div>
      </md-app-toolbar>
      <md-app-content>
        <md-field>
          <label>Message</label>
          <md-textarea v-model="textarea" disabled v-auto-scroll-bottom></md-textarea>
        </md-field>
        <md-field>
          <label>ID</label>
          <md-input v-model="id"></md-input>
        </md-field>
        <form @submit.prevent.stop="sendMessage()">
          <md-field>
            <label>Your Message</label>
            <md-input v-model="message"></md-input>
            <md-button class="md-primary md-raised" @click.prevent.stop="sendMessage()">Submit</md-button>
          </md-field>
        </form>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      textarea: '',
      id: '',
      message: ''
    }
  },
  created() {
    // 서버의 변경사항 수신
    // this.$socket.on('chat', (data)=>{
    //   const date = new Date();
    //   this.textarea += data.id + ': ' + data.message + ' (' + date.getHours() + ':' + date.getMinutes() + ')' + '\n';
    //   this.notiMessage(data);
    // });
  },
  methods: {
    // 채팅 메세지 서버로 전송
    sendMessage() {
      this.$socket.emit('chat', {
        id: this.id,
        message: this.message
      });
      // this.notiMessage();
      const date = new Date();
      this.textarea += this.id + ': ' + this.message + ' (' + date.getHours() + ':' + date.getMinutes() + ')' + '\n';
      this.message = '';
    },
    notiMessage(data) {
      const vm = this;
      Notification.requestPermission().then(result => {
        if(result === 'granted') {
          vm.noti(data);
        }
      });
    },
    noti(data) {
      new Notification('Chat', {
        body: data.id+'님의 메세지입니다.\n'+data.message,
        icon: '../assets/logo.png'
      });
    }
  }
}
</script>

<style scoped>
.md-app {
  height: 500px;
  border: 1px solid rgba(#000, .12);
}

.md-textarea {
  height: 300px;
}
</style>