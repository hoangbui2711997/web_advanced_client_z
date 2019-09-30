<template>
	<div>
    <div class="is-clearfix">
      <div class="button is-primary is-pulled-right pl-20 mb-20" @click="handleAdd">Add</div>
    </div>
    <data-table
      :get-data="getData"
      :msg-empty-data="'empty'"
      :limit="5"
      :showEmptyRow="true"
      ref="datatable"
    >
      <th>Name</th>
      <th>Email</th>
      <th>Created at</th>
      <th>Updated at</th>
      <th>Control</th>
      <template slot="body" slot-scope="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.created_at }}</td>
          <td>{{ props.item.updated_at }}</td>
          <td>
            <div class="button is-warning" @click="handleEdit(props.item)">Edit</div>
            <div class="button is-danger" @click="handleDel(props.item.id)">Delete</div>
          </td>
        </tr>
      </template>
    </data-table>
    <edit-user-modal :show="modal.edit.isShow" @close="modal.edit.isShow = false" :user="modal.edit.user" @success="fetchData"></edit-user-modal>
    <add-user-modal :show="modal.add.isShow" @close="modal.add.isShow = false" @success="fetchData"></add-user-modal>
    <confirm-modal
      :show="modal.del.isShow"
      :id="modal.del.id"
      @close="modal.del.isShow = false"
      :title="'Delete User'"
      :handle="removeUser"
      @success="refetchData"
    ></confirm-modal>
	</div>
</template>

<script>
  import rf from '../../utils/requests/RequestFactory';
  import EditUserModal from "../../components/modals/EditUserModal";
  import AddUserModal from "../../components/modals/AddUserModal";
  import ConfirmModal from "../../components/modals/ConfirmModal";

	export default {
	  // middleware: 'authenticated',
	  // middleware: 'auth',
		name: "Users",
    components: {ConfirmModal, AddUserModal, EditUserModal },
    mounted () {
		  this.fetched = true;
    },
		data () {
			return {
				users: [],
        data: [],
        fetched: false,
        modal: {
				  edit: {
            isShow: false,
            user: {}
          },
          add: {
				    isShow: false,
          },
          del: {
            isShow: false,
            id: '',
          }
        },
			}
		},
		methods: {
		  closeAllPopup () {
        this.modal.add.isShow = false;
        this.modal.del.isShow = false;
        this.modal.edit.isShow = false;
      },
      refetchData () {
		    this.closeAllPopup();
        this.$refs.datatable.fetchData(1);
      },
      fetchData () {
        this.closeAllPopup();
        this.$refs.datatable.fetch();
      },
      handleAdd () {
        this.modal.add.isShow = true;
      },
      handleEdit (user) {
        this.modal.edit.user = user;
        this.modal.edit.isShow = true;
      },
      handleDel (id) {
        this.modal.del.isShow = true;
        this.modal.del.id = id;
      },
			getData (params) {
        return this.getUsers(params);
				// return this.$axios.$get('/api/test-users', { params });
			},
      removeUser () {
        const id = this.modal.del.id;
        return this.delUser({ user_id: id });
      },
      ...rf.getBehaviors('AdminBehavior'),
		},
	}
</script>

<style scoped>

</style>