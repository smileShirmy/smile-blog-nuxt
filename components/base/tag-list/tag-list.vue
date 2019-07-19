<template>
  <section class="section-tag">
    <h5 v-if="title" class="tag-title">{{title}}</h5>
    <ul class="tag-list">
      <li class="tag-item" v-for="(tag, index) in tagList" :key="index" @click="$emit('selectTag', tag)">{{tag.name}}</li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    title: String,
    tagList: Array
  }
}
</script>

<style lang="scss" scoped>
.section-tag {
  font-weight: $font-weight-bold;
}

.tag-title {
  font-size: $title-font-size-medium;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    font-size: $title-font-size-base;
  }
}

.tag-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 -5px;

  .tag-item {
    display: inline-block;
    padding: 5px 12px;
    margin: 5px;
    color: var(--font-color-primary);
    font-size: $font-size-minimum;
    font-weight: $font-weight-bold;
    letter-spacing: 1.5px;
    border-radius: 20px;
    background: var(--tag-color);
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      color: #fff;
      background: var(--theme-active);
      transition: all .25s ease-in-out;
    }
  }
}
</style>
