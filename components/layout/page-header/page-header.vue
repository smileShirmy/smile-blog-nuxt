<template>
  <header class="container" :class="homeMobileClass">
    <div class="header-logo">
      <switch-theme :size="'30px'"></switch-theme>
      <i class="logo">Smile</i>
    </div>
    <nav class="nav-wrapper">
      <desktop-nav class="desktop-nav" :navList="navList"></desktop-nav>
      <mobile-nav :navList="navList"></mobile-nav>
    </nav>
  </header>
</template>

<script>
import DesktopNav from "@/components/base/nav/desktop-nav"
import MobileNav from "@/components/base/nav/mobile-nav"
import SwitchTheme from '@/components/base/switch-theme/switch-theme'

const navList = [
  {
    link: "/home",
    name: "首页"
  },
  {
    link: "/archive",
    name: "归档"
  },
  {
    link: "/tags",
    name: "标签"
  },
  {
    link: "/about",
    name: "关于"
  },
  {
    link: "/messages",
    name: "留言墙"
  }
];

export default {
  components: {
    DesktopNav,
    MobileNav,
    SwitchTheme
  },

  data() {
    return {
      navList
    };
  },

  computed: {
    homeMobileClass() {
      return this.$route.path.includes("home") ? "home-mobile-class" : "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixin.scss";

.container {
  @include container;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 160px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: $index-top;
  box-sizing: border-box;

  @media (max-width: 479px) {
    height: 100px;
  }
}

.header-logo {
  .logo {
    margin-left: 10px;
    font-size: $title-font-size-medium;
    transition: $theme-transition;
  }
}

@media (max-width: 1023px) {
  .home-mobile-class {

    .header-logo {
      color: #fff;
    }
  }
}

@media (max-width: 1023px) {
  .desktop-nav {
    display: none;
  }
}
</style>
