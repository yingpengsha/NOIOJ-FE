<template>
  <div id="questionsPackage">
    <div class="title">
      <p>欢迎来到</p>
      <p>信奥训练题包广场</p>
    </div>
    <div class="search">
      <el-input
        style="width:250px"
        v-model="listQuery.title"
        placeholder="关键词搜索"
        @keyup.enter.native="handleFilter">
      </el-input>
      <el-button type="success" style="margin-left:10px;" @click="handleFilter">搜索</el-button>
      <el-button type="primary">上传题包</el-button>
    </div>

    <div class="packageList" v-loading="packageLoading">
      <div class="package"
        v-for="(item,key) in packageList"
        :key="key"
        @click="hanldToPackageDetail(item.packetId)">
        <div class="back">
          <div class="img" :style="item.image || defaultPackage | backFilter"/>
          <div class="author">{{item.author}}</div>
          <div class="name">{{item.name}}</div>
        </div>
        <div class="items">
          <div class="item">
            <p>{{item.count}}</p>
            <p>题目</p>
          </div>
          <div class="item">
            <p>{{item.num}}</p>
            <p>购买人数</p>
          </div>
          <div class="item">
            <p>{{item.price || '免费' }}</p>
            <p>价格</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as packageAPI from '@/api/package';
import defaultPackage from '@/assets/package-page/default-package.jpg';

export default {
  name: 'QuestionsPackage',
  data() {
    return {
      listQuery: {
        limit: 20,
        page: 1,
        title: null,
        originClass: null,
        userId: null,
        status: 1,
      },
      defaultPackage,
      packageLoading: false,
      packageList: [],
    };
  },
  methods: {
    hanldToPackageDetail(id) {
      this.$router.push({ name: 'problemPackageDetail', params: { id } });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getData();
    },
    getData() {
      this.packageLoading = true;
      packageAPI.query(this.listQuery)
        .then((result) => {
          this.packageList = result.data.list;
          this.packageLoading = false;
        });
    },
  },
  created() {
    this.getData();
  },
  filters: {
    backFilter(val) {
      return `background:url(${val});background-position: center;background-size: cover;`;
    },
  },
};
</script>

<style lang="scss" scoped>
#questionsPackage{
  width: $mainWidth;
  margin: auto;
  min-height: 500px;
  padding:40px;
  .title{
    p{
      margin:8px;
    }
    p:nth-of-type(1){
      color: $fontTwo;
    }
    p:nth-of-type(2){
      font-size: 30px;
    }
  }
  .search{
    margin:20px 0;
  }
  .packageList{
    display: flex;
    flex-wrap: wrap;
    .package{
      width: calc(100% / 5 - 20px);
      height: 250px;
      margin: 10px;
      background: white;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, .12);
      border-radius: 20px;
      transition: all .3s;
      .back{
        width:100%;
        height: 180px;
        padding: 15px;
        border-radius: 16px 16px 0 0;
        position:relative;
        .img{
          width:100%;
          height: 180px;
          filter:brightness(0.4);
          border-radius: 16px 16px 0 0;
          position:absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }
        .author{
          color:$borderThree;
          position: relative;
        }
        .name{
          color: white;
          font-size: 25px;
          position: relative;
        }
      }
      .items{
        width: 100%;
        display: flex;
        .item{
          width: calc(100% / 3);
          text-align: center;
          p:nth-of-type(1){
            font-size: 18px;
            margin: 10px 0 0 0;
            height: 25px;
            line-height: 25px;
          }
          p:nth-of-type(2){
            font-size: 12px;
            margin: 5px 0 0 0;
            color:$fontThree;
          }
        }
      }
      &:hover{
        cursor: pointer;
        box-shadow: 6px 8px 10px rgba(0, 0, 0, .12);
      }
    }
  }
}
</style>
