<template>
  <div class="container">
    <div class="header">
      <div class="step">
        <div class="steps" id="stepsDemo">
          <div class="step-item is-active is-success">
            <div class="step-marker">1</div>
            <div class="step-details">
              <p class="step-title">Cart</p>
            </div>
          </div>
          <div class="step-item" :class="step > 1 ? 'is-active is-success' : ''">
            <div class="step-marker">2</div>
            <div class="step-details">
              <p class="step-title">RECIPIENT INFORMATION</p>
            </div>
          </div>
<!--          <div class="step-item" :class="step > 2 ? 'is-active is-success' : ''">-->
<!--            <div class="step-marker">3</div>-->
<!--            <div class="step-details">-->
<!--              <p class="step-title">REVIEW</p>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="step-item" :class="step > 3 ? 'is-active is-success' : ''">-->
<!--            <div class="step-marker">4</div>-->
<!--            <div class="step-details">-->
<!--              <p class="step-title">PAYMENT</p>-->
<!--            </div>-->
<!--          </div>-->
          <div class="step-item" :class="step > 2 ? 'is-active is-success' : ''">
            <div class="step-marker">
              <span class="icon">
                <i class="fa fa-flag"></i>
              </span>
            </div>
            <div class="step-details">
              <p class="step-title">FINISH</p>
            </div>
          </div>
          <div class="steps-content">
            <nuxt-child></nuxt-child>
          </div>
          <div v-show="step > 1 && step !== 3" class="footer">
            <div class="steps-actions">
              <div class="steps-action">
                <nuxt-link :to="{ name: previous }" class="button is-light">Previous</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const STEP_1 = 'user-checkout-cart';
  const STEP_2 = 'user-checkout-bill-info';
  // const STEP_3 = 'user-checkout-review-and-order';
  // const STEP_4 = 'user-checkout-payment';
  const STEP_3 = 'user-checkout-finish';

  export default {
    name: "checkout",
    data () {
      return {
        previous: 'user-checkout-cart',
        step: 1,
        params: {}
      };
    },
    watch: {
      $route ({ name }) {
        switch (name) {
          case STEP_1:
            this.previous = STEP_1;
            this.step = 1;
            break;
          case STEP_2:
            this.previous = STEP_1;
            this.step = 2;
            break;
          case STEP_3:
            this.previous = STEP_2;
            this.step = 3;
            break;
          // case STEP_4:
          //   this.previous = STEP_3;
          //   this.step = 4;
          //   break;
          // case STEP_5:
          //   this.previous = STEP_4;
          //   this.step = 5;
          //   break;
          default:
            this.previous = STEP_1;
            this.step = 1;
        }
      },
    }
  }
</script>

<style scoped>

</style>
