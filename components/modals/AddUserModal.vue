<template>
  <div>
    <modal :show="show" @close="$emit('close')" :css-footer="{ 'is-justify-center': true }" :title="'Add User Modal'">
      <template #body>
        <div class="wrap-login-form">
          <div class="columns">
            <div class="column has-text-centered">
              <h1 style="font-size: 20px; font-weight: bold;">Add User</h1>
            </div>
          </div>
          <div class="columns">
            <div class="column is-three-fifths is-offset-one-fifth">
              <div class="box">
                <div class="field">
                  <label class="label" for="name">User name</label>
                  <div class="control">
                    <input v-reset-error id="name" class="input" type="text" :class="{
								'is-danger': !_.isEmpty(warning)
							}" placeholder="..." v-model="params.name">
                  </div>
                </div>
                <div class="field">
                  <label class="label" for="add_email">Email</label>
                  <div class="control">
                    <input v-reset-error id="add_email" class="input" type="email" :class="{
								'is-danger': !_.isEmpty(warning)
							}" placeholder="e.g. yourname@gmail.com" v-model="params.email">
                  </div>
                </div>
                <div class="field">
                  <label class="label" for="add_password">Password</label>
                  <div class="control">
                    <input v-reset-error id="add_password" class="input" :class="{
								'is-danger': !_.isEmpty(warning)
							}" type="password" v-model="params.password">
                  </div>
                </div>
                <div class="field">
                  <label class="label" for="add_repeat_password">Repeat Password</label>
                  <div class="control">
                    <input v-reset-error id="add_repeat_password" class="input" :class="{
								'is-danger': !_.isEmpty(warning)
							}" type="password" v-model="params.password_confirmation">
                  </div>
                </div>
                <div v-if="!_.isEmpty(warning)" class="notification is-danger">
                  <div v-for="(value, key) in warning" :key="key">
                    {{ value }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="field is-clearfix">
          <input v-reset-error type="button" class="button is-link is-pulled-right is-medium" value="Register" @click="controlAdd">
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import Modal from "../common/Modal";
  import rf from '../../utils/requests/RequestFactory';

  export default {
    name: "AddUserModal",
    props: {
      show: {
        default: false,
        type: Boolean,
      },
    },
    components: { Modal },
    data() {
      return {
        params: {},
        warning: [],
        notification: '',
      };
    },
    watch: {
      show () {
        this.params = {};
      }
    },
    methods: {
      async controlAdd() {
        try {
          const { data: { data: { message } } } = await this.addUser(this.params);
          this.$message({
            type: 'success',
            message
          });
          this.onSuccess();
          // this.notification = data.data.message;
        } catch (e) {
          this.warning = [];
          const { data } = e.response.data;

          if (data.errors) {
            _.forEach(data.errors, (value, key) => {
              this.warning.push(_.first(value));
            })
          } else {
            this.warning.push('error from server');
          }
        }
      },
      onSuccess () {
        this.show = false;
        this.$emit('success');
      },
      ...rf.getBehaviors('AdminBehavior'),
    },
  }
</script>

<style scoped lang="scss">
</style>