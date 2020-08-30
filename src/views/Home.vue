<template>
  <div class="home h-100" ref="main">
    <div class="row h-100">
      <div class="col-8">
        <youtube-media v-if="isMounted && videos.length>current" :video-id="videos[current]"
                       :player-width="'100%'"
                       :player-height="height"
                       :player-vars="{ autoplay: 1 }" :mute="true">
        </youtube-media>
      </div>
      <div class="col-4 p-0" ref="right">
        <div class="w-100" v-for="(video,index) in videos" :key="video">
          <div class="right-vid-tool" v-if="video && index!=current" @click="current=index" :style="toolStyle()">
            <i class="fas fa-chevron-left pl-1"></i>
          </div>
          <youtube-media v-if="isMounted && video && index!=current" :video-id="video" class="right-vid"
                         :player-width="rightWidth-21"
                         :player-height="miniHeight()"
                         :player-vars="{ autoplay: 1 }" :mute="true">
          </youtube-media>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { getIdFromURL } from 'vue-youtube-embed'

/*
playerVars: {
  autoplay: 1,        // Auto-play the video on load
      controls: 1,        // Show pause/play buttons in player
      showinfo: 0,        // Hide the video title
      modestbranding: 1,  // Hide the Youtube Logo
      loop: 1,            // Run the video in a loop
      fs: 0,              // Hide the full screen button
      cc_load_policy: 0, // Hide closed captions
      iv_load_policy: 3,  // Hide the Video Annotations
      autohide: 0         // Hide video controls when playing
},
*/

export default {
  name: 'Home',
  components: {
  },
  data: function () {
    return {
      videoId: "",
      videos: [],
      height: 480,
      width: 360,
      rightWidth:200,
      isMounted : false,
      current: 0
    }
  },
  created() {
    let videos = this.videos;
    videos.push(getIdFromURL("https://www.youtube.com/watch?v=Ky5l9ZxsG9M"))
    videos.push(getIdFromURL("https://www.youtube.com/watch?v=CQJInT3-_-s"))
    videos.push(getIdFromURL("https://www.youtube.com/watch?v=ZCKpMjrlWfY"))
    videos.push(getIdFromURL("https://www.youtube.com/watch?v=QsfTL-Wr9LE"))
    videos.push(getIdFromURL("https://www.youtube.com/watch?v=n5ozYnVQahE"))
  },
  mounted() {
    this.$nextTick(()=>{
      this.height = this.$refs.main.clientHeight;
      this.width = this.$refs.main.clientWidth;
      this.rightWidth = this.$refs.right.clientWidth;
      console.log(this.rightWidth);
      this.isMounted = true;
    });
  },
  methods: {
    toolStyle() {
      return {height:this.miniHeight(0)+"px" };
    },
    miniHeight(ofs) {
      if(ofs===undefined) ofs=4;

      let maxHeight = this.height;
      let numVids = this.videos.length-1;
      let h= parseInt(maxHeight/numVids)-ofs;

      let h2=h;
      while(h2*numVids>maxHeight && h2>0) {
        h2--;
      }
      if(h2) h=h2;

      return h;
    }
  }
}

</script>

<style lang="scss">
.right-vid {
  margin: 0;
  padding:0;
  iframe {
    margin: 0;
    padding:0;
  }
  background-color: black;
  float: right;
}
.right-vid-tool {
  height: 100%;
  width: 20px;
  color: white;
  background-color: #000000;
  border-top:solid 1px #888;
  float: left;
}
iframe {
  border: none;
}
</style>
