<template>
  <div class="tags-detail-container">
    <detail-header :name="name" :description="description" :cover="cover">
      <template v-slot:info>
        <div class="posts-number">
          <i class="icon icon-post"></i>
          <span>{{total || 0}}&nbsp;posts</span>
        </div>
      </template>
    </detail-header>
    <article class="article-list">
      <article-list :articles="articles" :loading="loading" :total="total" @loadMore="onLoadMore"></article-list>
    </article>
  </div>
</template>

<script>
import ArticleList from '@/components/layout/article-list/article-list'
import DetailHeader from '@/components/layout/detail-header/detail-header'
// import article from '@/services/models/article'
// import category from '@/services/models/category'

export default {
  components: {
    ArticleList,
    DetailHeader
  },

  data() {
    return {
      loading: false,
      categoryId: 0,
      tagId: 0,
      name: '',
      description: '',
      cover: '',
      articles: [],
      total: 0,
      page: 0,
    }
  },

   watch: {
    $route(val) {
      if (val.params.name !== 'categoryFlag') {
        return
      }
      this.page = 0
      this.total = 0
      this.tagId = 0
      this.name = ''
      this.description = ''
      this.cover = ''
      this.categoryId = val.params.id
      this.articles = []
      this.getCategory()
      this.getCategoryArticles()
    }
  },

  methods: {
    onLoadMore() {
      if (this.loading) {
        return
      }
      this.page++
      if (this.$route.params.name !== 'categoryFlag') {
        this.getTagArticles()
      } else {
        this.getCategoryArticles()
      }
    },

    async getCategoryArticles() {
      if (!this.categoryId) {
        return
      }
      try {
        this.loading = true
        const { articles, total } = await article.getArticles({
          categoryId: this.categoryId,
          page: this.page
        })
        this.articles = this.articles.concat(articles)
        this.total = total
        this.loading = false
      } catch (e) {
        this.loading = false
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async getTagArticles() {
      if (!this.tagId) {
        return
      }
      try {
        this.loading = true
        const { articles, total } = await article.getArticles({
          tagId: this.tagId,
          page: this.page
        })
        this.articles = articles
        this.total = total
        this.loading = false
      } catch (e) {
        this.loading = false
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async getCategory() {
      if (!this.categoryId) {
        return
      }
      try {
        const res = await category.getCategory(this.categoryId)
        this.name = res.name
        this.description = res.description
        this.cover = res.cover
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },

  created() {
    // 标签
    if (this.$route.params.name !== 'categoryFlag') {
      this.name = this.$route.params.name
      this.cover = 'https://resource.shirmy.me/lighthouse.jpeg'
      this.tagId = this.$route.params.id
      this.getTagArticles()
    } else {
      this.categoryId = this.$route.params.id
      this.getCategoryArticles()
      this.getCategory()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.posts-number {
  display: flex;
  align-items: center;
  margin: 0 auto;

  .icon-post {
    font-size: $title-font-size-base;
  }

  span {
    font-size: $font-size-small;
    font-weight: $font-weight-bold;
    padding-left: 5px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
}

.article-list {
  position: relative;
  margin-top: -10vh;
}
</style>
