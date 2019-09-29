<template>
  <el-menu :mode="mode">
    <el-menu-item index="1">Processing Center</el-menu-item>
    <template v-for="item in treeData">
      <custom-el-menu-item v-if="!_.isEmpty(item.children)" :data="item" :index="item.id" :key="item.id"></custom-el-menu-item>
      <el-menu-item v-else :index="`${item.id}`" :key="item.id">{{ item.title }}</el-menu-item>
    </template>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4"><a href="#" target="_blank">Orders</a></el-menu-item>
  </el-menu>
</template>

<script>
  import CustomElMenuItem from "./CustomElMenuItem";
  export default {
    name: "TreeNavigation",
    components: { CustomElMenuItem },
    props: {
      treeData: {

      },
      mode: {
        default: 'horizontal'
      }
    }
  }
</script>

<style scoped lang="scss">
  .tree-list ul {
    padding-left: 16px;
    margin: 6px 0;
  }
</style>