<template>
	<div class="wrap-form">
		<div class="columns">
			<div class="column has-text-centered">
				<h1 style="font-size: 20px; font-weight: bold;">Login Page</h1>
			</div>
		</div>
		<div class="columns">
			<div class="column is-three-fifths is-offset-one-fifth">
				<form class="box">
					<div class="field">
						<label class="label" for="email">Email</label>
						<div class="control">
							<input id="email" class="input" :class="{
								'is-danger': !_.isEmpty(warning)
							}" type="email" placeholder="e.g. alexjohnson@gmail.com" v-model="params.email">
						</div>
					</div>
					<div class="field">
						<label class="label" for="password">Password</label>
						<div class="control">
							<input id="password" class="input" :class="{
								'is-danger': !_.isEmpty(warning)
							}" type="password" v-model="params.password">
						</div>
					</div>
					<div class="field">
						<label class="label" for="checkbox">Remember me</label>
						<div class="control">
							<input id="checkbox" class="checkbox" :class="{
								'is-danger': !_.isEmpty(warning)
							}" type="checkbox" v-model="params.remember_me">
						</div>
					</div>
					<div v-if="!_.isEmpty(warning)" class="notification is-danger">
						Email or password invalid
					</div>
					<div class="field is-clearfix">
						<input type="submit" class="button is-link is-pulled-right" value="Login" @click.prevent="submit">
					</div>
					<nuxt-link to="/admin/users">admin</nuxt-link>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Login",
		middleware: 'not_authenticated',
		// computed: {
		// 	'_' () {
		// 		return _;
		// 	}
		// },
		data () {
			return {
				warning: '',
				params: {},
			}
		},
		methods: {
			async submit () {
				try {
					const { data: credential  } = await this.post('/auth/login', { ...this.params });
					const token = await this.$store.dispatch('auth/initAuth', credential);
					if (token) {
						this.$axios.defaults.headers.common['Authorization'] = token;
					}
					this.$router.push('/admin/users');
				} catch (e) {
					console.error(e);
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrap-form {
		padding: 20px;
		min-height: 100vh;
	}
</style>