<template>
  <div class="photo">
    <div class="close-group">
      <i class="el-icon-delete delete-btn" @click="closeWindow"></i>
    </div>
    <img
      id="photo-img"
      class="img-responsive"
      alt="Your photo"
      :src="photoPath"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "About",
  components: {},
  data: function () {
    return {
      photoPath:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      photoSize: {
        w: 300,
        h: 300,
      },
    };
  },
  beforeMount: async function () {
    this.setWindowSize();
  },
  // mounted () {
  //   const that = this;
  //   window.onresize = function() {
  //     const ratio = that.getPhotoSizeRatio();
  //     const currRatio = window.innerWidth / window.innerHeight;
  //     if (currRatio == ratio) return;
  //     else if (currRatio < ratio) {
  //       // width changed, need to update height
  //       const newHeight = window.innerWidth / ratio;
  //       window.resizeTo(window.innerWidth, newHeight);
  //     }
  //     else {
  //       const newWidth = window.innerHeight * ratio;
  //       window.resizeTo(newWidth, window.innerHeight);
  //     }
  //   };
  // },
  methods: {
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
    closeWindow: function() {
      window.close();
    },
    getPhotoSizeRatio () {
      return this.photoSize.w / this.photoSize.h;
    },
  },
});
</script>

<style lang="scss">
#titlebar-btn-group {
  display: none;
}

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
  max-width: 100%;
}
</style>
