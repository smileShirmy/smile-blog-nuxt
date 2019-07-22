<template>
  <div class="split-wrapper">
    <i v-if="icon" class="icon" :class="'icon-' + icon"></i>
    <span v-if="desc" class="desc">{{desc}}</span>
    <div class="split"></div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    desc: String,
  }
}
</script>


<style lang="scss">
@import '@/assets/scss/variables.scss';

.split-wrapper {
  display: flex;
  align-items: center;

  .icon {
    font-size: $font-size-icon-rem;
  }

  .desc {
    font-size: 13px;
    font-weight: 700;
    padding: 0 10px 0 5px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .split {
    flex: 1;
    height: 1px;
    background-color: var(--border-color);
  }
}
</style>
