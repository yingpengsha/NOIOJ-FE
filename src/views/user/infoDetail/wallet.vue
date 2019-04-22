<template>
  <div id="wallet">
    <header>
      <div class="balance">余额：<span class="money">{{money}}</span> 元</div>
      <el-button type="primary" style="width:100px;" @click="handleToOpenDialog">充值</el-button>
      <el-dialog
        title="充值"
        :visible.sync="dialogVisible"
        width="30%"
        center>
        <div style="width:200px;margin:auto;">
          <el-input-number size="medium" :step="10" :min="0" :precision="2" v-model="number" />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMoney">确 定</el-button>
        </span>
      </el-dialog>
    </header>
  </div>
</template>

<script>
import * as wallet from '@/api/wallet';
import * as order from '@/api/order';

export default {
  name: 'walletLog',
  data() {
    return {
      money: 0,
      dialogVisible: false,
      number: 0,
    };
  },
  methods: {
    getData() {
      wallet.query()
        .then((result) => {
          this.money = result.data;
        });
    },
    getList() {
      order.query({ page: 1 })
        .then((result) => {
          console.log(result);
        });
    },
    handleToOpenDialog() {
      this.number = 0;
      this.dialogVisible = true;
    },
    addMoney() {
      wallet.add(this.number)
        .then((result) => {
          if (result.code === 1) {
            this.$message({
              message: '充值成功！',
              type: 'success',
            });
          }
          this.getData();
        });
      this.dialogVisible = false;
    },
  },
  created() {
    this.getData();
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
#wallet{
  header{
    display: flex;
    justify-content:space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid $borderTwo;
    .balance{
      font-size: 17px;
      .money{
        font-size: 34px;
        color:$blue;
      }
    }
  }
}
</style>
