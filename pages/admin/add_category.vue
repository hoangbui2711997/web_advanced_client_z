<template>
  <div class="wrap-login-form">
      <div class="columns">
        <div class="column has-text-centered">
          <h1 style="font-size: 20px; font-weight: bold;">Add Category Page</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column is-three-fifths is-offset-one-fifth">
          <div class="box">
            <div class="field">
              <label class="label" for="parent_category">Parent Category</label>
              <div class="select">
                <select v-model="params.parent_category" id="parent_category">
                  <option :value="{ level: 0 }" selected="selected">Root</option>
                  <option v-for="category in categories" :key="category.id" :value="category">{{ category.title }}
                  </option>
                </select>
              </div>
            </div>
            <div class="field">
              <label class="label" for="level">Level</label>
              <div class="control">
                <input id="level" class="input" type="text" placeholder="..." v-model="params.parent_category.level" disabled>
              </div>
            </div>
            <div class="field">
              <label class="label" for="name">Order</label>
              <div class="control">
                <input id="name" class="input" type="number" placeholder="..." v-model="params.order">
              </div>
            </div>
            <div class="field">
              <label class="label" for="title">Title</label>
              <div class="control">
                <input id="title" class="input" type="email" :class="{
								'is-danger': !_.isEmpty(warning)
							}" placeholder="e.g. yourname@gmail.com" v-model="params.title">
              </div>
            </div>
            <div class="field">
              <label class="label">Icon</label>
              <el-upload
                action="#"
                list-type="picture-card"
                :limit="1"
                :on-change="handleChange"
                :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)">
                      <i class="el-icon-download"></i>
                    </span>
                    <span v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" :fullscreen="true">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <div class="field">
                <label class="label">Link</label>
                <el-autocomplete
                  class="inline-input"
                  v-model="params.link"
                  :fetch-suggestions="querySearch"
                  placeholder="Please Input"
                  @select="handleSelect"
                  :class="{
                    'is-danger': !_.isEmpty(warning)
							    }"
                ></el-autocomplete>
              </div>
            </div>
<!--            <div v-if="!_.isEmpty(warning)" class="notification is-danger">-->
<!--              <div v-for="(value, key) in warning" :key="key">-->
<!--                {{ value }}-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-if="!_.isEmpty(notification)" class="notification is-success">-->
<!--              {{ notification }}-->
<!--            </div>-->
            <div class="field is-clearfix">
              <input type="submit" class="button is-link is-pulled-right" value="Register" @click.prevent="submit">
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "add_category",
    middleware: 'authenticated',
    data() {
      return {
        params: {
          parent_category: {
            level: 0,
          },
          files: [],
        },
        warning: [],
        // notification: '',
        categories: [],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      };
    },
    mounted() {
      this.getCategories();
    },
    computed:  {
      links () {
        const links = [];
        this.$router.options.routes.forEach(route => {
          links.push({
            value: route.name,
            path: route.path
          })
        });
        return links;
      },
    },
    methods: {
      handleChange (file, fileList) {
        this.params.files = [];
        _.forEach(fileList, file => {
          this.params.files.push(file);
        });
      },
      handleSuccess (response, file, fileList) {
        console.log(response, "response");
        console.log(file, "file");
        console.log(fileList, "fileList");
      },
      querySearch(queryString, cb) {
        let results = queryString ? _.filter(this.links, (link) => _.includes(link.value, queryString)) : this.links;
        // call callback function to return suggestions
        cb(results);
      },
      handleSelect(item) {
        console.log(item);
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        this.$message({
          type: 'warning',
          message: 'Dowload',
        })
      },
      async submit() {
        try {
          const formData = new FormData();
          if (this.params.files.length > 0) {
            formData.append('file', this.params.files[0].raw, this.params.files[0].name);
          }
          if (_.get(this.params.parent_category, 'id', null) !== null) {
            formData.append('parent_id', _.get(this.params.parent_category, 'id', null));
          }
          formData.append('level', this.params.parent_category.level + 1);
          _.forEach(this.params, (value, key) => {
            if (key === 'files' || key === 'parent_category') return;
            formData.append(key, value);
          });

          const { data } = await this.post('/auth/admin/category', formData, { 'Content-Type': 'multipart/form-data' });
          if (data) {
            await this.getCategories();
            this.$message({
              type: 'success',
              message: 'Add succeeded'
            })
          }
          // const { message } = await this.$axios({
          //   url: '/api/auth/admin/category',
          //   method: 'post',
          //   data: formData,
          //   config: { headers: {'Content-Type': 'multipart/form-data'}}
          //   }
          // );
          // this.notification = `${data}`;
        } catch (e) {
          console.error(e);
          this.warning = [];
          _.forEach(e.response.data.errors, (value, key) => {
            this.warning.push(_.first(value));
          })
        }
      },
      async getCategories() {
        const { data } = await this.get('/auth/admin/categories');
        this.categories = data;
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrap-login-form {
    padding: 20px;
    min-height: 100vh;
  }
</style>