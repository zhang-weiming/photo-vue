<template>
  <div class="photo">
    <div class="loading-icon-group" v-if="loading">
      <i class="el-icon-picture-outline"></i>
    </div>
    <div class="close-group">
      <i class="el-icon-delete delete-btn" @click="closeWindow"></i>
    </div>
    <img
      id="photo-img"
      class="img-responsive"
      :src="photoPath"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { remote } from "electron";
const dialog = remote.dialog;

export default Vue.extend({
  name: "Photo",
  components: {},
  data: function () {
    return {
      photoPath: "",
      // photoPath: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      photoSize: {
        w: 300,
        h: 300,
      },
      photoSizeRatio: 1.0,
      loading: true,
    };
  },
  mounted () {
    this.pickPhoto();
    this.setWindowSize();
    this.setResizeEvent();
  },
  methods: {
    closeWindow: function() {
      window.close();
    },
    setPhotoSizeRatio (w: number, h: number) {
      this.photoSizeRatio = w / h;
    },
    currentWindow() {
      return remote.getCurrentWindow();
    },
    pickPhoto: async function() {
      const result = dialog.showOpenDialogSync(remote.getCurrentWindow(), {
        properties: ["openFile"],
        filters: [
            { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }
        ]
      });
      if (null == result || 0 == result.length)
        this.closeWindow();
      if (typeof result === "object") {
        const imgPath = result[0].replace(/\\/g,"/");
        this.photoPath = "local-resource://" + imgPath;
        this.loading = false;
      }
    },
    setResizeEvent() {
      const that = this;
      remote.getCurrentWindow().on("will-resize", function(event, newSize) {
        event.preventDefault();
        remote.getCurrentWindow().setSize(newSize.width, Math.round(newSize.width / that.photoSizeRatio));
      });
    },
    setWindowSize: async function () {
      const that = this;
      const img = new Image();
      img.src = this.photoPath;
      img.onload = async function () {
        that.setPhotoSize(img.width, img.height);
        that.setPhotoSizeRatio(img.width, img.height);
        
        let width = 400;
        let height = Math.round(width / that.photoSizeRatio);
        if (height > 400) {
          height = 400;
          width = Math.round(height * that.photoSizeRatio);
        }

        remote.getCurrentWindow().setSize(width, height);
      };
    },
    setPhotoSize: function (w: number, h: number) {
      this.photoSize.w = w;
      this.photoSize.h = h;
    },
  },
});
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.close-group {
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  width: 100%;
  height: 45px;
  text-align: center;
}

.close-group:hover {
  background: hsla(0, 0%, 100%, 0.1);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);

  .delete-btn {
    display: inline-block !important;
    // margin-top: 10px;
  }
}

.delete-btn {
  display: none !important;
  margin-top: 10px;
  font-size: 25px;
  color: brown;
}

.img-responsive {
  display: inline-block;
  height: auto;
  width: 100%;
}

.loading-icon-group {
  position: absolute;
  width: 100%;
  height: 400px;
  text-align: center;
  font-size: 50px;
  color: #8aba87;
  padding-top: 175px;
}
</style>
