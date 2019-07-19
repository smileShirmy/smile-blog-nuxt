<template>
  <tag-detail :id="id" type="category" :name="name" :cover="cover" :description="description"></tag-detail>
</template>

<script>
import tagDetail from '@/components/layout/tag-detail/tag-detail'
import { mapState } from 'vuex'

export default {
  name: 'category-detail',

  components: {
    tagDetail
  },

  async fetch({ store, params }) {
    await store.dispatch('tag/getCategory', params.id)
    await store.dispatch('tag/getArticles', {
      categoryId: params.id,
      page: 0
    })
  },

  data() {
    return {
      id: null,
      name: '',
      cover: '',
      description: ''
    }
  },

  created() {
    const category = this.$store.state.tag.category
    this.name = category.name
    this.cover = category.cover
    this.description = category.description
    this.id = parseInt(this.$nuxt.$route.params.id)
  }
}
</script>
