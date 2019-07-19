<template>
  <div class="not-found-container">
    <div class="code">404</div>
    <div class="desc">页面未找到 /(ㄒoㄒ)/~~</div>
    <router-link class="redirect-btn" to="/">回到首页</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-weight: $font-weight-bold;
}

.code {
  margin-top: 20px;
  font-size: $title-font-size-extra-maximum;
}

.desc {
  margin-top: 30px;
}

.redirect-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 60px;
  margin-top: 50px;
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
