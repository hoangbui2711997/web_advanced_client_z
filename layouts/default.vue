<template>
  <div>
    <smooth-scrollbar>
      <navigation/>
      <div style="margin-left: 1.5rem; margin-top: 1rem;">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item>promotion management</el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
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

<script>
  import Navigation from './partiars/Navigation';

  export default {
    components: { Navigation }
  }
</script>

<style>
  .drift-bounding-box.drift-open {
    width: 158px !important;
    height: 142px !important;
  }
  .drift-zoom-pane.drift-open {

  }
</style>