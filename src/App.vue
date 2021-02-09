<template>
  <div id="app">
    <title-bar />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link tag="a" target="_blank" to="/about">
        <el-button>About</el-button>
      </router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TitleBar from "@/components/TitleBar.vue";

export default Vue.extend({
  components: {
    TitleBar
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
