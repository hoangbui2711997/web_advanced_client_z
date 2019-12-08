<template>
  <div>
    <div class="header">
      <div class="heading">Account Info</div>
      <!--      <div class="heading-secondary">set up your express checkout</div>-->
    </div>
    <div class="hr-bar"></div>
    <div class="body">
      <!--      <div class="info">Congratulations, you're ready to shop! Save time checking out by entering your billing-->
      <!--        information.-->
      <!--        Your information is stored securely. You can also skip for now-->
      <!--      </div>-->

      <section class="section category bill-address">
        <div class="category-title columns" style="background-color: #7fcf29; color: white;">
          <div class="category-title-number is-1 is-size-5 column" style="border-right: white thin solid; text-align: center;">
            1
          </div>
          <div class="category-title-content is-size-5 column">
            BILLING NAME AND ADDRESS
          </div>
        </div>

        <div class="category-body">
          <div class="columns">
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">* first name</label>
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
                  <label class="label">* last name</label>
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
              <label class="label">* e-mail address</label>
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
              <label class="label">*Address line 1</label>
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
              <label class="label">Address line 2</label>
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
                  <label class="label">* country</label>
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
                  <label class="label">* state/province</label>
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
                  <label class="label">* zip/postal code</label>
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
                  <label class="label">* phone number</label>
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
              <div class="columns">
                <div class="field-label is-normal">
                  <label class="label">* birthday</label>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="field is-vertical">
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
          </div>
        </div>
      </section>

      <div class="hr-bar"></div>

      <section class="section update">
        <div class="columns">
          <div class="column">
            <input class="button is-primary" type="button" value="UPDATE MY ACCOUNT">
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user-info"
  }
</script>

<style scoped>
  .label {
    text-align: left;
    text-transform: uppercase;
  }
</style>
