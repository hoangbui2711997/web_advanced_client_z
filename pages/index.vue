<template>
	<div>
    <div style="margin-bottom: 25px;">
<!--		  <tree-navigation :tree-data="navbar"></tree-navigation>-->
    </div>

    <div class="container is-fluid">
      <template v-for="(collection, i) in collections">
        <div class="collection" :key="collection.key" :style="{ 'background': `url(${bg_urls[i]})` }">
          <div class="columns is-justify-center">
            <div class="collection-name">{{ collection.name }}</div>
          </div>
          <div class="columns is-justify-center">
            <div class="collection-note">{{ collection.note }}</div>
          </div>
          <div class="columns is-justify-center is-wrapped">
            <div class="column is-2" v-for="(product, index) in collection.products" :key="`${index}_${product.id}`">.
              <div class="card">
                <div class="card-image">
                  <div v-if="checkShowPercent(product.percent) && !!_.get(product, 'in_deal', false)" class="percent-deal">
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
                    {{ product.price }} $<span class="origin-price" v-show="checkShowPercent(product.percent) && !!_.get(product, 'in_deal', false)">{{ calPrice(product.price, product.percent) }} $</span>
                    <br>
                    <time v-if="!!_.get(product, 'in_deal', false)" class="readonly is-no-wrap">Duration <span :id="`product_${index}_${collection.id}_${product.id}`"></span></time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
	</div>
</template>

<script>
  import moment from 'moment';
	import rf from '../utils/requests/RequestFactory';
	// import TreeNavigation from "../components/common/TreeNavigation";
  import Utils from "../utils/Utils";

	const bg_urls = [
	  'daisies_cornflowers_flowers_meadow_summer_nature_55629_1600x900.jpg',
	  'peonies_hydrangea_flowers_painting_jugs_flower_beauty_34870_1600x900.jpg',
	  'roses_flower_grass_stones_rope_beauty_22893_1920x1080.jpg',
	  'roses_flowers_garden_herbs_much_beauty_31384_1920x1080.jpg',
	  'tulips_flowers_two-color_bouquet_dark_background_54077_1920x1080.jpg',
  ];

	const intervals = [];

	export default {
		async asyncData ({ $axios }) {
		  const { data } = await rf.getBehaviors('ProgramBehavior', $axios).getCollectionProducts();

		  return {
		    collections: data
      };
		},
		// components: { TreeNavigation },
		data() {
			return {
        bg_urls,
				fileList: [{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}],
				product: null,
				navbar: [],
        collections: [],
        now: moment().format('x'),
			};
		},
		// async mounted () {
		// 	const { data } = await this.getNavigators();
		// 	console.log(data, 'data');
		// 	this.navbar = data;
		// },
    mounted() {
		  console.log(`@mounted`);
		  this.init();
    },
    methods: {
		  clearAllInterval() {
        this._.forEach(intervals, (interval) => {
          clearInterval(interval);
        });
      },
		  init () {
        this.clearAllInterval();
        this._.forEach(this.collections, (collection) => {
          this._.forEach((collection.products), (product, index) => {
            this.timeCountDown(product, index, collection.id);
          });
        });
      },
      timeCountDown (product, index, collectionId) {
        const time = product.special_to;
        product.count = 0;
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let calTime = time - this.now - (product.count * 1000);
        this.$set(product, 'in_deal', false);
        const id = setInterval(() => {
          calTime = time - this.now - (product.count * 1000);
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
          this._.set(document.querySelector(`#product_${index}_${collectionId}_${product.id}`), 'innerHTML', `${days} days ${hours}:${minutes}:${seconds}`);
          product.count++;
          // this.$set(product, 'time', `${duration.days()} days ${duration.hours()}:${duration.minutes()}:${duration.seconds()}`);
          }, 1000);

        intervals.push(id);
        // this.setInterval.push(interval);
      },
		  calPrice (price, percent) {
		    const BigNumber = this.BigNumber;
		    return new BigNumber(price).times(new BigNumber(100 - percent)).div(100).toString();
      },
      getProductImagePath(url) {
        return Utils.getProductImagePath(url);
      },
      checkShowPercent (value) {
        return !Number.isNaN(Number.parseInt(value));
      },
			...rf.getBehaviors('CommonBehavior')
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

