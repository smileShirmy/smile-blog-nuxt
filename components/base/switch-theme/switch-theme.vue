<template>
  <i
    class="icon"
    :class="theme === 'light' ? 'icon-dark' : 'icon-light'"
    :style="{fontSize: size}"
    @click="switchTheme"
  ></i>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    size: {
      type: String,
      default: "30px"
    }
  },

  computed: {
    theme () {
      return this.$store.state.app.theme
    }
  },

  methods: {
    switchTheme() {
      if (this.theme === 'light') {
        this.setTheme('dark')
      } else {
        this.setTheme('light')
      }
    },

    ...mapMutations({
      setTheme: 'app/setTheme'
    })
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.icon {
  cursor: pointer;
  transition: $theme-transition;
}
</style>
