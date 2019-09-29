<template>
	<div class="wrap-login-form">
		<div class="columns">
			<div class="column has-text-centered">
				<h1 style="font-size: 20px; font-weight: bold;">Register Page</h1>
			</div>
		</div>
		<div class="columns">
			<div class="column is-three-fifths is-offset-one-fifth">
				<form class="box">
					<div class="field">
						<label class="label" for="name">User name</label>
						<div class="control">
							<input id="name" class="input" type="text" placeholder="..." v-model="params.name">
						</div>
					</div>
					<div class="field">
						<label class="label" for="email">Email</label>
						<div class="control">
							<input id="email" class="input" type="email" :class="{
								'is-danger': !_.isEmpty(warning)
							}" placeholder="e.g. yourname@gmail.com" v-model="params.email">
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
						<label class="label" for="repeat_password">Repeat Password</label>
						<div class="control">
							<input id="repeat_password" class="input" :class="{
								'is-danger': !_.isEmpty(warning)
							}" type="password" v-model="params.password_confirmation">
						</div>
					</div>
					<div v-if="!_.isEmpty(warning)" class="notification is-danger">
						<div v-for="(value, key) in warning" :key="key">
							{{ value }}
						</div>
					</div>
					<div v-if="!_.isEmpty(notification)" class="notification is-success">
						{{ notification }}
					</div>
					<div class="field is-clearfix">
						<input type="submit" class="button is-link is-pulled-right" value="Register" @click.prevent="submit">
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Register",
		middleware: 'not_authenticated',
		// computed: {
		// 	'_' () {
		// 		return _;
		// 	}
		// },
		data () {
			return {
				params: {},
				warning: [],
				notification: '',
			};
		},
		methods: {
			async submit () {
				try {
					const { message } = await this.$axios.$post('api/auth/signup', {
						...this.params
					});
					this.notification = message;
				} catch (e) {
					this.warning = [];
					_.forEach(e.response.data.errors, (value, key) => {
						this.warning.push(_.first(value));
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.wrap-login-form {
		padding: 20px;
		min-height: 100vh;
	}
</style>
