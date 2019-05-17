<template>
  <div id="playPage">
    <header>
      <el-button type="text" icon="el-icon-arrow-left" class="button" @click="handleToBack"/>
      {{title}}
    </header>
    <main>
      <nav>
        <div
          v-for="(item,key) in list"
          :key="key"
        >
          <div class="title">{{`第 ${key+1} 章 `+item.title}}</div>
          <div
            v-for="subsection in item.subsectionList"
            :key="subsection.subsectionId"
            @click="handleToChangeVideo(subsection.subsectionId)"
            class="section"
          >
            <span :class="subsection.subsectionId===section.subsectionId?'focus':null">
              {{subsection.title}}
            </span>
          </div>
        </div>
      </nav>
      <div class="video">
        <video-player
          class="vjs-custom-skin"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          @ended="onPlayerEnded($event)">
        </video-player>
      </div>
    </main>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';
import * as section from '@/api/section';
import * as lesson from '@/api/lesson';

export default {
  name: 'Video',
  data() {
    return {
      section: {},
      title: null,
      list: [],
      playerOptions: {
        width: '1350',
        autoplay: false,
        language: 'cn',
        playbackRates: [1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
        }],
      },
    };
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  methods: {
    handleToChangeVideo(id) {
      if (id !== this.section.subsectionId) {
        this.getData(id);
      }
    },
    handleToBack() {
      this.$router.push({ name: 'lessonDetail', params: { id: this.section.courseId } });
    },
    getData(id) {
      section.detail(id)
        .then((result) => {
          this.section = result.data;
          this.playerOptions.sources[0].src = result.data.url;
          this.getList();
        });
    },
    getList() {
      lesson.detail(this.section.courseId)
        .then((result) => {
          this.title = result.data.title;
          this.list = result.data.chapterList;
        });
    },
    onPlayerEnded() {
      // console.log('player ended!', player)
    },
  },
  created() {
    this.getData(this.$route.params.id);
  },
  components: {
    videoPlayer,
  },
};
</script>

<style lang="scss">
#playPage{
  width:100vw;
  height: 100vh;
  background: $black;
  color: $fontThree;
  header{
    height: 60px;
    width: 100%;
    line-height: 60px;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 2px;
    border-bottom: 1px solid $fontOne;
    button{
      font-size: 24px;
      margin: 0 20px;
    }
  }
  main{
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    justify-content: flex-start;
    nav{
      height: 100%;
      width: 300px;
      border-right: 1px solid $fontOne;
      padding: 20px;
      overflow: auto;
      .title{
        font-size: 18px;
        font-weight: 300;
        margin: 10px 0;
      }
      .section{
        margin-left: 30px;
        font-size: 14px;
        &:hover{
          cursor: pointer;
        }
        .focus{
          color: $blue;
        }
      }
    }
    .video{
      width: calc(100% - 300px);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: auto;
    }
  }
}
</style>
