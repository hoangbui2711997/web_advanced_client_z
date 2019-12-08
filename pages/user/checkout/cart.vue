<template>
  <div class="container is-fluid" style="height: 100vh">
    <br>
    <h1 class="is-size-3 has-text-centered">Cart</h1>
    <div class="columns">
      <div class="column is-8">
        <div class="columns">
          <div class="custom-color is-capitalized column is-2"
               style="font-size: 16px;">
          </div>
          <div class="custom-color column has-text-weight-bold"
               style="font-size: 16px;">
            <div class="columns has-text-right">
              <div class="custom-color column is-5"
                   style="font-size: 16px; padding-right: 24px">
                Name
              </div>
              <div class="custom-color column is-3"
                   style="font-size: 16px;">
                Amount (name unit)
              </div>
              <div class="custom-color column is-4"
                   style="font-size: 16px; padding-right: 20px;">
                Price
              </div>
            </div>
          </div>
        </div>
        <div class="columns" v-for="(product, index) in infoProducts" :key="index"
             style="text-align: right; border-right: thin solid #cccccc;">
          <!--          <img src="http://via.placeholder.com/628x620" alt="Product name">-->
          <div class="column is-3">
            <img :src="getImageUrl(product)"
                 style="max-height: 64px; max-width: 64px; height: 64px; width: 64px; min-height: 64px; min-width: 64px; z-index: 1; position: relative;"
                 ref="image"
                 alt="Product name">
          </div>
          <section class="column is-9" ref="showPlace" style="position: relative; padding: 0 1rem;">
            <div class="wrap-extra">
              <div class="is-clearfix">
                <div class="columns">
                  <div class="custom-color is-capitalized column is-ellipsis is-4"
                       style="font-size: 16px;"
                       :title="`${getProductName(product)}`"
                  >
                    {{ getProductName(product) }}
                  </div>
                  <span class="custom-color is-capitalized column is-4"
                        style="font-size: 16px; padding-right: 34px;">
                    1
                   </span>
                  <span class="custom-color is-capitalized column is-4"
                        style="font-size: 16px;">
                    {{ _.get(getProduct(product).information, 'price', 0) }} $
                   </span>
                </div>
              </div>
            </div>
            <div class="wrap-extra" v-for="(detail, index) in getDetails(product)" :key="index">
              <div class="is-clearfix">
                <div class="columns">
                  <div class="custom-color is-capitalized column is-4 is-ellipsis"
                       style="font-size: 16px;">
                    <template v-if="!!detail.extraName">{{ detail.extraName }} (extra)</template>
                    <template v-else>{{ detail.detail_morph_type }}</template>
                  </div>
                  <span class="custom-color is-capitalized column is-4"
                        style="font-size: 16px; padding-right: 34px;">
                     {{ _.get(detail.information, detail.decoration_field) }}
                   </span>
                  <span class="custom-color is-capitalized column is-4"
                        style="font-size: 16px;">
                    {{ _.get(detail.information, 'price') }} $
                   </span>
                </div>
              </div>
            </div>
            <div class="price-buy-block">
              <span class="tag is-medium is-primary" style="margin-top: 10px">
                Total: {{ getTotalPrice(product) }} $
              </span>
              <el-button type="danger" size="small" icon="el-icon-delete" plain
                         @click="removeCart(product, index)"></el-button>
            </div>
            <hr>
          </section>
        </div>
      </div>
      <div class="column is-4">
        <div class="columns">
          <div class="column label">Payment</div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="price-buy-block">
              <span class="tag is-medium is-primary">
                Total: {{ getTotalPrices() }} $
              </span>
            </div>
          </div>
          <div class="column">
            <input type="button" class="button is-success" @click="$router.push({ name: 'user-checkout-bill-info' })"
                   value="Continue to checkout"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import rf from '../../../utils/requests/RequestFactory';

  export default {
    name: "cart",
    middleware: ['authenticated'],
    async asyncData({$axios}) {
      const {data: cart} = await rf.getBehaviors('CartBehavior', $axios).getCartInfo();
      return {
        infoProducts: cart.products,
      };
    },
    data() {
      return {
        infoProducts: [],
      }
    },
    methods: {
      async removeCart(product, index) {
        const {data} = await this.removeProductInCart({product_id: product.id});
        if (!data) {
          return this.$message({
            message: 'Network error',
            type: 'error'
          });
        } else {
          this.infoProducts.splice(index, 1);
        }
      },
      getTotalPrices() {
        const BigNumber = this.BigNumber;

        let total = new BigNumber(0);
        this._.forEach(this.infoProducts, product => {
          this._.forEach(product.details, detail => {
            total = total.plus(new BigNumber(detail.information.price));
          });
        });

        return total.toString();
      },
      getDetails(product) {
        return this._.filter(product.details, detail => !this._.includes(['products', 'product_variations'], detail.detail_morph_type));
      },
      getTotalPrice({details}) {
        console.log(details, "details");
        if (!details || this._.isEmpty(details)) {
          return 0;
        }
        const BigNumber = this.BigNumber;
        let total = new BigNumber(0);
        this._.forEach(details, item => {
          console.log(item.information, "item.information");
          total = total.plus(new BigNumber(item.information.price));
        });
        return total.toString();
      },
      getProduct(product) {
        return this._.find(
          product.details, detail => this._.includes(['products', 'product_variations'],
            detail.detail_morph_type)
        );
      },
      getProductName(product) {
        const detailProduct = this._.find(
          product.details, detail => this._.includes(['products', 'product_variations'],
            detail.detail_morph_type)
        );
        return !!detailProduct.productName ? `${detailProduct.productName} (Product Variation)` : `${detailProduct.information.name} (Product)`;
      },
      getImageUrl(product) {
        const productDetail = this._.find(
          product.details, detail => this._.includes(['products', 'product_variations'],
            detail.detail_morph_type)
        );
        console.log(productDetail, "productDetail");
        return this._.get(productDetail.information, 'image_url', '#');
      },
      ...rf.getBehaviors('CartBehavior'),
    }
  }
</script>

<style scoped>
</style>
