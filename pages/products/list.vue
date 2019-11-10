<template>
  <div class="container has-text-centered">
    <h2 class="is-size-2 has-text-centered">Flowers Store</h2>
    <el-row style="margin-top: 32px;">
      <el-col :span="4" v-for="(product, index) in products" :key="product.id" :offset="index % 5 !== 0 ? 1 : 0"
              style="margin-bottom: 20px;">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="getProductImagePath(product.image_url)"
               :alt="product.description"
               class="image"
               style="height: 190px; width: 190px;">
          <div style="padding: 14px;">
            <span class="is-ellipsis" :title="product.name">{{ product.name }}</span>
            <div class="bottom clearfix">
              <p class="is-ellipsis" :title="product.description" style="line-height: 20px;">{{ product.description }}</p>
              <el-rate disabled v-model="product.rate"></el-rate>
              <el-button type="text"
                         class="button"
                         @click="$router.push({ name: 'products-slug', params: { slug: product.slug } })">
                Go to detail
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="perPage"
      :total="total"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
  import rf from '../../utils/requests/RequestFactory';
  import Utils from "../../utils/Utils";

  export default {
    name: "list",
    async asyncData({app, redirect, params}) {
      try {
        const { data } = await rf.getBehaviors('ProductBehavior', app.$axios).getProducts({ page: 1, limit: 10 });
        // const {data} = await app.$axios.$get(`api/auth/products?limit=10&page=1`);
        return {
          products: data.data,
          currentPage: data.current_page,
          lastPage: data.last_page,
          perPage: data.per_page,
          total: data.total
        }
      } catch (e) {
        log.error(e);
      }
    },
    created() {

    },
    data() {
      return {
        currentDate: new Date(),
        products: [],
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
        total: 1,
      };
    },
    methods: {
      getProductImagePath (name) {
        console.log('@getProductImagePath');
        return Utils.getProductImagePath(name);
      },
      async changePage(page) {
        console.log(`@changePage`);
        const { data } = await this.getProducts({page, limit: this.perPage});
        this.products = data.data;
        this.currentPage = data.current_page;
        this.lastPage = data.last_page;
        this.perPage = data.per_page;
        this.total = data.total;
      },
      ...rf.getBehaviors('ProductBehavior'),
    },
  }
</script>

<style scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
