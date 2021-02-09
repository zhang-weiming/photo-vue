<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" /> <br />
    <router-link tag="a" target="_blank" to="/photo">
      <el-button>新建相框</el-button>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import TitleBar from "@/components/TitleBar.vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "Home",
  components: {
    // TitleBar
  },
});
</script>

<style lang="scss">
</style>
