<template>
  <ul class="recommend-container">
    <li class="recommend-item" v-for="article in articles" :key="article.id">
      <time class="time" :datetime="article.created_date | filterTime('Y-m-d')">{{article.created_date | filterTime('Y-m-d')}}</time>
      <span class="title" @click="$emit('showRecommendDetail', article.id)">{{article.title}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.recommend-container {
  @media (max-width: 479px) {
    padding-left: 2em;
  }
}

.recommend-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 6px 0;
  font-size: 1rem;

  .time {
    margin-right: 20px;
    font-size: $font-size-medium;
  }

  .title {
    font-size: $font-size-large;
    cursor: pointer;
  }

  @media (max-width: 1023px) {
    .time {
      margin-right: 16px;
      font-size: $font-size-base;
    }

    .title {
      font-size: $font-size-medium;
    }
  }

  @media (max-width: 479px) {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 9px;
      left: -18px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--font-color-primary);
    }

    .time {
      display: none;
    }

    .title {
      font-size: $font-size-base;
    }
  }
}
</style>
