<template>
  <div id="app" class="app-container">
    <page-header></page-header>
    <main class="view">
      <transition name="fade-transform"
                  mode="out-in">
        <nuxt />
      </transition>
    </main>
    <page-footer></page-footer>
    <transition name="search-slide">
      <page-search v-if="isShowSearch"></page-search>
    </transition>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import PageHeader from '@/components/layout/page-header/page-header'
import PageFooter from '@/components/layout/page-footer/page-footer'
import PageSearch from '@/components/layout/page-search/page-search'
import ScrollTop from '@/components/layout/scroll-top/scroll-top'

export default {
  components: {
    PageHeader,
    PageFooter,
    PageSearch,
    ScrollTop
  },

  computed: {
    isShowSearch() {
      const is = this.$store.state.app.isShowSearch
      if (process.client) {
        document.documentElement.style.overflowY = is ? 'hidden' : 'visible'
      }
      return is
    }
  },

  methods: {
    ...mapMutations({
      setTheme: 'app/setTheme'
    })
  },

  mounted() {
    const theme = window.localStorage.getItem('THEME')
    this.setTheme(theme || 'light')
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/animation.scss";

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.view {
  flex: 1;
}
</style>

