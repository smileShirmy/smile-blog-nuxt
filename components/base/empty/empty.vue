<template>
  <div class="empty-container">
    <div class="desc">{{message}}</div>
    <a v-if="isBack" class="back-btn" @click="back">返回</a>
  </div>
</template>

<script>
export default {
  props: {
    isBack: {
      type: Boolean,
      default: true
    },

    message: {
      type: String,
      default: '啥也没有 /(ㄒoㄒ)/~~'
    }
  },

  methods: {
    back() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>


<style lang="scss" scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 1rem;
  font-weight: $font-weight-bold;
}

.desc {
  margin: 30px 0;
}

.back-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 60px;
  letter-spacing: .1em;
  border-radius: 30px;
  background: var(--tag-color);
  cursor: pointer;
  transition: all .1s ease-in-out;

  &:hover {
    background: var(--theme-active);
    color: #fff;
  }
}
</style>
