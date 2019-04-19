<template>
  <div id="userInfo">
    <main>
      <div class="nav">
        <el-card class="avator" :body-style="{ padding: '0px' }">
          <img
            :src="avator || defaultAvator"
            width="250px"
            height="250px"
          >
          <div style="padding: 15px;">
            <el-button class="button" @click="handleToOpenAvator()" plain>修改头像</el-button>
            <img-upload
              field="file"
              @srcFileSet="srcFileSet"
              @crop-upload-success="cropUploadSuccess"
              @crop-success="onSubmit"
              v-model="show"
              :width="300"
              :height="300"
              :url="`${API_ROOT}/users/upload`"
              :headers="headers"
              img-format="png">
            </img-upload>
          </div>
        </el-card>
        <el-card class="menu" :body-style="{ padding: '0px' }">
          <div style="padding: 15px;">
            <router-link
              tag="div"
              :class="focusItem === item.name ? ['item','focusItem'] : 'item' "
              :to="item.route"
              v-for="(item,key) in menuList"
              :key="key"
              @click.native="handleToChangeTitle(item.name)"
            >
              <svg-icon :icon-class="item.icon" class="icon" />
              {{item.name}}
            </router-link>
          </div>
        </el-card>
      </div>

      <div class="detail">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{focusItem}}</span>
          </div>
          <div class="info">
            <router-view></router-view>
          </div>
        </el-card>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImgUpload from 'vue-image-crop-upload/upload-2.vue';
import defaultAvator from '@/assets/public/avator.png';
import { getToken } from '@/utils/auth';
import { API_ROOT } from '@/utils/request';

export default {
  name: 'UserInfo',
  data() {
    return {
      show: false,
      API_ROOT,
      defaultAvator,
      menuList: [
        { name: '个人档案', route: '/user/info/basic', icon: 'person' },
        { name: '钱包管理', route: '/user/info/wallet', icon: 'integral' },
        { name: '提交记录', route: '/user/info/submitLog', icon: 'submit' },
      ],
      headers: {
        'X-Token': getToken(),
      },
    };
  },
  components: {
    ImgUpload,
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
    focusItem() {
      return this.$route.meta.title;
    },
  },
  methods: {
    handleToChangeTitle(name) {
      this.focusItem = name;
    },
    handleToOpenAvator() {
      this.show = true;
    },
    cropUploadSuccess() {
      this.$store.commit('SET_AVATOR', null);
      this.$router.go(0);
    },
    onSubmit(imageDataUrl, field) {
      console.log(imageDataUrl, field);
    },
    srcFileSet(fileName, fileType, fileSize) {
      console.log(fileName, fileType, fileSize);
    },
  },
};
</script>

<style lang="scss" scoped>
#userInfo{
  width: 100%;
  main{
    width: $detailWidth;
    height: 100%;
    margin:0 auto;
    padding:30px;
    display: flex;
    justify-content: space-between;
    .nav{
      width: 250px;
      .avator{
        .button{
          width:100%;
        }
      }
      .menu{
        margin-top: 20px;
        .item{
          width:100%;
          height: 40px;
          line-height: 40px;
          margin: 5px 0px;
          font-size: 15px;
          text-align: center;
          border-radius: 5px;
          transition: all .3s  cubic-bezier(0.75, 0.25, 0.25, 0.75);
          .icon{
            display: inline;
            margin-right: 10px;
          }
          &:hover{
            cursor: pointer;
          }
        }
        .focusItem{
          background: $blue;
          color: white;
        }
      }
    }
    .detail{
      width: calc(100% - 250px - 20px);
      .info{
        min-height: 100px;
      }
    }
  }
}
</style>
