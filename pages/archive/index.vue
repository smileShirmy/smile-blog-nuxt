<template>
  <div class="archive-container">
    <split-line :icon="'post'" :desc="`${archive.length} posts`"></split-line>
    <div class="year-wrapper" v-for="year in archive" :key="year.year">
      <div class="year-name">{{year.year}}</div>
      <dl class="month-wrapper" v-for="month in year.monthList" :key="month.month">
        <dt class="month-name">{{month.month | monthTrans}}</dt>
        <dd class="article-item" v-for="article in month.articles" :key="article.id">
          <span class="time">{{article.created_date}}</span>
          <router-link class="title" :to="'/article/' + article.id">{{article.title}}</router-link>
          <div class="avtar-wrapper">
            <i v-for="author in article.authors" :key="author.id" class="avatar" :style="{backgroundImage: `url(${author.avatar})`}"></i>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import SplitLine from '@/components/base/split-line/split-line'
import Utils from '@/services/utils/util'

const monthMap = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}

export default {
  name: 'archive-page',

  components: {
    SplitLine
  },

  head() {
    return {
      title: '归档'
    }
  },

  async fetch ({ store, params }) {
    await store.dispatch('article/getArchive')
  },

  filters: {
    monthTrans(month) {
      return monthMap[month]
    }
  },

  computed: {
    archive() {
      return this.$store.state.article.archive
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin margin {
  margin-top: .5em;
  margin-left: 2em;

  @media (max-width: 479px) {
    margin-top: .3em;
    margin-left: 0;
  }
}

.archive-container {
  @include container;
  min-height: 480px;
}

.year-wrapper {
  @include margin;

  @media (max-width: 1023px) {
    margin-left: 5px;
  }

  .year-name {
    font-size: $title-font-size-base;
    font-weight: $font-weight-bold;
  }
}

.month-wrapper {
  @include margin;

  .month-name {
    font-size: $font-size-large;
  }
}

.article-item {
  @include margin;
  display: flex;
  min-height: 30px;

  .time {
    position: relative;
    margin: 0 14px;
    white-space: nowrap;

    @media (max-width: 479px) {
      margin: 0 10px 0 0;
    }

    @media (min-width: 480px) {
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
    }
  }

  .title {
    cursor: pointer;
  }

  .avtar-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: -3px 0 0 30px;

    .avatar {
      display: inline-block;
      width: 30px;
      min-width: 30px;
      height: 30px;
      margin-left: -15px;
      border-radius: 50%;
      background-color: var(--border-color);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0;
      transform: translate(0);
      transition: all .25s ease-in-out;

      @media (max-width: 479px) {
        margin: -3px 0 0 -15px;
      }
    }
  }


  &:hover {
    .avatar {
      opacity: 1;
      transform: translateX(10px);
    }
  }
}
</style>
