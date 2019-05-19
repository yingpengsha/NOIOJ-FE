<template>
  <div id="packageDetail">
    <section id="bk1">
      <div class="img"/>
      <main>
        <p style="font-size:48px;letter-spacing:8px;">{{info.name}}</p>
      </main>
    </section>

    <section id="intro" v-loading="shoppingLoading">
      <main>
        <div>
          <div class="img" :style="info.image || defaultPackage | backFilter"/>
          <el-button
            type="danger"
            round
            style="width:160px;margin-top:20px;"
            @click="handlePackageDelete">
            删除
          </el-button>
        </div>
        <div class="detail">
          <div class="edit">
            <h1 style="margin-top:0px;">{{info.name}}</h1>
            <el-button style="padding-top:0px;" type="text" @click="handleToUpdatePackage">编辑概要</el-button>
          </div>
          <p style="font-size:14px;">{{info.introduce}}</p>
        </div>
      </main>
    </section>

    <section id="detail">
      <main>
        <el-table
          :data="list"
          :show-header="false"
          style="width: 100%">
          <el-table-column
            type="index"
            align="center"
            width="40px">
          </el-table-column>
          <el-table-column
            prop="title"
            width="250">
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              {{difficulty[scope.row.difficulty]}}
            </template>
          </el-table-column>
          <el-table-column
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button type="info" size="mini" @click="handleUpdate(scope.row.problemId)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.problemId)">删除
            </el-button>
          </template>
        </el-table-column>
        </el-table>
        <div class="add">
          <el-button
            class="filter-item"
            style="margin-left: 1px;"
            type="success"
            icon="el-icon-edit"
            @click="handleCreate">
          增加</el-button>
        </div>
      </main>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as packageAPI from '@/api/package';
import * as problem from '@/api/problem';
import defaultPackage from '@/assets/package-page/default-package.jpg';

export default {
  name: 'PackageDetail',
  data() {
    return {
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
    handleToUpdatePackage() {
      this.$router.push({ name: 'packageUpdate', query: { name: this.info.name, id: this.packageId } });
    },
    handlePackageDelete() {
      this.$confirm('此操作将永久删除该题包, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        packageAPI.deleteById(this.packageId)
          .then((result) => {
            if (result.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.$router.push({ name: 'problemPackage' });
            }
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        problem.deleteById(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
            this.getList();
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    handleCreate() {
      this.$router.push({ name: 'problemAdd', query: { name: this.info.name, id: this.packageId } });
    },
    handleUpdate(id) {
      this.$router.push({ name: 'problemUpdate', query: { name: this.info.name, id } });
    },
  },
  created() {
    this.getInfo();
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
        width: calc(100% - 200px);
        .edit{
          display: flex;
          justify-content: space-between
        }
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
      .add{
        margin-top: 20px;
      }
    }
  }

}
</style>
