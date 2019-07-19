<template>
  <div class="profile-container">
    <detail-header :name="author.name" :description="author.description">
      <template v-slot:header>
        <div class="avatar" :style="{backgroundImage: `url(${author.avatar})`}"></div>
      </template>
      <template v-slot:info>
        <div class="social-wrapper">
          <a class="social-item icon icon-mail"></a>
        </div>
      </template>
    </detail-header>
    <article class="article-list">
      <article-list :articles="articles" :loading="loading" :total="total" @loadMore="onLoadMore"></article-list>
    </article>
  </div>
</template>

<script>
import DetailHeader from "@/components/layout/detail-header/detail-header"
import ArticleList from "@/components/layout/article-list/article-list"
import { mapState } from 'vuex'

export default {
  name: 'about-detail',

  components: {
    DetailHeader,
    ArticleList
  },

  async fetch({ store, params }) {
    await store.dispatch('about/getAuthor', params.id)
    await store.dispatch('about/getArticles', {
      authorId: params.id,
      page: 0
    })
  },

  data() {
    return {
      id: null,
      page: 0
    }
  },

  computed: {
    ...mapState({
      author: state => state.about.author,
      articles: state => state.about.articles,
      total: state => state.about.total,
      loading: state => state.about.loading
    })
  },

  methods: {
    onLoadMore() {
      this.page++
      this.$store.dispatch('about/getMoreArticles', {
        authorId: this.id,
        page: this.page
      })
    }
  },

  created() {
    this.id = parseInt(this.$nuxt.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  border-radius: 26px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.social-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .social-item {
    font-size: $title-font-size-base;
    margin-right: 20px;
    transition: color 0.25s ease-in-out;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      color: var(--theme-active);
    }

    @media (max-width: 479px) {
      font-size: $title-font-size-small;
    }
  }
}

.article-list {
  position: relative;
  margin-top: -10vh;
}
</style>
