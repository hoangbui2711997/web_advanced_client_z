<template>
  <div class="container-fluid">
    <h2 class="is-size-2 has-text-centered">Flowers Store</h2>
    <div class="container has-text-centered" style="background: url('/grass_flowers_yellow_145934_3840x2400.jpg'); background-size: cover;">
      <div class="columns is-justify-center is-wrapped" style="flex-wrap: wrap; margin: 0">
        <div class="column is-3" v-for="(product, index) in products" :key="`${index}_${product.id}`">.
          <div class="card">
            <div class="card-image">
              <div v-if="checkShowPercent(product.percent) && !!product.in_deal" class="percent-deal">
                {{ product.percent | int }} %
              </div>
              <figure class="image is-4by3">
                <img :src="getProductImagePath(product.image_url)"
                     style="cursor: pointer"
                     alt="Placeholder image"
                     @click="$router.push({ name: 'products-slug', params: { slug: product.slug } })">
              </figure>
            </div>
            <div class="card-content">
              <!--                  <div class="media">-->
              <!--                    <div class="media-left">-->
              <!--                      <figure class="image is-48x48">-->
              <!--                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">-->
              <!--                      </figure>-->
              <!--                    </div>-->
              <!--                    <div class="media-content">-->
              <!--                      <p class="title is-4">John Smith</p>-->
              <!--                      <p class="subtitle is-6">@johnsmith</p>-->
              <!--                    </div>-->
              <!--                  </div>-->

              <div class="content">
                <span :title="product.description" style="font-size: 15px;">{{ product.name }}</span>
                <br>
                <nuxt-link class="custom-tag" :to="{ name: 'products-slug', params: { slug: product.slug } }">#{{ product.slug }}</nuxt-link>
                <br>
                <el-rate disabled v-model="product.rate"></el-rate>
                <nuxt-link class="custom-tag" :to="{ name: 'products-slug', params: { slug: product.slug } }">#({{ product.rate_amount }} reviews)</nuxt-link>
                <br>
                {{ product.price }} $<span class="origin-price" v-show="checkShowPercent(product.percent) && !!product.in_deal">{{ calPrice(product.price, product.percent) }} $</span>
                <br>
                <time v-if="!!product.in_deal" class="readonly is-no-wrap">Duration <span :id="`product_${product.id}`"></span></time>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="perPage"
          :total="total"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import rf from '../../utils/requests/RequestFactory';
  import Utils from "../../utils/Utils";
  import moment from "moment";
  const intervals = [];

  export default {
    name: "list",
    async asyncData({app, redirect, params}) {
      try {
        const { data } = await rf.getBehaviors('ProductBehavior', app.$axios).getProducts({ page: 1, limit: 50 });
        // const {data} = await app.$axios.$get(`api/auth/products?limit=10&page=1`);
        return {
          products: data.data,
          currentPage: data.current_page,
          lastPage: data.last_page,
          perPage: Number.parseInt(data.per_page),
          total: data.total
        }
      } catch (e) {
        console.error(e);
      }
    },
    mounted() {
      console.log(`@mounted`);
      this.init();
    },
    data() {
      return {
        currentDate: new Date(),
        products: [],
        currentPage: 1,
        lastPage: 1,
        perPage: 1,
        total: 1,
        now: moment().format('x'),
        productCounts: {},
      };
    },
    methods: {
      init () {
        this.clearAllInterval();
        this._.forEach(this.products, (product, index) => {
          this.timeCountDown(product, index);
        });
      },
      timeCountDown (product, index) {
        const time = product.special_to;
        this.productCounts[index] = 0;
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let calTime = 0;
        this.$set(product, 'in_deal', false);
        const id = setInterval(() => {
          calTime = time - this.now - (this.productCounts[index]++ * 1000);
          if (!this._.includes(intervals, id)) {
            clearInterval(id);
          } else if (calTime < 0) {
            clearInterval(id);
            this.$set(product, 'in_deal', false);
          } else if (product.in_deal === false) {
            this.$set(product, 'in_deal', true);
          }

          days = Math.floor(calTime % (day * 365) / day);
          hours = Math.floor(calTime % (day) / hour);
          minutes = Math.floor(calTime % (hour) / minute);
          seconds = Math.floor(calTime % (minute) / second);
          this._.set(document.querySelector(`#product_${product.id}`), 'innerHTML', `${days} days ${hours}:${minutes}:${seconds}`);
          // this.$set(product, 'time', `${duration.days()} days ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`);
        }, 1000);
        intervals.push(id);
        // this.setInterval.push(interval);
      },
      calPrice (price, percent) {
        const BigNumber = this.BigNumber;
        return new BigNumber(price).times(new BigNumber(100 - percent)).div(100).toString();
      },
      checkShowPercent (value) {
        return !Number.isNaN(Number.parseInt(value));
      },
      getProductImagePath (name) {
        console.log('@getProductImagePath');
        return Utils.getProductImagePath(name);
      },
      async changePage(page) {
        const { data } = await this.getProducts({page, limit: this.perPage});
        this.products = data.data;
        this.init();
        this.currentPage = data.current_page;
        this.lastPage = data.last_page;
        this.perPage = data.per_page;
        this.total = data.total;
      },
      clearAllInterval () {
        this._.forEach(intervals, (interval) => {
          clearInterval(interval);
        });
      },
      ...rf.getBehaviors('ProductBehavior'),
    },
    filters: {
      trim (value) {
        return `${value}}`.trim().slice(0, 19);
      },
      int (value) {
        if (Number.isNaN(Number.parseInt(value))) {
          return '0';
        }
        return `${Number.parseInt(value)}`;
      },
    },
    beforeDestroy() {
      this.clearAllInterval();
    }
  }
</script>

<style lang="scss">
  .collection-name {
    font-size: 2rem;
    color: #a20b33;
    font-style: italic;
    font-family: 'Avenir LT W01 85 Heavy', sans-serif;
    font-weight: bolder;
    text-transform: uppercase;
  }

  .collection-note {
    color: #a20b33;
    font-family: 'Avenir LT W01 85 Heavy', sans-serif;
  }

  .collection {
    margin: 0;
    padding: 1rem;
  }
  .collection:nth-child(n + 2) {
    .collection-name, .collection-note {
      color: #112441;
    }
  }
  .collection:nth-child(2) {
    .collection-name, .collection-note {
      color: #1bccb4;
    }
  }
  .collection:nth-child(5) {
    .collection-name, .collection-note {
      color: #8ba8d4;
    }
  }
  .collection:nth-child(4) {
    .collection-name, .collection-note {
      color: #c79c36;
    }
  }

  .image {
    overflow: hidden;
    & > img {
      transition: all ease-in-out .3s;
      &:hover {
        transform: scale(1.5);
        overflow: hidden;
        /*transition: all ease-in-out .5s;*/
      }
    }
  }
  time {
    font-size: 0.8rem;
  }
  .custom-tag {
    white-space: nowrap;
    font-size: 0.9rem;
  }
  .readonly {
    color: #4a4a4abd
  }
  .deal-price {

  }
  .origin-price {
    text-size-adjust: 100%;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
    box-sizing: border-box;
    color: rgb(120, 120, 120);
    font-size: 13px;
    font-weight: 300;
    text-decoration: line-through;
    display: inline-block;
    margin-left: 8px;
  }
  .percent-deal {
    width: 40px;
    position: absolute;
    z-index: 1;
    background-color: #f6444d;
    text-align: center;
    color: whitesmoke;
    font-size: 15px;
    &::after {
      content: '';
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 20px solid #f6444d;
      position: absolute;
      left: 0;
      top: 100%;
    }
  }
</style>
