<template>
  <div class="detail">
    <header>
      <div class="right">
        <img :src="item.users.image || avator" width="50px" height="50px" loading="lazy"/>
        <h2>{{item.title}}</h2>
      </div>
      <div class="date">
        {{item.createAt | parseTime}}
      </div>
    </header>
    <main v-html="$options.filters.markdown(item.content)"/>
    <footer v-loading="loading">
      <mavon-editor
        v-model="reply.content"
        :toolbars="toolbars"
        :boxShadow="false"
        defaultOpen="edit"
        :subfield="false"
        :ishljs = "true"
        codeStyle='vs2015'
        class="markdown-body md"
      />

      <div class="infoBar">
        <div>{{total}} 条回复</div>
        <el-button type="primary" size="medium" @click="onSubmit">评论</el-button>
      </div>

      <div class="item" v-for="(item,key) in list" :key="key">
        <div class="title">
          <div class="right">
            <img :src="item.users.image || avator" width="25px" height="25px" loading="lazy"/>
            <p>{{item.users.nick}}</p>
          </div>
          <div class="date">
            {{item.createAt | parseTime}}
          </div>
        </div>
        <div class="content" v-html="$options.filters.markdown(item.content)"/>
      </div>
    </footer>
  </div>
</template>

<script>
import * as discuss from '@/api/discuss';
import { Discuss } from '../mixin/discuss';
import * as utils from '@/utils';

export default {
  name: 'DiscussDetail',
  mixins: [Discuss],
  props: {
    item: Object,
  },
  data() {
    return {
      total: 0,
      list: [],
      loading: true,
      reply: {
        content: '',
        createAt: '',
        replyId: '',
        topicId: '',
      },
    };
  },
  watch: {
    item() {
      this.getList();
    },
  },
  methods: {
    onSubmit() {
      if (this.reply.content === '') {
        this.$message('请填写内容');
      } else {
        this.reply.createAt = utils.parseTime(new Date());
        this.reply.replyId = null;
        this.reply.topicId = this.item.tid;
        discuss.reply(this.reply)
          .then((result) => {
            if (result.code === 1) {
              this.$message({
                message: '评论成功',
                type: 'success',
              });
              this.reply.content = '';
              this.getList();
            } else {
              this.$message({
                message: '评论失败',
                type: 'warning',
              });
            }
          });
      }
    },
    getList() {
      this.loading = true;
      discuss.queryById(this.item.tid)
        .then((result) => {
          if (result.code === 1) {
            this.total = result.data.length;
            this.list = result.data;
          } else {
            this.total = 0;
            this.list = [];
          }
          this.loading = false;
        });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.md{
  min-height: 150px;
  z-index: 1;
}
.detail{
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right{
      display: flex;
      align-items: center;
      img{
        border-radius: 50%;
        margin-right: 15px;
      }
      h4{
        margin:0;
      }
    }
    .date{
      line-height:30px;
      font-size:14px;
      color:$fontTwo;
    }
  }
  main{
    padding:5px 65px;
  }
  footer{
    width: calc(100% - 40px);
    background: $grayBack;
    margin:20px 20px 0 20px;
    padding:10px;
    .infoBar{
      display:flex;
      justify-content:space-between;
      align-items: center;
      padding: 8px 0;
      color: $fontTwo;
      font-size: 14px;
      border-bottom: 1px solid $borderTwo;
    }
    .item{
      .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right{
          display: flex;
          align-items: center;
          img{
            border-radius: 50%;
            margin-right: 15px;
          }
          h4{
            margin:0;
          }
        }
        .date{
          line-height:30px;
          font-size:14px;
          color:$fontTwo;
        }
      }
      .content{
        padding: 0px 40px 10px 40px;
        border-bottom: 1px solid $borderTwo;
      }
    }
  }
}
</style>
