<template>
  <div>
    <smooth-scrollbar>
      <nuxt/>
    </smooth-scrollbar>
  </div>
</template>

<style lang="scss">
  html::-webkit-scrollbar {
    display: none;
  }
  *::-webkit-scrollbar {
    display: none;
  }
  .wrap-form {
    padding: 20px;
    min-height: 100vh;
  }
</style>

