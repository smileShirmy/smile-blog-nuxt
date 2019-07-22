<template>
  <div class="article-list-container">
    <div class="article-list-wrapper">
      <ul v-if="articles.length">
        <li class="article-item" v-for="article in articles" :key="article.id">
          <article class="article-wrapper">
            <a class="category">{{article.category.name}}</a>
            <h3 class="title">
              <router-link :to="'/article/' + article.id" class="article-link">
                {{article.title}}<span class="hover-dot"></span>
              </router-link>
            </h3>
            <p class="content">{{article.description}}</p>
            <footer class="footer">
              <div class="author-wrapper">
                <div class="avatar-wrapper">
                  <i class="avatar" v-for="author in article.authors" :key="author.id" :style="{backgroundImage: `url(${author.avatar})`}"></i>
                </div>
                <ul class="name-wrapper">
                  <li class="name" v-for="author in article.authors" :key="author.id">{{author.name}}</li>
                </ul>
              </div>
              <div class="info-wrapper">
                <i class="icon icon-eye"></i>
                <span class="count">{{article.views}}</span>
                <i class="icon icon-reply"></i>
                <span class="count">{{article.comment_count}}</span>
                <i class="icon icon-heart"></i>
                <span class="count">{{article.like}}</span>
                <time class="time" :datetime="article.created_date | filterTime('Y-m-d')">{{article.created_date | filterTime('Y-m-d')}}</time>
              </div>
            </footer>
          </article>
          <div v-if="article.cover" class="split"></div>
          <img v-if="article.cover" class="article-image" :src="article.cover"/>
        </li>
      </ul>
      <div v-if="isLoadMore" class="load-more" @click="$emit('loadMore')"></div>
      <loading v-if="loading"></loading>
      <empty v-if="!loading && !articles.length"></empty>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-list',

  props: {
    articles: {
      type: Array,
      default: () => []
    },

    loading: {
      type: Boolean,
      default: false
    },

    total: {
      type: Number,
      default: 0
    }
  },

  computed: {
    isLoadMore() {
      if (this.articles.length && !this.loading) {
        return this.total > this.articles.length
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-list-container {
  @include container;
  box-sizing: border-box;
  margin: 0 auto;
}

.article-list-wrapper {
  box-sizing: border-box;
  padding: 50px 120px;
  background-color: #fff;
  border-radius: 5px;
  background-color: var(--app-background-color-light);
  // box-shadow: 0 2px 24px 5px rgba(0, 0, 0, .05);
  transition: $theme-transition;

  @media (max-width: 1399px) {
    padding: 40px 90px;
  }

  @media (max-width: 1199px) {
    padding: 40px 70px;
  }

  @media (max-width: 1023px) {
    padding: 30px;
  }

  @media (max-width: 479px) {
    padding: 10px;
    box-shadow: none;
    background: var(--app-background-color);
  }

  .article-item {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin-bottom: 60px;
    text-align: left;

    @media (max-width: 1023px) {
      flex-direction: column-reverse;
      right: auto;
      width: 100%;
      margin-bottom: 40px;
      text-align: left;

      &:nth-child(2n) {
        flex-direction: column-reverse;
        left: auto;
        text-align: left;
      }
    }

    @media (max-width: 767px) {
      margin-bottom: 20px;
    }
  }
}

.article-wrapper {
  width: 100%;
  color: var(--font-color-article);

  .category {
    cursor: pointer;
    color: var(--font-color-light);
  }

  .title {
    margin: 10px 0 0;
    font-weight: $font-weight-bold;
    color: var(--font-color-dark);

    @media (max-width: 767px) {
      font-size: $title-font-size-small;
    }

    .article-link {
      position: relative;
      cursor: pointer;

      &:hover .hover-dot {
        background-color: var(--theme-active);
      }

      .hover-dot {
        position: absolute;
        top: 0;
        right: -10px;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        transition: all 0.25s ease;
      }
    }

  }

  .content {
    margin: 1.5em 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;

    @media (max-width: 479px) {
      font-size: $font-size-base;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $font-size-small;

    .author-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .avatar-wrapper {
        display: flex;
        justify-content: flex-start;

        .avatar {
          display: inline-block;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;

          @media (max-width: 479px) {
            width: 26px;
            height: 26px;
          }

          &:not(:first-child) {
            margin-left: -17px;
          }
        }
      }

      .name-wrapper {
        display: flex;
        justify-content: flex-start;
        flex-wrap: nowrap;

        .name {
          margin-left: 12px;
          white-space: nowrap;

          &:not(:first-child) {
            margin-left: 0;
          }

          &:not(:first-child)::before {
            content: ', '
          }
        }
      }
    }

    .info-wrapper {
      display: flex;
      align-items: center;
      font-size: $font-size-small;

      >i {
        display: inline-block;
        margin-right: 2px;
      }

      >span {
        margin-right: 10px;
        line-height: 1;
      }

      >time {
        line-height: 1;
      }

      .count {
        white-space: nowrap;
      }

      .time {
        white-space: nowrap;
      }
    }
  }
}

.split {
  width: 4vw;
  min-width: 4vw;
}

.article-image {
  width: 340px;
  min-width: 340px;
  border-radius: 4px;
  background-size: cover;
  // box-shadow: 0 5px 26px -3px rgba(0, 0, 0, .12);
  cursor: pointer;

  @media (max-width: 1023px) {
    width: 100%;
    min-width: auto;
    margin-bottom: 30px;
    box-shadow: none;
  }

  @media (max-width: 767px) {
    margin-bottom: 20px;
  }
}

.load-more {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 8px solid #dcdfe7;
  border-radius: 50%;
  transition: all .25s ease-in-out;
  cursor: pointer;

  @media (max-width: 479px) {
    width: 30px;
    height: 30px;
    border-width: 5px;
  }

  &:hover {
    border-color: var(--theme-active);
    background-color: var(--theme-active);
    transform: scale(.65);
  }
}
</style>
