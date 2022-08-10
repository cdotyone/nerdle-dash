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
      <div class="col-2 filters">
        <div>Location
          <div>
            <select v-model="location">
              <option value="">All</option>
              <option value="BC">Boca Chica</option>
              <option value="port">Port Canaveral</option>
              <option value="MC">McGregor</option>
            </select>
          </div>
        </div>
        <div>Channel
          <div>
            <select v-model="channel">
              <option value="">All</option>
              <option value="LP">LabPadre</option>
              <option value="NSF">NSF</option>
            </select>
          </div>
        </div>
        <div class="multi">Multi
          <div>
            <select v-model="multi">
              <option value="">All</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-10">
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
      multi:'yes',
      location:null,
      channel:null,
      videoList: [
        {src:"https://www.youtube.com/watch?v=Lwc1owVFs94",type:"youtube",title:"LP Nerdle",vq:2160, channel:"LP", multi:'no', location:"BC"},
        {src:"https://www.youtube.com/watch?v=w2BQKCnPkIc",type:"youtube",title:"LP MultiPlex",vq:1080, channel:"LP", multi:'yes', location:"BC"},
        {src:"https://www.youtube.com/watch?v=K0iL6oIHU3U",type:"youtube",title:"LP Sapphire",vq:1080, channel:"LP", multi:'no', location:"BC"},
        {src:"https://www.youtube.com/watch?v=wStCstJ-MSQ",type:"youtube",title:"LP Lab",vq:1080, channel:"LP", multi:'no', location:"BC"},
        {src:"https://www.youtube.com/watch?v=PXpGvSn_T6Y",type:"youtube",title:"LP Raptor Roost",vq:1080, channel:"LP", multi:'no', location:"BC"},
        {src:"https://www.youtube.com/watch?v=EdygcWV2vT8",type:"youtube",title:"LP Rover CAM",vq:1080, channel:"LP", multi:'no', location:"BC"},
        {src:"https://www.youtube.com/watch?v=nbBeoReu12E",type:"youtube",title:"LP Rover CAM 2.0",vq:1080, channel:"LP", multi:'no', location:"BC"},
        {src:"https://www.youtube.com/watch?v=REWZGK1LHw8",type:"youtube",title:"LP Sentinel",vq:1080, channel:"LP", multi:'no', location:"BC"},
        {src:"https://www.youtube.com/watch?v=fCuEFJtNbYg",type:"youtube",title:"LP Port Canaveral",vq:1080, channel:"LP", multi:'no', location:"port"},
        {src:"https://www.youtube.com/watch?v=mhJRzQsLZGg",type:"youtube",title:"NSF StarBase",vq:1080, channel:"NSF", multi:'yes', location:"BC"},
        {src:"https://www.youtube.com/watch?v=gnt2wZBg89g",type:"youtube",title:"NSF FleetCAM",vq:1080, channel:"NSF", multi:'no', location:"port"},
        {src:"https://www.youtube.com/watch?v=cOmmvhDQ2HM",type:"youtube",title:"MSF McGregor",vq:1080, channel:"NSF", multi:'yes', location:"MC"}
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
        let show= true;
        if(this.multi!==null && videoList[i].multi!==this.multi) show=false;
        if(this.location!==null && videoList[i].location!==this.location) show=false;
        if(this.channel!==null && videoList[i].channel!==this.channel) show=false;
        if(show) list.push(videoList[i]);
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

.filters {
  color: white;
  border-right: #888 1px solid;
  padding-right: .2rem;
  padding-left: 1.1rem;
  //width: 116px;
  font-size: 10px;
  select {
    width: 100%;
  }
}


</style>
