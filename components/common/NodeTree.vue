<template>
<!--  <div class="navbar-item"-->
<!--       :class="{ 'has-dropdown': !_.isEmpty(node.children), 'is-hoverable': !_.isEmpty(node.children) }"-->
<!--       :is="!_.isEmpty(node.children) ? 'div' : 'a'"-->
<!--  >-->
  <div class="navbar-item">
<!--    <a v-if="level !== 1" :class="{ 'navbar-link': !_.isEmpty(node.children) }">{{ node.title }}</a>-->
    <a v-if="level === 2" :class="{ 'navbar-link': !_.isEmpty(node.children) }" :title="node.title">{{ node.title }}</a>
    <a v-else-if="level !== 1" :title="node.title">{{ node.title }}</a>
    <div v-if="node.children && node.children.length" :class="`navbar-dropdown is-boxed level_${level}`">
      <node-tree v-for="child in node.children" :node="child" :key="child.id" :level="level + 1"></node-tree>
    </div>
    <div v-else-if="level === 3" class="wrap-height navbar-dropdown is-boxed"></div>
  </div>
</template>

<script>
  export default {
    name: "NodeTree",
    props: {
      node: {},
      level: {
        default: 1
      }
    }
  }
</script>

<style scoped lang="scss">
  .navbar-dropdown.is-boxed.level_2 {
    display: flex !important;
    border: none;
    & > .navbar-item:not(:last-child) {
      border-right: solid thin grey;
    }
  }
  .level_3 {
    position: absolute;
    top: 40px;
    left: 0;
  }
  a {
    color: black;
    &:hover {
      color: #3273dc;
    }
  }
  a.navbar-link {
    max-width: 200px;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .wrap-height.navbar-dropdown.is-boxed {
    min-height: 200px;
    border: none;
  }

</style>
