<template>
  <div>
    <input :type="text" :class="cssClass">
  </div>
</template>

<script>
  export default {
    name: "CustomInput",
    props: {
      type: {
        default: 'text',
        type: String,
      },
      cssClass: {

      }
    }
  }
</script>

<style scoped>

</style>