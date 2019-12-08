export default {
  getMessages (params) {
    const url = '/user/chat/messages';
    return this.get(url, params);
  },

  sendMessage (params) {
    const url = '/user/chat/send-message';
    return this.post(url, params);
  },
}
