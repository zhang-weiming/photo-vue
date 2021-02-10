<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" /> <br />
    <!-- <router-link tag="a" target="_blank" to="/photo">
      <el-button>新建相框</el-button>
    </router-link> -->
    <el-button @click="createPhoto">新建相框</el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ipcRenderer } from "electron";
// import TitleBar from "@/components/TitleBar.vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "Home",
  components: {
    // TitleBar
  },
  methods: {
    createPhoto () {
      ipcRenderer.send('load-photo-window', null);
    },
  },
});
</script>

<style lang="scss">
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
