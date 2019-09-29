<template>
  <div class="wrap-form">
    <div class="columns is-justify-center">
      <custom-nav-bar :data="navbar"></custom-nav-bar>
    </div>
    <div class="columns">
      <div class="column">
        <h1 style="font-size: 20px; font-weight: bold;" class="is-pulled-left">Login Page</h1>
        <div class="button is-primary is-pulled-right" @click="logout">Logout</div>
      </div>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
  import CustomNavBar from "../components/common/CustomNavBar";
  export default {
    name: "admin",
    components: { CustomNavBar },
    middleware: 'authenticated',
    async asyncData ({ app }) {
      const { data } = await app.$axios.get('api/navigators');
      return {
        navbar: data.data,
      }
    },
    data () {
      return {
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('auth/logout');
        this.$router.push('/auth/login');
      },
    }
  }
</script>

<style scoped>

</style>