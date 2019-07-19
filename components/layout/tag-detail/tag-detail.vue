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
import { mapState } from 'vuex'

export default {
  components: {
    ArticleList,
    DetailHeader
  },

  props: {
    id: Number,

    type: {
      type: String,
      default: 'tag'
    },

    name: {
      type: String,
      deault: '',
    },

    description: {
      type: String,
      default: ''
    },

    cover: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      page: 0,
    }
  },

  computed: {
    ...mapState({
      loading: state => state.tag.loading,
      articles: state => state.tag.articles,
      total: state => state.tag.total
    })
  },

  methods: {
    onLoadMore() {
      this.page++
      const params = {
        page: this.page,
        [this.type === 'tag' ? 'tagId' : 'categoryId']: this.id
      }
      this.$store.dispatch('tag/getMoreArticles', params)
    },
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
