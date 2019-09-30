<template>
  <div>
    <modal :show="show" @close="$emit('close')" :title="title">
      <template #body>
        Do you really want to delete this user?
      </template>
      <template #footer>
        <button class="button is-success" @click="handleMethod">Confirm</button>
        <button class="button" @click="$emit('close')">Cancel</button>
      </template>
    </modal>
  </div>
</template>

<script>
  import Modal from "../common/Modal";
  export default {
    name: "ConfirmModal",
    components: { Modal },
    props: {
      show: {
        default: false,
        type: Boolean
      },
      title: {
        default: '',
        type: String,
      },
      params: {
        default: '',
      },
      handle: {
        type: Function,
        default: () => {}
      }
    },
    methods: {
      async handleMethod () {
        try {
          const { data: { message } } = await this.handle();
          this.$message({
            type: 'success',
            message
          });
          this.onSuccess();
        } catch (e) {
          console.error(e);
        }
      },
      onSuccess () {
        this.show = false;
        this.$emit('success');
      },
    }
  }
</script>

<style scoped>

</style>