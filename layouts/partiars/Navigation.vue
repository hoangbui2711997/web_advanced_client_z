<template>
  <nav class="navbar is-transparent is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <button class="button is-primary custom" @click="controlGetHome" :id="`${$route.name}|control_get_home`">
          Home
        </button>
        <button class="button is-primary custom" @click="controlGetProductsUser" :id="`${$route.name}|control_get_products_user`">
          Products
        </button>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button v-if="isAuthenticated" to='/cart' class="button is-primary" @click="controlGetCart" :id="`${$route.name}|control_get_cart`">
              <strong>Cart</strong>
            </button>
            <button v-if="!isAuthenticated" class="button is-primary" @click="controlGetSignup" :id="`${$route.name}|control_register`">
              <strong>Sign up</strong>
            </button>
            <button v-if="!isAuthenticated" class="button is-light" @click="controlGetLogin" :id="`${$route.name}|control_get_login`">
              Log in
            </button>
            <button v-if="isAuthenticated" class="button is-light" @click="controlLogout" :id="`${$route.name}|control_logout`">
              Log out
            </button>
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
    data() {
      return {
        // navbar: [],
      };
    },
    async mounted() {
      // const { data } = await this.getNavigators();
      // this.navbar = data;
    },
    methods: {
      controlGetCart () {
        this.$router.push('/cart');
      },
      ...rf.getBehaviors('CommonBehavior'),
      ...rf.getBehaviors('UserBehavior'),
      async controlLogout() {
        const data = await this.logout();
        if (!!data) {
          await this.$store.dispatch('auth/logout');
          await this.$router.push('/auth/login');
        }
      },
      controlGetLogin () {
        this.$router.push('/auth/login');
      },
      controlGetSignup () {
        this.$router.push('/auth/register');
      },
      controlGetHome () {
        this.$router.push('/');
      },
      controlGetProductsUser () {
        console.log(`asdkfhasdf`);
        this.$router.push({ name: 'products-list' });

      },
    }
  }
</script>

<style scoped>
  .button.is-primary.custom {
    height: 98%;
  }
</style>
