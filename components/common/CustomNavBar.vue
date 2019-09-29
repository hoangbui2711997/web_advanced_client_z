<template>
  <div class="wrap">
    <el-dropdown :hide-on-click="false" :show-timeout="100" :hide-timeout="200" v-for="data_1 in data" :key="data_1.id">
    <div class="el-dropdown-link">
      {{ data_1.title }}<i v-if="!_.isEmpty(data_1.children)" class="el-icon-arrow-down el-icon--right"></i>
    </div>
      <el-dropdown-menu slot="dropdown" v-if="!_.isEmpty(data_1.children)">
        <div class="columns p-20">
          <div class="column parent" v-for="data_2 in data_1.children" :key="data_2.id">
            <h2 style="opacity: 0.7">{{ data_2.title }}</h2>
            <hr style="margin: 5px">
            <ul>
              <el-dropdown-item v-for="child in data_2.children" :key="child.id" style="font-size: 0.9rem">
<!--                {{ child.title }}-->
                <nuxt-link :to="{ name: child.link }">{{ child.title }}</nuxt-link>
              </el-dropdown-item>
            </ul>
          </div>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  // for 3 levels navigator
  export default {
    name: "CustomNavBar",
    props: {
      data: {

      }
    }
  }
</script>

<style scoped lang="scss">
  @import '~bulma/sass/utilities/initial-variables';
  @import '~bulma/sass/utilities/derived-variables';

  .wrap {
    line-height: 2rem;
    .el-dropdown {
      &:first-child {
        .el-dropdown-link {
          margin-left: 1rem;
        }
      }
      .el-dropdown-link {
        padding: 0 1.5rem;
        font-weight: bold;
        transition: background-color ease-in-out 0.25s;
        &:hover {
          cursor: pointer;
          background-color: $primary;
          color: whitesmoke;
        }
      }
    }
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .parent {
    & > h2, & > ul > li {
      max-width: 300px;
      min-width: 250px;
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      padding: 5px;
    }

    & > ul {
      min-height: 200px;
      & > li {
        &:hover {
          & > a {
            color: $primary;
            cursor: pointer;
          }
        }
      }
    }
  }
  ul.el-dropdown-menu.el-popper {
    border-top: solid $primary;
    transform: translate(10px, -14px);
  }
  ul li.el-dropdown-menu__item:focus > a {
    color: $primary;
  }
  /deep/ .popper__arrow {
    margin: 0 !important;
    border: 0 !important;
    &::after {
      border: none !important;
      margin: 0 !important;
    }
  }
  a {
    color: #4a4a4a;
    display: block;
  }
</style>