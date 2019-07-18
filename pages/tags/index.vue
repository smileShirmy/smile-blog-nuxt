<template>
  <div class="tag-container">
    <split-line :icon="'cloud'" :desc="'标签'"></split-line>
    <div class="tag-wrapper">
      <tag-list :tagList="tags" @selectTag="onSelectTag"></tag-list>
    </div>
    <split-line :icon="'tag'" :desc="'分类'"></split-line>
    <ul class="category-list">
      <nuxt-link tag="li" class="category-item" v-for="category in categories" :key="category.id" :to="`/tags/${category.id}/categoryFlag`">
        <div class="category-wrapper">
          <div class="category-image" :style="{backgroundImage: `url(${category.cover})`}"></div>
          <h2 class="title" :class="{center: !category.description}">{{category.name}}</h2>
          <p v-if="category.description" class="desc">{{category.description}}</p>
        </div>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import SplitLine from '@/components/base/split-line/split-line'
import TagList from '@/components/base/tag-list/tag-list'
import { mapState } from 'vuex'

export default {
  components: {
    SplitLine,
    TagList
  },

  async fetch ({ store, params }) {
    await store.dispatch('tag/getTagAndCategories')
  },

  computed: {
    ...mapState({
      categories: state => state.tag.categories,
      tags: state => state.tag.tags
    })
  },

  methods: {
    onSelectTag(tag) {
      this.$router.push({
        path: `/tags/${tag.id}/${tag.name}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixin.scss';

.tag-container {
  @include container;
}

.tag-wrapper {
  margin: 10px 0;
}

.category-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 -15px;

  .category-item {
    flex: 1 auto;
    position: relative;
    margin: 15px;
    border-radius: 20px;
    overflow: hidden;
    transition: all .25s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
    }

    @media (max-width: 470px) {
      margin: 15px 15px 0;
    }
  }
}

.category-wrapper {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: #fff;

  .category-image {
    @include cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;
  }

  .title {
    padding: 15px 30px;
    font-size: $title-font-size-medium;
    font-weight: $font-weight-bold;
  }

  .center {
    text-align: center;
  }

  .desc {
    box-sizing: border-box;
    max-width: 450px;
    padding: 0 60px 3vh 30px;
  }
}
</style>
