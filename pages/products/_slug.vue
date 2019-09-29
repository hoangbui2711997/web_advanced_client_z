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
							{{ product.price }}
						</span>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		async asyncData ({ params, app }) {
			let response = await app.$axios.$get(`api/products/${params.slug}`);

			return {
				product: response.data
			}
		},
		data () {
			return {
				product: null,
			}
		}
	}
</script>

<style scoped>

</style>