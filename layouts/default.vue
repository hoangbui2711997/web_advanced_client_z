<template>
  <div>
    <navigation/>
    <div style="margin-left: 1.5rem; margin-top: 1rem;">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion management</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <nuxt/>
    <div class="chat">
      <el-button
        v-if="isAuthenticated"
        @click="drawer = true"
        circle
        size="medium"
        type="primary"
        style="margin-left: 16px; position: fixed; top: 85vh; right: 30px;">
        <i class="el-icon-chat-line-round" style="font-size: 2rem;"></i>
      </el-button>
      <el-drawer
        title="Chat with us"
        :visible.sync="drawer"
        direction="rtl"
        :before-close="handleClose">
        <div class="box-popup">
          <client-only>
            <infinite-loading
              direction="top"
              force-use-infinite-wrapper=".box-popup"
              @infinite="loadMoreMessage"></infinite-loading>
          </client-only>
          <div v-for="(message, index) in conversation"
               class="columns is-multiple"
               :class="{ 'has-text-primary is-bold': message.type === 'user' }"
               :key="index">
            <div class="column">
              {{ message.created_at }} - {{ message.message }}
            </div>
          </div>
        </div>
        <input type="text" class="input" placeholder="Quest here..." style="padding: 0 1rem; margin: 1rem; width: 90%;"
               @keyup.enter="sendMessageHandle"
               v-model="message"
        >
      </el-drawer>
    </div>
    <div class="footer">
      <div class="link is-info">
        Made by Hoang Bui
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  /*html::-webkit-scrollbar {*/
  /*  display: none;*/
  /*}*/
  /**::-webkit-scrollbar {*/
  /*  display: none;*/
  /*}*/
  .wrap-form {
    padding: 20px;
    min-height: 100vh;
  }
</style>

<script>
  import Navigation from './partiars/Navigation';
  import { mapGetters } from 'vuex';
  import _ from 'lodash';
  import rf from "../utils/requests/RequestFactory";

  export default {
    components: {Navigation},
    data() {
      return {
        conversation: [],
        drawer: false,
        page: 1,
        message: '',
      }
    },
    computed: {
      ...mapGetters(['getUser', 'getConversationId']),
      ...mapGetters('auth', ['getToken']),
    },
    watch: {
      async drawer(value) {
        if (value === true && this._.isEmpty(this.conversation)) {
          const {data} = await this.getMessages({limit: 20, page: this.page++});
          this.conversation.push(...data.data);
        }
      },
      isAuthenticated (value) {
        if (value) {
          window.Echo.connector.options.auth.headers['Authorization'] = this.getToken;
          this.listenChatConversation(this.getConversationId);
        } else {
          window.Echo.leave(`${this.innerPrefix()}${id}`);
        }
      },
    },
    methods: {
      async sendMessageHandle () {
        try {
          if (this.isSending) {
            return;
          }
          this.isSending = true;
          await this.sendMessage({ message: this.message, id: this.getConversationId });
          this.message = '';
          this.isSending = false;
        } catch (e) {
          console.error(e);
        }
      },
      loadMoreMessage: _.debounce(async function ($state) {
        try {
          const {data: data} = await this.getMessages({
            page: this.page++, limit: 20
          });
          this.conversation.push(...data.data);
          if (!data || data.last_page <= data.current_page) {
            $state.complete();
          } else {
            $state.loaded();
          }
        } catch (e) {
          $state.complete();
        }
      }, 400),
      handleClose(done) {
        done();
        // this.$confirm('Are you sure you want to close this?')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      },
      innerPrefix() {
        return 'App.Chat.Conservation.'
      },
      listenChatConversation(id) {
        window.Echo.private(`${this.innerPrefix()}${id}`)
          .listen('MessageSent', (data) => {
            console.log(data, "data");
            let params = {};
            params.type = !!data.employee_id ? 'employee' : 'user';
            params.created_at = data.created_at;
            params.message = data.message;

            this.conversation.unshift(params);
          });
      },
      getMessages: rf.getBehaviors('ChatBehavior').getMessages,
      sendMessage: rf.getBehaviors('ChatBehavior').sendMessage,
    }
  }
</script>

<style>
  .drift-bounding-box.drift-open {
    width: 158px !important;
    height: 142px !important;
  }

  .drift-zoom-pane.drift-open {

  }

  #el-drawer__title > span {
    font-size: 2rem !important;
  }
</style>

<style lang="scss" scoped>
  .box-popup {
    overflow-y: auto;
    padding: 1rem;
    height: 72vh;
    display: flex;
    flex-direction: column-reverse;
  }
</style>
