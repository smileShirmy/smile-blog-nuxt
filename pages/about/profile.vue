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
import DetailHeader from "@/components/layout/detail-header/detail-header";
import ArticleList from "@/components/layout/article-list/article-list";
// import author from '@/services/models/author'
// import article from '@/services/models/article'

export default {
  components: {
    DetailHeader,
    ArticleList
  },

  data() {
    return {
      total: 0,
      page: 0,
      authorId: 0,
      author: {},
      articles: [],
      loading: false
    };
  },

  watch: {
    $route(val) {
      if (!this.authorId) {
        return
      }
      this.page = 0
      this.total = 0
      this.author = {}
      this.articles = []
      this.authorId = val.params.id
      this.getAuthorDetail()
      this.getArticles()
    }
  },

  methods: {
    onLoadMore() {
      if (this.loading) {
        return
      }
      this.page++
      this.getArticles()
    },

    async getArticles() {
      if (!this.authorId) {
        return
      }
      try {
        this.loading = true
        const { articles, total } = await article.getArticles({
          authorId: this.authorId,
          page: this.page
        })
        this.total = total
        this.articles = this.articles.concat(articles)
        this.loading = false
      } catch (e) {
        this.loading = false
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async getAuthorDetail() {
      if (!this.authorId) {
        return
      }
      try {
        const res = await author.getAuthorDetail(this.authorId)
        this.author = res
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },

  created() {
    this.authorId = this.$route.params.id
    this.getAuthorDetail()
  },

  mounted() {
    this.getArticles()
  }
};
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
