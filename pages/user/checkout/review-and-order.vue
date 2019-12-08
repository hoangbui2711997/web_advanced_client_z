<template>
  <div>
    <div class="header">
      <!--      <div class="heading-secondary">set up your express checkout</div>-->
    </div>
    <div class="body">
      <!--      <div class="info">Congratulations, you're ready to shop! Save time checking out by entering your billing-->
      <!--        information.-->
      <!--        Your information is stored securely. You can also skip for now-->
      <!--      </div>-->

      <section class="section category recipient information">
        <div class="category-title columns" style="background-color: #7fcf29; color: white;">
          <div class="category-title-number is-1 is-size-5 column"
               style="border-right: white thin solid; text-align: center;">
            1
          </div>
          <div class="category-title-content is-size-5 column">
            ENTER RECIPIENT INFORMATION
          </div>
        </div>

        <div class="category-body">
          <div class="columns">
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">SALUTATION</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="SELECT BOX">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">*RECIPIENT FIRST NAME</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="me@example.com">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">*RECIPIENT LAST NAME</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="me@example.com">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-vertical">
            <div class="field-label is-normal">
              <label class="label">TYPE OF LOCATION</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="email" value="me@example.com">
                </p>
              </div>
            </div>
          </div>
          <div class="field is-vertical">
            <div class="field-label is-normal">
              <label class="label">*ADDRESS LINE 1</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="email" value="me@example.com">
                </p>
              </div>
            </div>
          </div>
          <div class="field is-vertical">
            <div class="field-label is-normal">
              <label class="label">ADDRESS LINE 2</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="email" value="me@example.com">
                </p>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">* city</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="me@example.com">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">*state/province</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="me@example.com">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">*zipcode/postal code</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="me@example.com">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">*country</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="me@example.com">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">*phone number</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="me@example.com">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">email</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="me@example.com">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <div class="field is-horizontal">
                <input class="checkbox" type="checkbox" value="">
                <label class="label">Use this address as my Billing Address</label>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div class="field is-horizontal">
                <input class="checkbox" type="checkbox" value="">
                <label class="label">Save to my address book.</label>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section class="section category delivery information">
        <div class="category-title columns" style="background-color: #7fcf29; color: white;">
          <div class="category-title-number is-1 is-size-5 column"
               style="border-right: white thin solid; text-align: center;">
            2
          </div>
          <div class="category-title-content is-size-5 column">
            ENTER DELIVERY INFORMATION
          </div>
        </div>

        <div class="category-body">
          <div class="columns">
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">*DELIVERY DATE</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <input class="input" type="email" value="me@example.com">
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">SPECIAL INSTRUCTIONS</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control">
                      <textarea rows="5" cols="65">

                      </textarea>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section category delivery information">
        <div class="category-title columns" style="background-color: #7fcf29; color: white;">
          <div class="category-title-number is-1 is-size-5 column"
               style="border-right: white thin solid; text-align: center;">
            3
          </div>
          <div class="category-title-content is-size-5 column">
            WRITE A NOTE
          </div>
        </div>

        <div class="category-body">
          <div class="columns">
            <div class="column">
              <div class="columns">
                <div class="column">
                  <div class="field is-vertical">
                    <div class="field-label is-normal">
                      <label class="label">*NOTE TYPE</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <p class="control">
                          <input class="input" type="email" value="me@example.com">
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field is-vertical">
                    <div class="field-label is-normal">
                      <label class="label">*MESSAGE FROM (e.g. Love, Hoang)</label>
                    </div>
                    <div class="field-body">
                      <div class="field">
                        <p class="control">
                          <input class="input" type="email" value="me@example.com">
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label" style="white-space: normal; font-weight: normal; border: thin dashed; padding: 5px 10px;">
                    Please note that you will have the opportunity to add an additional
                    complimentary video or an eCard message after making your purchase!</label>
                </div>
              </div>
            </div>
          </div>
          <div class="columns">
            <div class="field is-vertical">
              <div class="field-label is-normal">
                <label class="label">
                  *YOUR MESSAGE
                </label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control">
                      <textarea rows="5" cols="65">

                      </textarea>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="hr-bar"></div>
      <div class="columns">
        <div class="column"></div>
        <div class="column is-clearfix">
          <label class="label is-pulled-left">GRANT TOTAL</label>
          <label class="label is-pulled-right">$79.99</label>
        </div>
      </div>
      <div class="hr-bar"></div>

      <section class="section update">
        <div class="columns">
          <div class="column">
            <input class="button is-primary is-pulled-right" type="button" value="PAYMENT" @click="handlePaymentControl">
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "review-and-order",
    methods: {
      handlePaymentControl () {
        this.$router.push({ name: 'user-checkout-payment' });
      },
    }
  }
</script>

<style scoped>
  .label {
    text-align: left;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .checkbox {
    height: 25px;
    width: 25px;
    margin-right: 0.5rem;
  }
  .hr-bar {
    display: block;
    border-bottom: thin solid;
    margin-bottom: 1rem;
  }
  .body {
    border: thin solid;
  }
</style>
