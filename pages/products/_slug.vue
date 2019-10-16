<template>
	<div class="section">
		<nuxt-link to="/">Index</nuxt-link>
		<router-link to="/">Index</router-link>
		<div class="container is-fluid">
			<div class="columns">
				<div class="column is-half">
					<img src="http://via.placeholder.com/628x620" alt="Product name">
				</div>
				<div class="column is-half">
					<section class="section">
						<h1 class="title is-4">
							{{ product.name }}
						</h1>
						<p>
							{{ product.description }}
						</p>
						<hr>
						<span class="tag is-rounded is-medium">
							{{ _.get(v, 'price', undefined) || product.price }}
						</span>
					</section>

					<div class="section">
						<ProductVariation v-for="(variations, type) in product.variations"
						                  :variations="variations"
						                  :type="type"
						                  :key="type"
						                  v-model="v"
						>
						</ProductVariation>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ProductVariation from "../../components/products/ProductVariation";
	export default {
		components: {ProductVariation},
		async asyncData ({ params, app }) {
			let response = await app.$axios.$get(`api/products/${params.slug}`);

			return {
				product: response.data
			}
		},
		data () {
			return {
				product: null,
				v: '',
			}
		},
		methods: {

		}
	}
</script>

<style scoped>

</style>