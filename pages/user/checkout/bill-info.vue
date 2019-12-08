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

        <div class="category-body is-relative">
          <div class="columns">
            <div class="column">
              <div class="field is-vertical">
                <div class="field-label is-normal">
                  <label class="label">ADDRESS BOOKS</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <div class="select-groups-container field-item">
                      <div class="select">
                        <dropdown style="width:100%">
                          <p class="active-selected capitalize" @click="resetErrors()" v-if="!!address_book">
                            {{ `${_.get(address_book, 'first_name', '')}` }} {{ `${_.get(address_book, 'last_name',
                            '')}` }}
                          </p>
                          <p class="active-selected" @click="resetErrors()" v-else>Please select</p>
                          <dropdown-menu slot="dropdown" class="box-popup" style="height: 200px; overflow-y: auto;">
                            <dropdown-item
                              class="dropdown-item capitalize"
                              @click.native="setAddressBook(null)"
                            >
                              Cancel
                            </dropdown-item>
                            <dropdown-item
                              class="dropdown-item capitalize"
                              v-for="(item, index) in address_books"
                              :key="index"
                              @click.native="setAddressBook(item)"
                              :title="`${_.get(item, 'first_name', '')} ${_.get(item, 'last_name', '')}`"
                            >
                              {{ `${_.get(item, 'first_name', '')}` }} {{ `${_.get(item, 'last_name', '')}` }}
                            </dropdown-item>
                          </dropdown-menu>
                        </dropdown>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="is-relative">
            <div v-if="!!address_book"
                 style="position: absolute; width: 100%; height: 100%; z-index: 1; background: grey; opacity: 0.05;"></div>
            <div class="columns">
              <div class="column">
                <div class="field is-vertical">
                  <div class="field-label is-normal">
                    <label class="label">*RECIPIENT FIRST NAME</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control">
                        <input class="input" name="first_name" type="text" v-model="params.first_name">
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
                        <input class="input" name="last_name" type="text" v-model="params.last_name">
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
                  <div class="select-groups-container field-item">
                    <div class="select">
                      <dropdown style="width:100%">
                        <p class="active-selected capitalize" @click="resetErrors()" v-if="params.location">
                          {{ `${_.get(params.location, 'type', '')}` }}
                        </p>
                        <p class="active-selected" @click="resetErrors()" v-else>Please select</p>
                        <dropdown-menu slot="dropdown" class="box-popup" style="height: 200px; overflow-y: auto;">
                          <dropdown-item
                            class="dropdown-item capitalize"
                            v-for="(item, index) in locations"
                            :key="index"
                            @click.native="setTypeOfLocation(item)"
                            :title="_.get(item, 'type', '')"
                          >
                            {{ `${_.get(item, 'type', '')}` }}
                          </dropdown-item>
                        </dropdown-menu>
                      </dropdown>
                    </div>
                  </div>
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
                    <input class="input" name="address_line_1" type="text" v-model="params.address_line_1">
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
                    <input class="input" name="address_line_2" type="email" v-model="params.address_line_2">
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
                        <input class="input" name="city" type="text" value="VietNam" v-model="params.city">
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
                        <input class="input" name="province" type="text" value="VietNam" v-model="params.province">
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
                      <div class="select-groups-container field-item">
                        <div class="select">
                          <dropdown style="width:100%" ref="code" :handle="showListCode">
                            <p class="active-selected capitalize" @click="resetErrors()">
                              <input type="text"
                                     class="focus-none"
                                     v-model="params.zipcode_id"
                                     @focus="() => $refs.code.visible = true"
                                     style="border: none; line-height: 23px; font-size: 0.9rem; padding-left: .5rem">
                            </p>
                            <dropdown-menu slot="dropdown" class="box-popup" style="height: 200px; overflow-y: auto;">
                              <dropdown-item
                                class="dropdown-item capitalize"
                                v-for="item in zipcodes"
                                :key="_.get(item, 'id', '')"
                                @click.native="setCode(item)"
                                :title="_.get(item, 'alternatenames', '')"
                              >
                                {{ `${_.get(item, 'id', '')} - ${_.get(item, 'name', '')}` }}
                              </dropdown-item>
                              <infinite-loading force-use-infinite-wrapper=".box-popup"
                                                @infinite="loadMoreCode"></infinite-loading>
                            </dropdown-menu>
                          </dropdown>
                          <!--                        <input hidden name="discount_id" data-vv-validate-on="none" v-model="discount" v-validate="'required'" />-->
                          <!--                        <div class="warning-message" v-if="errors.has('discount_id')">-->
                          <!--                          <span>{{ errors.first('discount_id') }}</span>-->
                          <!--                        </div>-->
                        </div>
                      </div>
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
                        <input class="input" name="country" type="text" value="VietNam" readonly="readonly"
                               v-model="params.country">
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
                        <input class="input" name="phone_number" type="text" v-model="params.phone_number">
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
                        <input class="input" name="email" type="text" v-model="params.email">
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
                      <el-date-picker
                        v-model="params.delivery_date"
                        type="date"
                        placeholder="Pick a day"
                        :picker-options="pickerOptions">
                      </el-date-picker>
                      <!--                      <input class="input" type="date" v-model="params.delivery_date">-->
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
                      <textarea rows="5" cols="65" name="instruction" v-model="params.instruction">

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
                        <div class="select-groups-container field-item">
                          <div class="select">
                            <dropdown style="width:100%">
                              <p class="active-selected capitalize" @click="resetErrors()">
                                {{ `${_.get(params.note_type, 'type', 'Please select')}` }}
                              </p>
                              <dropdown-menu slot="dropdown" class="box-popup" style="height: 200px; overflow-y: auto;">
                                <dropdown-item
                                  class="dropdown-item capitalize"
                                  v-for="(item, index) in note_types"
                                  :key="index"
                                  @click.native="setNoteType(item)"
                                  :title="_.get(item, 'type', '')"
                                >
                                  {{ `${_.get(item, 'type', '')}` }}
                                </dropdown-item>
                              </dropdown-menu>
                            </dropdown>
                          </div>
                        </div>
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
                          <input class="input" name="from_message" type="text" v-model="params.from_message">
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
                  <label class="label"
                         style="white-space: normal; font-weight: normal; border: thin dashed; padding: 5px 10px;">
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
                    <textarea rows="5" cols="65" name="message" v-model="params.message"></textarea>
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
          <label class="label is-pulled-right">{{ total }}</label>
        </div>
      </div>
      <div class="columns">
        <div class="column"></div>
        <div class="column is-clearfix">
          <label class="label is-pulled-left">BALANCE AFTER PAYMENT</label>
          <label class="label is-pulled-right">{{ getBalance | minus(total) }}</label>
        </div>
      </div>
      <div class="hr-bar"></div>

      <section class="section update">
        <div class="columns">
          <div class="column">
            <input class="button is-primary is-pulled-right" type="button" value="NEXT: BILLING & REVIEW"
                   @click="handleBillInfoControl">
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import rf from "../../../utils/requests/RequestFactory";
  import { mapGetters } from 'vuex';

  export default {
    name: "bill-info",
    async asyncData({$axios}) {
      const { data: locations } = await rf.getBehaviors('CommonBehavior', $axios).getLocations();
      const { data: note_types } = await rf.getBehaviors('CommonBehavior', $axios).getNodeTypes();
      const { data: address_books } = await rf.getBehaviors('UserBehavior', $axios).getAddressBooks();
      const { data: total } = await rf.getBehaviors('UserBehavior', $axios).getPayment();
      return {
        locations,
        note_types,
        address_books,
        total
      }
    },
    computed: {
      ...mapGetters(['getBalance']),
    },
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: 'Tomorrow',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: 'Next a week',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        locations: [],
        note_types: [],
        zipcodes: [],
        page_code: 1,
        address_books: [],
        address_book: null,
        params: {
          zipcode_id: '',
          province_name: '',
          city_name: '',
          location: {},
          country: 'Viet Nam',
          note_type: {},
        }
      };
    },
    watch: {
      async 'params.zipcode_id'() {
        this.page_code = 1;
        this.zipcodes = [];
        const {data: data} = await this.getZipcodes({
          search_key: this.params.zipcode_id, page: this.page_code++, limit: 20
        });
        this.zipcodes.push(...data.data);
      },
    },
    methods: {
      setAddressBook(addressBook) {
        if (!addressBook) {
          this.params = {
            zipcode_id: '',
            province_name: '',
            city_name: '',
            location: {},
            country: 'Viet Nam',
            note_type: {},
          };
          this.address_book = addressBook;
          return;
        }

        this.address_book = addressBook;
        this.params = {...this.params, ...addressBook};
        this.params.location = this._.find(this.locations, (location) => this._.get(location, 'id', '') == addressBook.location_type_id);
      },
      setNoteType(noteType) {
        this.params.note_type = noteType;
      },
      showListCode() {
        this.visible = true;
      },
      setCode({id}) {
        this.params.zipcode_id = id;
      },
      async handleBillInfoControl() {
        try {
          const {data} = await this.insertOrUpdateBookAddress(this.params);
          // await this.$router.push({name: 'user-checkout-review-and-order'});
          const { data: user } = await this.getCurrentUser();
          this.$store.commit('fetchUser', user);
          await this.$router.push({name: 'user-checkout-finish'});
        } catch (e) {
          this.showError(e);
        }
      },
      setTypeOfLocation(location) {
        this.params.location = location;
      },
      async loadMoreCode($state) {
        try {
          const {data: data} = await this.getZipcodes({
            search_key: this.params.zipcode_id, page: this.page_code++, limit: 20
          });
          this.zipcodes.push(...data.data);
          if (!data || data.last_page <= data.current_page) {
            $state.complete();
          } else {
            $state.loaded();
          }
        } catch (e) {
          $state.complete();
        }
      },
      ...{ insertOrUpdateBookAddress: rf.getBehaviors('UserBehavior').insertOrUpdateBookAddress },
      ...{ getCurrentUser: rf.getBehaviors('UserBehavior').getCurrentUser },
      ...rf.getBehaviors('CommonBehavior'),
    }
  }
</script>

<style scoped lang="scss">
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

  input.focus-none:focus {
    outline: none !important;
    border-color: transparent;
  }
</style>
