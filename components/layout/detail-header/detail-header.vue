<template>
  <header class="detail-header" :style="{backgroundImage: `url(${cover})`}" :class="cover ? 'is-cover' : ''">
    <div class="detail-content">
      <slot name="header"></slot>
      <h1 class="title">{{name}}</h1>
      <slot name="info"></slot>
      <p v-if="description" class="desc">{{description}}</p>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    cover: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixin.scss';

.is-cover {
  color: #fff;
  @include cover;
}

.detail-header {
  width: calc(100% - 85px - 85px);
  margin: 0 auto;
  padding: 5vh 5% 15vh;
  font-weight: $font-weight-bold;
  border-radius: 5px;
  background: no-repeat center center;
  background-size: cover;
  box-sizing: border-box;

  @media (max-width: 1399px) {
    width: 100%;
    border-radius: 0;
  }

  .detail-content {
    @include headerPadding;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
      margin: 5px 0 25px;
      font-size: $title-font-size-maximum;
      text-align: center;

      @media (max-width: 1023px) {
        font-size: $title-font-size-extra-large;
      }

      @media (max-width: 479px) {
        margin: 3px 0 15px;
        font-size: $title-font-size-medium;
      }
    }

    .desc {
      max-width: 750px;
      margin: 3vh auto 0;
      padding: 0 50px;
      font-size: $title-font-size-base;
      text-align: center;

      @media (max-width: 479px) {
        padding: 0 15px;
        font-size: $font-size-medium;
      }
    }
  }
}
</style>
