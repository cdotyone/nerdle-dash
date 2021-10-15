<template>
  <div class="home h-100" ref="main">
    <div class="row h-100">
      <div class="col-9" ref="mainVideo">
        <youtube-media v-if="isMounted && videos.length>current" :video-id="videos[current].videoId"
                       :player-width="'100%'"
                       :player-height="height"
                       :player-vars="{ autoplay: 1, origin:origin, enablejsapi:1, showinfo:1 }" :mute="true">
        </youtube-media>
      </div>
      <div class="col-3 p-0" ref="right" key="'chat'+currentChat">
        <iframe allowfullscreen="" frameborder="0" :height="height" :src="getChatUrl(videos[currentChat].videoId)" width="100%"></iframe><br />
      </div>
    </div>
    <div class="row video-bar-row">
      <div class="col">
      <div class="w-100 video-bar" :style="{height:miniHeight+'px'}">
        <div class="" :style="{height:miniHeight+'px',width:(videos.length*miniWidth)+'px'}">
          <div v-for="(video,index) in videos" :key="video.videoId">
            <div class="video-bar-video" v-if="video && index!=current">
              <div class="video-bar-tool w-100" @click="current=index">
                <i class="fas fa-chevron-up pl-1"></i>
                <i class="fas fa-comment pl-1 ml-2" :class="{'active':index===currentChat}" @click.stop="onChatChange(index)"></i>
                <span class="pl-3 d-inline-block">{{video.title}}</span>
              </div>
              <div class="video-mini">
              <youtube-media v-if="isMounted" :video-id="video.videoId"
                             :player-width="miniWidth"
                             :player-height="miniHeight"
                             :player-vars="{ autoplay: 1, origin:origin, enablejsapi:1 }" :mute="true">
              </youtube-media>
              </div>
            </div>
          </div>
        </div>
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
      height: 480,
      width: 360,
      chatHeight: 200,
      miniWidth:280,
      miniHeight:180,
      rightWidth:200,
      isMounted : false,
      current: 0,
      currentChat: 0,
      videoList: [
        {src:"https://www.youtube.com/watch?v=_HZCh2eGWEI",type:"youtube",title:"Nerdle",vq:2160},
        {src:"https://www.youtube.com/watch?v=7OKb9Rc-etw",type:"youtube",title:"Sapphire",vq:1080},
        {src:"https://www.youtube.com/watch?v=HGb28t5TWtc",type:"youtube",title:"Lab",vq:1080},
        {src:"https://www.youtube.com/watch?v=E-EFNn2seTo",type:"youtube",title:"Predator",vq:1080},
        {src:"https://www.youtube.com/watch?v=zPkIZYw5O98",type:"youtube",title:"Sentinel",vq:1080},
        {src:"https://www.youtube.com/watch?v=k6fGQZD0K98",type:"youtube",title:"Booster",vq:1080},
        {src:"https://www.youtube.com/watch?v=5HpgJJ1FwTc",type:"youtube",title:"Rover",vq:1080},
        {src:"https://www.youtube.com/watch?v=BELcufzEOZ0",type:"youtube",title:"Port Canaveral",vq:1080}
      ]
    }
  },
  mounted() {

    setInterval(()=>{
      if(!this.videoList[this.current].vq) return;
      let iframe = this.$refs.mainVideo.getElementsByTagName("IFRAME");
      if(iframe.length>0) {
        iframe=iframe[0];
        if(iframe.src.indexOf('&vq=')>0) {
          return;
        } else {
          iframe.src=iframe.src+'&vq='+this.videoList[this.current].vq;
        }

      }
    },1000);

    this.$nextTick(()=>{
      this.height = this.$refs.main.clientHeight - this.chatHeight;
      this.width = this.$refs.main.clientWidth;
      this.rightWidth = this.$refs.right.clientWidth;
      console.log(this.rightWidth);
      this.isMounted = true;
    });

    //https://www.youtube.com/live_stats?v=Ky5l9ZxsG9M
  },
  methods: {
    onChatChange(index) {
      if(index===this.currentChat) {
        this.currentChat = this.current;
      } else {
        this.currentChat = index;
      }
    },
    getChatUrl(id) {
      return window.location.protocol + '//www.youtube.com/live_chat?v='+id+'&embed_domain=' + this.host;
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
    },
    host() {
      return window.location.host.split(':')[0];
    },
    origin() {
      return window.location.href;
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
  height: 1rem;
  color: white;
}
.video-bar-video {
  float: left;
  display: inline-block;
}

.video-bar-row {
  position: absolute;
  bottom:0;
  overflow-x: hidden;
  overflow-y: auto;
}

.fa-comment.active {
  color: yellow;
}

.video-mini {
  padding-top: .2rem;
}
</style>
