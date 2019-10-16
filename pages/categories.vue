<template>
  <div>
    <category-nav :links="links" />
    <nuxt-child :defVal="_.chain(links).first().get('slug', '').value() "></nuxt-child>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: { CategoryNav: () => import('../components/categories/CategoryNav') },
    async asyncData ({ app, redirect, params }) {
      const { data } = await app.$axios.$get('api/categories');
      let category = data.find((c) => c.slug == params.slug);
      if (!category) {
        redirect({ name: 'categories-slug', params: { slug: data[0].slug || ''  }});
      }
      return {
        links: data
      }
    },
    data () {
      return {
        links: [],
      }
    },
    // async created () {
    //   const { data } = await this.get('/categories');
    //   this.links = data;
    // }
  }
</script>

<style scoped>

</style>