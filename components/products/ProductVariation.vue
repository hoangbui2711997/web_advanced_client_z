<template>
  <div class="field">
    <label>
      {{ type }}
    </label>
    <div class="control">
      <div class="select is-fullwidth">
        <select :value="_.get(value, 'id', '')" @change="changeVariation($event)">
          <option>Please Select</option>
          <option
            v-for="variation in variations"
            :key="variation.id"
            :value="variation.id"
          > {{ variation.name }} - ({{ variation.price }}) </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProductVariation",
    props: {
      type: {
        required: true,
        type: String,
      },
      variations: {
        required: true,
        type: Array
      },
      value: {

      },
    },
    methods: {
      changeVariation ($event) {
        this.$emit('input', this.findVariationById($event.target.value));
      },
      findVariationById (id) {
        const variation = this._.find(this.variations, (v) => v.id == id);
        if (!this._.isUndefined(variation)) {
          return variation;
        }

        return '';
      }
    }
  }
</script>

<style scoped>

</style>