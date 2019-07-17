<template>
  <transition name="fade">
    <div class="dialog" v-show="dialogVisible">
      <div class="close" @click="close">
        <i class="icon icon-close"></i>
      </div>
      <div class="dialog-body" v-click-outside="close">
        <slot></slot>
        <loading v-show="loading"></loading>
        <transition name="fade">
          <img v-if="imgSrc" v-show="!loading" :src="imgSrc">
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import ClickOutside from '@/services/directives/click-outside'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },

    imgSrc: {
      type: String,
      default: ''
    },

    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tmp: {
        overflow: ''
      }
    }
  },

  directives: {
    ClickOutside
  },

  computed: {
    dialogVisible() {
      if (this.visible) {
        this.lock()
      } else {
        this.unlock()
      }
      return this.visible
    }
  },

  methods: {
    lock() {
      this.tmp.overflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    },

    unlock() {
      document.body.style.overflow = this.tmp.overflow
    },

    close() {
      this.unlock()
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/animation.scss';

.dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $index-popper;
  background-color: var(--code-background);
  overflow: hidden;
}

.close {
  position: fixed;
  top: 40px;
  right: 40px;

  @media (max-width: 1023px) {
    top: 22px;
    right: 35px;
  }

  .icon-close {
    font-size: $title-font-size-large;
    transition: $theme-transition;
    cursor: pointer;
    
    &:hover {
      color: var(--theme-active);
    }

    @media (max-width: 1023px) {
      font-size: $title-font-size-medium;
    }
  }
}
</style>
