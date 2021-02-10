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
  name: "About",
  components: {},
  data: function () {
    return {
      photoPath: "",
      // photoPath: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      photoSize: {
        w: 300,
        h: 300,
      },
      loading: true,
    };
  },
  beforeMount: async function () {
    // this.setWindowSize();
    this.setWindowSizeDefault();
  },
  mounted () {
    this.pickPhoto();
    // const that = this;
    // window.onresize = function() {
    //   const ratio = that.getPhotoSizeRatio();
    //   const currRatio = window.innerWidth / window.innerHeight;
    //   if (currRatio == ratio) return;
    //   else if (currRatio < ratio) {
    //     // width changed, need to update height
    //     const newHeight = window.innerWidth / ratio;
    //     window.resizeTo(window.innerWidth, newHeight);
    //   }
    //   else {
    //     const newWidth = window.innerHeight * ratio;
    //     window.resizeTo(newWidth, window.innerHeight);
    //   }
    // };
  },
  methods: {
    closeWindow: function() {
      window.close();
    },
    getPhotoSizeRatio () {
      return this.photoSize.w / this.photoSize.h;
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
    setWindowSizeDefault () {
      window.resizeTo(600, 400);
    },
    setWindowSize: async function () {
      const that = this;
      const img = new Image();
      img.src = this.photoPath;
      img.onload = function () {
        that.setPhotoSize(img.width, img.height);
        
        const ratio = that.getPhotoSizeRatio();
        let width = 600;
        let height = width / ratio;
        if (height > 600) {
          height = 600;
          width = height * ratio;
        }

        window.resizeTo(width, height);
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
