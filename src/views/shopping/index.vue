<template>
  <div id="shopping">
    <section id="bk1">
      <div class="img"/>
      <main>
        支付中心
      </main>
    </section>

    <section id="detail">
      <main v-loading="loading">
        <div style="margin:0 10px 15px 10px;">商品订单</div>
        <div class="item">
          <div class="img" :style="info.image || defaultPackage | backFilter"></div>
          <div class="intro">
            <h3 style="margin:0px;">{{info.name}}</h3>
            <p style="font-size:14px;">{{info.introduce | ellipsis}}</p>
          </div>
          <div class="price">
            {{`${info.price} 元`}}
          </div>
        </div>

        <div class="payWay">
          <div style="margin:10px 10px 15px 10px;">支付方式</div>
          <div class="wallet">
            <div style="margin:0 8px;"><svg-icon icon-class="integral" class-name="icon"/></div>
            <div style="margin-top:-12px;">
              <h2 style="margin:8px 0">我的余额</h2>
              <span style="font-size:18px;">{{money}} 元</span>
            </div>
          </div>
        </div>

        <div class="end">
          <p>应付金额：<span style="color:#F56C6C;font-size:26px;">￥{{info.price}}</span></p>
          <el-button type="danger" style="width:200px;" @click="onSubmit">立即支付</el-button>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import * as packageAPI from '@/api/package';
import * as wallet from '@/api/wallet';
import * as order from '@/api/order';
import * as utils from '@/utils';
import defaultPackage from '@/assets/package-page/default-package.jpg';

export default {
  name: 'Shopping',
  data() {
    return {
      info: {},
      money: 0,
      defaultPackage,
      loading: false,
      listSubmit: {
        packetId: 0,
        price: 0,
        createDate: null,
      },
    };
  },
  computed: {
    packetId() {
      return this.$route.params.id;
    },
  },
  methods: {
    getData() {
      packageAPI.queryById(this.packetId)
        .then((result) => {
          this.info = result.data;
        });
    },
    getWallet() {
      wallet.query()
        .then((result) => {
          this.money = result.data;
        });
    },
    onSubmit() {
      this.loading = true;
      this.listSubmit = {
        packetId: this.info.packetId,
        price: this.info.price,
        createDate: utils.parseTime(new Date()),
      };
      order.create(this.listSubmit)
        .then((result) => {
          if (result.code === 1) {
            const self = this;
            window.setTimeout(() => {
              self.$message({
                message: '购买成功！',
                type: 'success',
              });
              self.loading = false;
              window.setTimeout(() => {
                this.$router.push({ name: 'problemPackageDetail', params: { id: self.info.packetId } });
              }, 500);
            }, 2000);
          }
        });
    },
  },
  created() {
    this.getData();
    this.getWallet();
  },
  filters: {
    backFilter(val) {
      return `background:url(${val});background-position: center;background-size: cover;`;
    },
    ellipsis(value) {
      if (!value || !value.length) return '';
      if (value.length > 150) {
        return `${value.slice(0, 150)}...`;
      }
      return value;
    },
  },
};
</script>

<style lang="scss" scoped>
#shopping{
  main{
    width: 1100px;
    height: 100%;
    margin:0 auto;
    padding:30px;
  }
  #bk1{
    width:100%;
    height: 160px;
    position: relative;
    .img{
      width:100%;
      height: 160px;
      background: url('../../assets/shopping-page/cart-header-bg.jpg') repeat-x left bottom;
      position:absolute;
      top: 0;
      left: 0;
    }
    main{
      position: relative;
      padding-top: 45px;
      color:black;
      font-size: 32px;
      letter-spacing: 3px;
    }
  }

  #detail{
    width: 100%;
    position: relative;
    main{
      margin-top: -40px;
      padding: 35px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .item{
        width: 100%;
        height: 160px;
        background: $grayBack;
        padding: 20px;
        display: flex;
        .img{
          height:120px;
          width: 200px;
          border-radius: 5px;
          margin-right: 20px;
        }
        .intro{
          width: calc(100% - 220px - 120px)
        }
        .price{
          height: 100%;
          width: 120px;
          text-align: center;
          line-height: 120px;
          color:#F56C6C;
          font-size: 28px;
        }
      }

      .payWay{
        margin-top: 30px;
        padding:5px 0;
        border-top: 1px solid $borderOne;
        .wallet{
          width: 200px;
          height: 120px;
          background: $grayBack;
          border-radius: 10px;
          border: 3px solid #F56C6C;
          display: flex;
          align-items: center;
          .icon{
            color:#F56C6C;
            font-size: 70px;
          }
        }
      }

      .end{
        margin-top: 30px;
        padding:5px 0;
        border-top: 1px solid $borderOne;
        text-align: right;
        span{
          margin: 15px 0;
        }
      }
    }
  }
}
</style>
