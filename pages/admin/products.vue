<template>
  <div style="min-height: 100vh; margin-top: 15px;">
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
      <th>Rate</th>
      <th>Rate Amount</th>
      <th>Price</th>
      <th>Price Base</th>
      <th>Amount In Stock</th>
      <th>Created At</th>
      <th>Updated At</th>
      <th>Control</th>
      <template slot="body" slot-scope="props">
        <tr>
          <td>{{ _.get(props.item, 'name') }}</td>
          <td>{{ _.get(props.item, 'rate') }}</td>
          <td>{{ _.get(props.item, 'rate_amount') }}</td>
          <td>{{ _.get(props.item, 'price') }}</td>
          <td>{{ _.get(props.item, 'price_base') }}</td>
          <td>{{ _.get(props.item, 'amount_in_stock') }}</td>
          <td>{{ _.get(props.item, 'updated_at') }}</td>
          <td>{{ _.get(props.item, 'created_at') }}</td>
          <td>
            <nuxt-link class="button is-primary" :to="{name: 'products-slug', params: { slug: props.item.id }}">Show</nuxt-link>
            <div class="button is-warning" @click="handleEdit(props.item.id)">Edit</div>
            <div class="button is-danger" @click="handleDel(props.item.id)">Delete</div>
          </td>
        </tr>
      </template>
    </data-table>
  </div>
</template>

<script>
  import rf from '../../utils/requests/RequestFactory';

  export default {
    name: "products",
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
        return this.getProducts(params);
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