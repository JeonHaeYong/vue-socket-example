<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <span class="md-title">My Chat App</span>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <md-list class="md-triple-line">
          <template
            v-for="(item, index) in list"
          >
            <md-list-item :key="'item_'+index">
              <div class="md-list-item-text">
                <span>{{ item.name }}</span>
                <span>{{ item.category }}</span>
                <p>{{ item.menu }}</p>
              </div>

              <md-button class="md-icon-button md-list-action" @click="onClickItem(item)">
                <md-icon
                  class="md-primary"
                  :name="item.checked ? 'star' : 'star_border'"
                  size="32"
                />
              </md-button>
            </md-list-item>

            <md-divider :key="'divider_'+index" />
          </template>
        </md-list>

        <!-- <md-field>
          <label>ID</label>
          <md-input v-model="id"></md-input>
        </md-field> -->

        <!-- <form @submit.prevent.stop="sendMessage()">
          <md-field>
            <label>Your Message</label>
            <md-input v-model="message"></md-input>
            <md-button class="md-primary md-raised" @click.prevent.stop="sendMessage()">Submit</md-button>
          </md-field>
        </form> -->
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'Lunch',
  data() {
    return {
      // Data
      textarea: '',
      id: 'super',
      message: '',
      list: []
    }
  },
  created() {
    // 서버의 변경사항 수신
    this.$socket.on('sendMessage', (data)=>{
      console.log(data);
      this.list = data.list;
    });

    this.$socket.on('join', (data)=>{
      console.log(data);
      this.list = data.list;
    });
  },
  mounted() {
    this.socketJoin();
  },
  methods: {
    socketJoin() {
      this.$socket.emit('join', {
        user_id: this.id
      });
    },
    // 채팅 메세지 서버로 전송
    sendMessage() {
      this.$socket.emit('sendMessage', {
        user_id: this.id,
        message: this.message
      });
      // this.notiMessage();
      const date = new Date();
      this.textarea += this.id + ': ' + this.message + ' (' + date.getHours() + ':' + date.getMinutes() + ')' + '\n';
      this.message = '';
    },
    onClickItem(item) {
      item.checked = !item.checked;
      console.log(item);
      this.$socket.emit('sendMessage', {
        user_id: this.id,
        list: this.list
      });
    }
  }
}
</script>

<style scoped>
.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
}
</style>