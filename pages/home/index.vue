<template>
  <div>
    <carousel class="carousel-container"
      :showRightArrow="starArticles.length > 1"
      :showLeftArrow="starArticles.length > 1"
      :autoplay="starArticles.length > 1"
    >
      <carousel-item v-for="article in starArticles" :key="article.id">
        <carousel-card :article="article"></carousel-card>
      </carousel-item>
    </Carousel>
    <section class="article-wrapper">
      <article-list :articles="articles" :loading="loading" :total="total" @loadMore="onLoadMore"></article-list>
    </section>
  </div>
</template>

<script>
import Carousel from '@/components/base/carousel/carousel'
import CarouselItem from '@/components/base/carousel/carousel-item'
import CarouselCard from '@/components/layout/carousel-card/carousel-card'
import ArticleList from '@/components/layout/article-list/article-list'

const defaultStar = {
  id: 0,
  title: '虚弱又赤城地拥抱世界',
  category: {
    id: 0,
    name: '惟有文字 长情陪伴'
  },
  authors: [
    {
      id: 0,
      name: '西麦'
    }
  ],
  created_date: Date.now(),
  cover: 'https://resource.shirmy.me/lighthouse.jpeg'
}

export default {
  components: {
    Carousel,
    CarouselItem,
    CarouselCard,
    ArticleList,
  },

  fetch ({ store, params }) {
    return store.dispatch('article/getArticles', {
      page: params.page || 0
    })
  },

  data() {
    return {
      loading: false,
      articles: [],
      // 默认 card
      starArticles: [],
      total: 0,
      page: 0,
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

    // async getArticles() {
      // try {
      //   this.loading = true
      //   const { articles, total } = await article.getArticles({
      //     page: this.page
      //   })
      //   this.total = total
      //   this.articles = this.articles.concat(articles)
      //   this.loading = false
      // } catch (e) {
      //   this.ArticleList = [defaultStar]
      //   this.loading = false
      //   // eslint-disable-next-line no-console
      //   console.log(e)
      // }
    // },

    async getStarArticles() {
      try {
        const res = await article.getStarArticles()
        this.starArticles = res
        this.$store.dispatch
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },

  created() {
    // this.getStarArticles()
    // this.getArticles()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.carousel-container {
  height: calc(100vh - 245px);

  @media (max-width: 1023px) {
    margin-top: -160px;
    height: 100vh;
  }

  @media (max-width: 479px) {
    margin-top: -100px;
  }
}

.article-wrapper {
  position: relative;
  width: 100%;
  margin-top: -10vh;
}
</style>
