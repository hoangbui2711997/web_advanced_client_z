<template>
  <div :class="{
    'is-inline-flex': level === 1,
    'el-submenu': !_.isEmpty(data.children)
    }" :index="`${index}-${data.order}`">
<!--    <component :is="_.isEmpty(data.children) ? 'el-menu-item' : 'el-submenu'" :index="`${index}-${data.order}`" class="border-bottom">-->
    <component :is="_.isEmpty(data.children) ? 'el-menu-item' : 'el-submenu'" :index="`${index}-${data.order}`" class="border-bottom">
      <template slot="title">{{ data.title }}</template>
      <template v-if="!_.isEmpty(data.children)">
        <custom-el-menu-item
          :data="child"
          v-for="child in data.children"
          :key="_.get(child, 'id', '')"
          :index="`${index}-${data.order}-${_.get(child, 'id', '')}`"
          :level="level + 1"
        >
        </custom-el-menu-item>
        <el-menu-item v-for="index in missingPart" :key="index" disabled class="cursor-default"></el-menu-item>
      </template>
    </component>
  </div>
</template>

<script>
  export default {
    name: "CustomElMenuItem",
    props: {
      data: {},
      index: {
        default: 1,
      },
      defaultLength: {
        default: 5,
      },
      level: {
        default: 1
      }
    },
    computed: {
      missingPart () {
        return Math.max(this.defaultLength - this._.get(this.data.children, 'length', 0), 0);
      },
    },
  }
</script>

<style scoped lang="scss">
  .cursor-default {
    cursor: default;
    border: none;
  }
</style>
