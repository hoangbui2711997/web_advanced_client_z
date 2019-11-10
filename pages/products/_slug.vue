<template>
  <div class="section" style="font-weight: 450; max-width: 1366px; padding: 1rem">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-half" style="text-align: right; border-right: thin solid #cccccc;">
          <!--          <img src="http://via.placeholder.com/628x620" alt="Product name">-->
          <img :src="imageUrl"
               :data-zoom="imageUrl"
               style="max-height: 470px; max-width: 566px; height: 470px; width: 566px; min-height: 470px; min-width: 566px; z-index: 1; position: relative;"
               @load="isLoading = false"
               ref="image"
               alt="Product name">
          <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#FF6700"/>
          <div v-if="!!variations[index] && !!variations[index].images">
            <ul style="text-align: left; position: absolute; top: 38px; left: -26px; max-height: 560px; overflow-y: auto;">
              <li>
                <img :src="variations[index].image_url" :alt="variations[index].description"
                     :class="{ 'border-red': $refs.image && ($refs.image.src === variations[index].image_url) }"
                     style="height: 64px; width: 64px; cursor: pointer;" @click="changeImage($refs.image.src=variations[index].image_url, isLoading = true)">
              </li>
              <li v-for="image in variations[index].images" :key="image.id">
                <img :src="image.image_url" :alt="image.description"
                     :class="{ 'border-red': $refs.image && ($refs.image.src === image.image_url) }"
                     style="height: 64px; width: 64px; cursor: pointer;" @click="changeImage($refs.image.src=image.image_url, isLoading = true)">
              </li>
            </ul>
          </div>

          <!--          <img src="http://assets.imgix.net/dog.png?w=400" v-zoom alt="Product name" data-zoom="http://assets.imgix.net/dog.png?w=1200">-->
          <el-carousel ref="carousel" type="card" height="125px" :autoplay="false" style="width: 70%; margin: auto;"
                       @change="changeSlide">
            <el-carousel-item v-for="variation in variations" :key="variation.id">
              <h4 class="medium" :style="`background-image: url('${variation.image_url}')`"
                  style="height: 100%; background-size: cover;">
                <!--                {{ variation.description }}-->
              </h4>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="column is-half show-image-preview">
          <section class="section" ref="showPlace" style="position: relative; padding: 0 1rem;">
            <div class="columns">
              <div class="column is-7">
                <h1 class="title">
                  {{ product.name }}
                </h1>
              </div>
              <div class="column f-end text-end is-1" style="text-align: end;">
                <span class="demonstration">Rate</span>
              </div>
              <div class="column f-end text-end" style="height: 46px; text-align: end; white-space: nowrap;">
                <el-rate v-if="!!product.variations[index]" v-model="product.variations[index].rate" disabled show-score
                         score-template="{value} points"></el-rate>
                <el-rate v-else v-model="product.rate" disabled show-score
                         score-template="{value} points"></el-rate>
              </div>
            </div>
            <h3>
              <span class="is-uppercase custom-color"
                    style="border-right: solid thin #cccccc; padding-right: 20px;">Select size</span>
              <span style="padding-left: 20px;" class="">You Will Earn <span class="is-primary">80</span> Rewards Points With This Purchase</span>
            </h3>
            <div style="margin-top: 20px">
              <el-radio-group v-model="params.type" size="small">
                <el-radio
                  v-for="type in Object.keys(variationsType)"
                  :label="type"
                  border
                  style="text-transform: capitalize;  margin-left: 0; width: 120px;"
                  :key="type"
                >
                  {{ type }}
                </el-radio>
              </el-radio-group>
            </div>

            <div v-if="!!params.type" style="margin-top: 20px">
              <h3>
              <span class="is-uppercase custom-color"
                    style="border-right: solid thin #cccccc;
                    padding-right: 20px;">
                Select color
              </span>
              </h3>
              <div style="margin-top: 10px">
                <el-radio-group v-model="params.color" size="small">
                  <el-radio
                    v-for="color in Object.keys(variationsColor)"
                    :label="color"
                    border
                    style="text-transform: capitalize; margin-left: 0;
                    width: 120px; margin-top: 10px; overflow: hidden;
                    text-overflow: ellipsis;"
                    :key="color"
                    :title="color"
                  >
                    {{ color }}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>

            <p>
              <span class="is-primary">Size information</span>
            </p>
            <div class="wrap-extra">
              <span class="is-uppercase custom-color">Add something extra</span>
              <div v-for="productExtra in productExtras" class="is-clearfix" :key="productExtra.id">
                <span class="custom-color is-capitalized"
                      style="font-size: 16px;">{{ _.get(productExtra, 'name') }}</span>
                <el-select v-model="params.extra[_.get(productExtra, 'id', 'empty')]" placeholder="Select">
                  <el-option
                    v-if="!!params.extra[_.get(productExtra, 'id', 'empty')]"
                    :key="'default'"
                    label="Cancel"
                    :value="0">
                  </el-option>
                  <el-option
                    v-for="variation in productExtra.variations || []"
                    :key="variation.id"
                    :label="`${variation.amount} ${productExtra.unit.unit} - ${variation.price}$`"
                    :value="{ id: variation.id, price: variation.price }">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="deliver-info is-clearfix">
              <div class="block">
                <el-input placeholder="Zipcode input" style="width: 180px;" class="is-pulled-left"
                          v-model.lazy="params.zip_code" clearable></el-input>
                <el-date-picker
                  v-model="params.deliver_date"
                  type="date"
                  class="is-pulled-right"
                  placeholder="Pick a day to deliver"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </div>
            <div style="margin-top: 10px; font-size: 14px;">
              <template v-if="!!zipcode">
                Zip code info: {{ zipcode.name }} - {{ zipcode.country_code }} - {{ zipcode.timezone }}
              </template>
              <template v-else>
                <span class="is-warning">Zip code doesn't exist</span>
              </template>
            </div>
            <hr>
            <div class="price-buy-block">
	            <span class="tag is-rounded is-medium is-primary">
                {{ totalPrice }} $
							</span>
              <el-popover
                placement="top-start"
                title="Title"
                width="250"
                class="is-pulled-right"
                trigger="hover"
                content="Earn 1 point per dollar spent.
                         Redeem in $5 increments.
                         Points are valid for 1 year.">
                <el-button slot="reference">?</el-button>
              </el-popover>
              <el-button type="primary" class="is-pulled-right" @click="add">Add to card</el-button>
            </div>
          </section>
        </div>
      </div>
      <div class="columns">
        <div class="column" style="min-height: 230px;">
          <section>
            <el-tabs v-model="activeName">
              <el-tab-pane label="DESCRIPTION" name="first">
                {{ description }}
              </el-tab-pane>
              <el-tab-pane label="VASE" name="vase">
                <div class="columns">
                  <div class="column is-2">
                    <figure class="image is-128x128">
                      <img v-if="!!variations[index]" :src="variations[index].vase.image_url">
                    </figure>
                  </div>
                  <div class="column">
                    <h3 style="text-transform: uppercase;">VASE
                      <template v-if="!!variations[index] && !!variations[index].vase">
                        {{ variations[index].vase.name }}
                      </template>
                    </h3>
                    <span>
                       <template v-if="!!variations[index] && !!variations[index].vase">
                        {{ variations[index].vase.description }}
                      </template>
                    </span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane v-if="!!variations[index] && !!variations[index].vase && !_.isEmpty(variations[index].vase)" label="SIZES" name="sizes">
                <div v-for="variation in _.orderBy(variations[index].vase.variations, 'size', 'desc')"
                     :key="variation.id"
                     style="display: inline-block; margin-left: 10px; text-align: center; text-transform: capitalize;">
                  <img class="image is-128x128" :src="variation.image_url"/>
                  <el-radio v-model="params.vase" :label="`${variation.price}_${variation.id}_${variation.size}`">{{ variation.size }} - {{ variation.price }} $</el-radio>
                </div>
              </el-tab-pane>
            </el-tabs>
          </section>
        </div>
      </div>

      <div class="columns">
        <div class="column is-12">
          Viewed flowers
        </div>
        <div class="column">

        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          Question and answer flowers
        </div>
        <div class="column">

        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          Review
        </div>
        <div class="column">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import ProductVariation from "../../components/products/ProductVariation";
  import rf from '../../utils/requests/RequestFactory';
  import _ from 'lodash';

  export default {
    // components: {ProductVariation},
    async asyncData({params, app}) {
      let response = await app.$axios.$get(`api/products/${params.slug}`);
      return {
        product: response.data,
        activeName: 'first',
      }
    },
    data() {
      return {
        isLoading: false,
        cart: {},
        index: 0,
        zipcode: undefined,
        product: null,
        v: '',
        params: { extra: {} },
        activeName: 'first',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: 'Tomorrow',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A week',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A half month',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 15);
              picker.$emit('pick', date);
            }
          }, {
            text: 'A month',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    watch: {
      'isLoading' () {
      },
      'params.color'() {
        return this.index = this.variations.findIndex((v) => v.color === this.params.color) || 0;
      },
      index() {
        this.initParams();
      },
      'params.zip_code': _.debounce(async function () {
        if (!!this.params.zip_code) {
          const {data: zipcode} = await this.getZipcode(this.params.zip_code);
          this.zipcode = zipcode;
        } else {
          this.zipcode = void (0);
        }
      }, 1000)
    },
    computed: {
      totalPrice () {
        const BigNumber = this.BigNumber;

        let total = new BigNumber(0);
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.cart = {};
        if (this._.isArray(this.variations) && !this._.isEmpty(this.variations)) {
          const variation = this.variations[this.index];
          total = total.plus(new BigNumber(this._.get(variation, 'price', 0)));
          // key: table, value: id
          this._.set(this.cart, 'product_variations', variation.id);
          const vase = this._.get(this.params, 'vase', `${variation.price}_${variation.id}_${variation.size}`);
          console.log(vase, "vase");
          if (!!variation && !!variation.vase && this._.isEmpty(variation.vase.variations)) {
            total = total.plus(new BigNumber(variation.vase.price));
            this._.set(this.cart, 'vases', variation.vase.id);
          } else {
            const vasePrice = this._.first(vase.split('_'));
            const vaseId = vase.split('_')[1];
            total = total.plus(new BigNumber(vasePrice));
            this._.set(this.cart, 'vase_variations', vaseId);
          }
        } else {
          total = total.plus(this._.get(this.product, 'price', 0));
          this._.set(this.cart, 'products', this.product.id);
        }

        const idExtras = [];
        if (!!this.params.extra) {
          this._.forEach(Object.keys(this.params.extra), (k) => {
            total = total.plus(new BigNumber(this._.get(this.params.extra[k], 'price', 0)));
            idExtras.push(this._.get(this.params.extra[k], 'id', 0));
          });

          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.cart['product_extra_variations'] = idExtras;
        }

        return total.toString();
      },
      description() {
        const variation = this.variations[this.index];
        if (!!variation) {
          return this._.get(variation, 'description', '');
        }
        return this.product.description;
      },
      variations() {
        return this.product.variations || [];
      },
      discount() {
        return this.product.discount || {};
      },
      variationsType() {
        return this._.groupBy(this.variations, 'type');
      },
      variationsColor() {
        const variations = this._.filter(this.variations, (t) => t.type === this.params.type);
        return this._.groupBy(variations, 'color');
      },
      productExtras() {
        return this.product.product_extras;
      },
      imageUrl() {
        if (this.variations.length > this.index) {
          return this.variations[this.index].image_url;
        } else {
          return this.product.image_url;
        }
      },
    },
    mounted() {
      this.drift = new Drift(this.$refs.image, {
        paneContainer: this.$refs.showPlace,
        inlinePane: false,
        zoomFactor: 3,
        hoverBoundingBox: true,
        touchBoundingBox: true,
      });
      this.index = 0;
      this.initParams();
    },
    methods: {
      add () {
        this.addToCart(this.cart);
      },
      initParams () {
        this.$nextTick(() => {
          this.setCarouselIndex(this.index);
          const variation = this.variations[this.index];
          if (!!variation) {
            this.$set(this.params, 'color', variation.color);
            this.$set(this.params, 'type', variation.type);
          }

          this.$set(this.params, 'extra', {});
          if (this._.get(this.variations, this.index, null) === null) {
            return;
          }
          const vase = this._.get(this.variations[this.index], 'vase', null);
          if (vase === null) {
            return;
          }
          const vaseVariations = vase.variations;
          if (!this._.isArray(vaseVariations) || this._.isEmpty(vaseVariations)) {
            return;
          }

          const vaseVariation = this._.first(this._.orderBy(vaseVariations, 'size', 'desc'));
          this.$set(this.params, 'vase', `${vaseVariation.price}_${vaseVariation.id}_${vaseVariation.size}`);
        });
      },
      changeImage (a, b) {},
      changeSlide(newIndex) {
        this.index = newIndex;
        const variation = this.variations[this.index];

        this.$set(this.params, 'type', variation.type);
        this.$set(this.params, 'color', variation.color);
      },
      setCarouselIndex(index) {
        this.$refs.carousel.setActiveItem(index);
      },
      ...rf.getBehaviors('UserBehavior'),
      ...rf.getBehaviors('ProductBehavior'),
    }
  }
</script>

<style scoped lang="scss">
  p {
    margin: 0.8rem 0;
  }

  .custom-color {
    color: #9b9b9b !important;
  }

  .wrap-extra {
    margin-top: 1.2rem;
    border-bottom: solid thin #cccccc;
    border-top: solid thin #cccccc;
    width: 75%;

    & > * {
      margin: 0.8rem 0;

      & > span {
        line-height: 40px;
        float: left;
      }

      & > div {
        float: right;
      }
    }
  }

  .deliver-info {
    margin-top: 1.2rem;
    width: 75%
  }

  .price-buy-block {
    margin-top: 1.2rem;
    width: 75%
  }
</style>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 125px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .show-image-preview {
    position: relative;
  }

  .drift-zoom-pane.drift-open {
    margin-top: 12px;
    width: 615px;
    height: 470px;
  }

  #__layout > div > div > div.scroll-content > div.section > div > div:nth-child(1) > div:nth-child(1) > div.el-carousel.el-carousel--horizontal.el-carousel--card {
    margin-left: 120px !important;
  }
  .border-red {
    border: red thin solid;
  }
  .velmld-overlay {
    width: 578px;
    right: 0 !important;
    left: auto !important;
    height: 488px;
  }
</style>