<template>
  <nav class="navbar is-transparent is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "CategoryNav",
    props: {
      links: {
        type: Array,
        default: () => [],
        required: true,
      }
    }
  }
</script>

<style scoped>

</style>
