<template>
  <div id="titlebar-btn-group">
    <el-button id="btn-close" v-on:click="close" size="medium" type="text" icon="el-icon-close"></el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "TitleBar",
  methods: {
    close: function() {
      window.close();
    },
  }
});
</script>

<style lang="scss">
#titlebar-btn-group {
  width: 100%;
  // height: 50px;
  background: green;
  // position  : absolute;
  top: 0px;
  right: 0px;
  left: 0px;
}
</style>
