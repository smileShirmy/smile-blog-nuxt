<template>
  <div
    class="carousel-container"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div :style="{ height: height }" class="carousel-wrapper">
      <button
        v-show="showLeftArrow"
        class="carousel-nav prev-nav"
        @click="throttledArrowClick(activeIndex - 1)"
      ></button>
      <button
        v-show="showRightArrow"
        class="carousel-nav next-nav"
        @click="throttledArrowClick(activeIndex + 1)"
      ></button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { throttle } from "throttle-debounce";
import { on, off } from "@/services/utils/dom";

export default {
  name: "Carousel",

  props: {
    showLeftArrow: {
      type: Boolean,
      default: true
    },
    showRightArrow: {
      type: Boolean,
      default: true
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    autoplay: {
      type: Boolean,
      defualt: false
    },
    autoplaySpeed: {
      type: Number,
      default: 3000
    },
    loop: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      timer: null,
      items: [],
      activeIndex: -1
    };
  },

  computed: {},

  watch: {
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },

    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      this.$emit("change", val, oldVal);
    },

    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },

    loop() {
      this.setActiveItem(this.activeIndex);
    }
  },

  methods: {
    handleMouseEnter() {
      this.pauseTimer();
    },

    handleMouseLeave() {
      this.startTimer();
    },

    updateItems() {
      this.items = this.$children.filter(
        child => child.$options.name === "CarouselItem"
      );
    },

    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },

    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.autoplaySpeed);
    },

    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    setActiveItem(index) {
      let length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
    },

    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    }
  },

  created() {
    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index);
    });
  },

  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      on(window, "resize", this.resetItemPosition);
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },

  beforeDestroy() {
    off(window, "resize", this.resetItemPosition);
    this.pauseTimer();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.caoursel-container {
  position: relative;
  width: 100%;
  position: relative;
}

.carousel-wrapper {
  position: relative;
  display: block;
  height: 100%;
  min-height: 1px;
  overflow: hidden;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  margin-top: -15px;
  padding: 12px;
  border: solid #dcdfe7;
  background: transparent;
  cursor: pointer;
  transition: all .2s ease;
  transform: rotate(-45deg);
  outline: none;
  z-index: $index-normal;

  &:hover {
    padding: 8px;
    border-color: var(--theme-active);
  }

  @media (max-width: 1023px) {
    top: calc(50% - 5vh);
  }

  @media (max-width: 479px) {
    display: none;
  }
}

.prev-nav {
  left: 40px;
  border-width: 8px 0 0 8px;
}

.next-nav {
  right: 40px;
  border-width: 0 8px 8px 0;

  @media (max-width: 479px) {
    opacity: 0;
  }
}
</style>
