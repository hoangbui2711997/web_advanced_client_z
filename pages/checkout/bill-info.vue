<template>
  <div>
    <div class="header">
      <div class="heading">ABC</div>
      <div class="heading-secondary">set up your express checkout</div>
    </div>
    <div class="hr-bar"></div>

    <div class="body">
      <div class="info">Congratulations, you're ready to shop! Save time checking out by entering your billing information.
      Your information is stored securely. You can also skip for now</div>
      <div class="heading bg-primary">
        <div class="columns">
          <div class="column is-half">
            <div class="d-inline">
              <div class="form-control">
                <div class="label">* first name</div>
                <input type="email" class="input-control">
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="form-control">
              <div class="label">* last name</div>
              <input type="email" class="input-control">
            </div>
          </div>
        </div>
        <div class="columns">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "bill-info"
    }
</script>

<style scoped>

</style>
