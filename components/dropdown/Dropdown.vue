<template>
  <client-only placeholder="Loading...">
    <div v-click-outside="hide" class="dropdown-container">
      <div @click="handleClick()">
        <slot/>
      </div>
      <div v-if="visible" class="dropdown-list">
        <slot name="dropdown"/>
      </div>
    </div>
  </client-only>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
      };
    },
    props: {
      handle: {
        type: Function,
        default: undefined
      }
    },
    methods: {
      handleClick () {
        if (!!this.handle) {
          this.handle();
          return;
        }

        if (this.visible) {
          this.hide();
        } else {
          this.show();
        }
      },
      show () {
        if (!!this.handle) {
          return;
        }

        this.visible = true;
      },
      hide () {
        console.log(`@hide`);
        this.visible = false;
        this.$emit('refresh');
      },
    },
    mounted () {
      this.$on('hide-dropdown-menu', this.hide);
    },
  };
</script>

<style lang="scss" scoped>
  .dropdown-container {
    display: inline-block;
    position: relative;
  }
  .dropdown-list {
    top: 42px;
    position: absolute;
    z-index: 10;
    width: 100%;
  }
</style>
