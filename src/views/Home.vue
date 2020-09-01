<template>
  <div class="home h-100" ref="main">
    <div class="row h-100">
      <div class="col-9">
        <youtube-media v-if="isMounted && videos.length>current" :video-id="videos[current].videoId"
                       :player-width="'100%'"
                       :player-height="height"
                       :player-vars="{ autoplay: 1 }" :mute="true">
        </youtube-media>
        <div class="w-100 video-bar scroll-horz" :style="{height:miniHeight+'px'}">
          <div class="" :style="{height:miniHeight+'px',width:(videos.length*miniWidth)+'px'}">
            <div v-for="(video,index) in videos" :key="video">
              <div class="video-bar-video" v-if="video && index!=current">
                <div class="video-bar-tool w-100" @click="current=index">
                  <i class="fas fa-chevron-up pl-1"></i>
                  <i class="fas fa-comment pl-1 ml-2" :class="{'active':index===currentChat}" @click.stop="onChatChange(index)"></i>
                  <span class="pl-3 d-inline-block">{{video.title}}</span>
                </div>
                <youtube-media v-if="isMounted" :video-id="video.videoId"
                               :player-width="miniWidth"
                               :player-height="miniHeight"
                               :player-vars="{ autoplay: 1 }" :mute="true">
                </youtube-media>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 p-0" ref="right" key="'chat'+currentChat">
        <iframe allowfullscreen="" frameborder="0" :height="height+miniHeight" :src="'https://www.youtube.com/live_chat?v='+videos[currentChat].videoId+'&embed_domain=localhost'" width="100%"></iframe><br />
      </div>
    </div>
    <div></div>
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
      height: 480,
      width: 360,
      chatHeight: 200,
      miniWidth:300,
      miniHeight:200,
      rightWidth:200,
      isMounted : false,
      current: 0,
      currentChat: 0,
      videoList: [
        {src:"https://www.youtube.com/watch?v=Ky5l9ZxsG9M",type:"youtube",title:"Nerdle CAM"},
        {src:"https://www.youtube.com/watch?v=CQJInT3-_-s",type:"youtube",title:"Sapphire CAM"},
        {src:"https://www.youtube.com/watch?v=ZCKpMjrlWfY",type:"youtube",title:"Lab CAM"},
        {src:"https://www.youtube.com/watch?v=QsfTL-Wr9LE",type:"youtube",title:"Predator CAM"},
        {src:"https://www.youtube.com/watch?v=n5ozYnVQahE",type:"youtube",title:"Sentinel CAM"}
      ]
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.height = this.$refs.main.clientHeight - this.chatHeight;
      this.width = this.$refs.main.clientWidth;
      this.rightWidth = this.$refs.right.clientWidth;
      console.log(this.rightWidth);
      this.isMounted = true;
    });
  },
  methods: {
    onChatChange(index) {
      if(index===this.currentChat) {
        this.currentChat = this.current;
      } else {
        this.currentChat = index;
      }
    }
  },
  computed: {
    videos() {
      let list = [];
      let videoList = this.videoList;
      for(let i=0;i<videoList.length;i++) {
        if(videoList[i].type==='youtube'){
          videoList[i].videoId =  getIdFromURL(videoList[i].src);
        }
        list.push(videoList[i]);
      }

      return list;
    }
  }
}

</script>

<style lang="scss">
iframe {
  border: none;
}

.video-bar {
  width: 100%;
}
.scroll-horz {
  overflow-x: auto;
  overflow-y: hidden;
}
.video-bar-tool {
  height: .8rem;
  position: absolute;
  z-index: 100;
  margin-top: -.45rem;
  color: white;
}
.video-bar-video {
  float: left;
  display: inline-block;
}

.fa-comment.active {
  color: yellow;
}
</style>
