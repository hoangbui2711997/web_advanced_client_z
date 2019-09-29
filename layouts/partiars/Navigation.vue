<template>
	<nav class="navbar is-transparent is-primary" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a class="navbar-item" href="https://bulma.io">
				<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
			</a>

			<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>

		<div id="navbarBasicExample" class="navbar-menu">
			<div class="navbar-start">
				<a class="navbar-item">
					Home
				</a>
				<a class="navbar-item">
					Documentation
				</a>
			</div>
			<div class="navbar-end">
				<div class="navbar-item">
					<div class="buttons">
						<nuxt-link to='/auth/register' class="button is-primary">
							<strong>Sign up</strong>
						</nuxt-link>
						<nuxt-link to='/auth/login' class="button is-light">
							Log in
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
	import rf from '../../utils/requests/RequestFactory';

	export default {
		name: "Navigation",
		data () {
			return {
				navbar: [],
			}
		},
		async mounted () {
			const { data } = await this.getNavigators();
			this.navbar = data;
		},
		methods: {
			...rf.getBehaviors('CommonBehavior')
		}
	}
</script>

<style scoped>

</style>