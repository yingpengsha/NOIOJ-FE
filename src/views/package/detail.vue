<template>
  <div id="packageDetail">
    <section id="bk1">
      <div class="img"/>
      <main>
        <p style="font-size:48px;letter-spacing:8px;">{{info.name}}</p>
        <p style="font-size:20px;margin-top:10px;">{{info.author}}</p>
      </main>
    </section>

    <section id="intro" v-loading="shoppingLoading">
      <main>
        <div>
          <div class="img" :style="info.image || defaultPackage | backFilter"/>
          <el-button type="success" round style="width:160px;margin-top:20px;" v-if="isHaveToBuy" @click="handleToStudy">开始做题</el-button>
          <el-button
            type="success"
            round
            style="width:160px;margin-top:20px;"
            v-else-if="info.price === 0"
            @click="handleToGetFreePacket">
            获取免费题包
          </el-button>
          <el-button type="primary" round style="width:160px;margin-top:20px;" v-else @click="handleToShopping">
            {{`立即购买 ${info.price} 元`}}
          </el-button>
        </div>
        <div class="detail">
          <h1 style="margin-top:0px;">{{info.name}}</h1>
          <p style="font-size:14px;">{{info.introduce}}</p>
        </div>
      </main>
    </section>

    <section id="detail">
      <main>
        <el-table
          :data="list"
          :show-header="false"
          style="width: 100%"
          @row-click="handleToProblemDetail">
          <el-table-column
            type="index"
            align="center"
            width="40px">
          </el-table-column>
          <el-table-column
            prop="title">
          </el-table-column>
          <el-table-column
            align="center"
            width="60px">
            <template slot-scope="scope">
              {{difficulty[scope.row.difficulty]}}
            </template>
          </el-table-column>
        </el-table>
      </main>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as packageAPI from '@/api/package';
import * as order from '@/api/order';
import * as problem from '@/api/problem';
import defaultPackage from '@/assets/package-page/default-package.jpg';
import * as utils from '@/utils';

export default {
  name: 'PackageDetail',
  data() {
    return {
      isHaveToBuy: false,
      infoLoading: true,
      listLoading: true,
      shoppingLoading: false,
      info: {},
      authorInfo: {},
      list: [],
      defaultPackage,
      difficulty: ['入门', '简单', '中等', '困难', '超难'],
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
    ]),
    packageId() {
      return this.$route.params.id;
    },
  },
  methods: {
    getInfo() {
      packageAPI.queryById(this.packageId)
        .then((result) => {
          this.info = result.data;
          this.getList();
        });
    },
    getList() {
      problem.query({ packetId: this.info.packetId })
        .then((result) => {
          this.list = result.data.list;
        });
    },
    getIsHaveToBuy() {
      packageAPI.isHaveToBuy(this.packageId)
        .then((result) => {
          if (result.code === 1) {
            this.isHaveToBuy = true;
          }
        });
    },
    handleToGetFreePacket() {
      this.shoppingLoading = true;
      const self = this;
      order.create({ packetId: this.info.packetId, price: 0, createDate: utils.parseTime(new Date()) })
        .then((result) => {
          if (result.code === 1) {
            window.setTimeout(() => {
              self.$message({
                message: '获取成功！',
                type: 'success',
              });
              this.shoppingLoading = false;
              this.getIsHaveToBuy();
            }, 2000);
          }
        })
        .catch(() => {
          this.shoppingLoading = false;
        });
    },
    handleToProblemDetail(row) {
      this.$router.push({ name: 'problemDetail', params: { id: row.problemId } });
    },
    handleToStudy() {
      this.$router.push({ name: 'problemDetail', params: { id: this.list[0].problemId } });
    },
    handleToShopping() {
      this.$router.push({ name: 'Shopping', params: { id: this.info.packetId } });
    },
  },
  created() {
    this.getInfo();
    if (this.isLogin) {
      this.getIsHaveToBuy();
    }
  },
  filters: {
    backFilter(val) {
      return `background:url(${val});background-position: center;background-size: cover;`;
    },
  },
};
</script>

<style lang="scss" scoped>
#packageDetail{
  main{
    width: 1100px;
    height: 100%;
    margin:0 auto;
    padding:30px;
  }
  #bk1{
    width:100%;
    height: 400px;
    position: relative;
    .img{
      width:100%;
      height: 400px;
      background: url('../../assets/package-page/package-detail-back.jpg');
      background-position: center;
      background-size: cover;
      filter:brightness(0.6);
      position:absolute;
      top: 0;
      left: 0;
    }
    main{
      position: relative;
      padding-top: 120px;
      p{
        margin: 0px;
        text-align: center;
        color: white;
      }
    }
  }

  #intro{
    width: 100%;
    position: relative;
    main{
      margin-top: -120px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      .img{
        width:160px;
        height:160px;
        border-radius: 5px;
        border:1px solid black;
        margin-right: 20px;
      }
      .price{
        margin: 10px 0;
        text-align:center;
        margin-right:20px;
        font-size: 20px;
      }
      .detail{
        width: calc(100% - 200px)
      }
    }
  }

  #detail{
    width: 100%;
    padding: 50px 0px;
    position: relative;
    main{
      min-height: 500px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
