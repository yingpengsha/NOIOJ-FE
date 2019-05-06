<template>
  <div class="discussArea">
    <el-input v-model="discuss.title" placeholder="请输入标题" style="margin-bottom:8px;"></el-input>
    <mavon-editor
      v-model="discuss.content"
      :toolbars="toolbars"
      :boxShadow="false"
      defaultOpen="edit"
      :subfield="false"
      :ishljs = "true"
      codeStyle='vs2015'
      class="markdown-body md"
    />

    <div class="infoBar">
      <div>{{total}} 个帖子</div>
      <el-button type="primary" size="medium" @click="onSubmit">发送</el-button>
    </div>

    <div class="item" v-for="(item,key) in list" :key="key">
      <header>
        <div class="right">
          <img :src="item.users.image || avator" width="30px" height="30px" loading="lazy"/>
          <h4>{{item.title}}</h4>
        </div>
        <div class="date">
          {{item.createAt | parseTime}}
        </div>
      </header>
      <main v-html="$options.filters.markdown(item.content)"/>
      <footer>
        <el-button type="text" @click="openDialog(item)"><svg-icon icon-class="list" /> 评论列表</el-button>
      </footer>
    </div>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="listQuery.page"
      :page-size="listQuery.limit"
      layout="prev, pager, next, jumper"
      :total="total"
      v-show="total>0"
      style="width:300px;">
    </el-pagination>

    <el-dialog
      title="评论区"
      :visible.sync="dialogVisible"
      width="45%"
      center>
      <discuss-detail ref="discussDetail" :item="item" />
    </el-dialog>
  </div>
</template>

<script>
import 'mavon-editor/dist/css/index.css';
import DiscussDetail from './discussDetail.vue';
import * as discuss from '@/api/discuss';
import * as utils from '@/utils';
import { Discuss } from '../mixin/discuss';

export default {
  name: 'DiscussArea',
  mixins: [Discuss],
  data() {
    return {
      value: '',
      listQuery: {
        limit: 15,
        page: 1,
        problemId: this.$route.params.id,
      },
      total: 0,
      item: {},
      list: [],
      discuss: {
        title: '',
        pid: this.$route.params.id,
        createAt: '',
        content: '',
      },
      dialogVisible: false,
      listLoading: true,
    };
  },
  components: {
    DiscussDetail,
  },
  methods: {
    openDialog(item) {
      this.item = item;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    onSubmit() {
      if (this.discuss.title === '') {
        this.$message('请填写标题');
      } else if (this.discuss.content === '') {
        this.$message('请填写内容');
      } else {
        this.discuss.createAt = utils.parseTime(new Date());
        discuss.create(this.discuss)
          .then((result) => {
            if (result.code === 1) {
              this.$message({
                message: '发帖成功',
                type: 'success',
              });
              this.discuss.title = '';
              this.discuss.content = '';
              this.getList();
            } else {
              this.$message({
                message: '发帖成功',
                type: 'warning',
              });
            }
          });
      }
    },
    getList() {
      this.listLoading = true;
      discuss.query(this.listQuery)
        .then((result) => {
          if (result.code === 1) {
            this.total = result.data.totalCount;
            this.list = result.data.list;
          }
          this.listLoading = false;
        });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.discussArea{
  height: calc(100vh - 120px - 40px - 40px - 15px);
  width: 100%;
  padding: 0 10px;
  overflow:scroll;
  .md{
    min-height: 150px;
    z-index: 1;
  }
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
    margin-top:10px;
    width:100%;
    padding: 5px;
    border-bottom: 1px solid $borderTwo;
    header{
      display: flex;
      justify-content: space-between;
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
      padding:5px 45px;
    }
    footer{
      padding:5px 45px;
    }
  }
}
</style>
