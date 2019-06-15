<template>
  <div id="rank">
    <section id="bk1">
      <div class="img"/>
      <main>
        🎉排行榜🎉
      </main>
    </section>

    <section id="rankList">
      <main>
        <el-card class="box-card">
          <div class="filter-container" style="margin:auto;margin-bottom:20px;">
            <el-input v-model="listQuery.nick"
              placeholder="昵称"
              style="width: 200px;margin-right:10px"
              class="filter-item"
              @keyup.enter.native="handleFilter"
            />
            <el-input
              v-model="listQuery.school"
              placeholder="学校"
              style="width: 200px;;margin-right:10px"
              class="filter-item"
              @keyup.enter.native="handleFilter"
            />
            <el-button
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="handleFilter"
            >
              搜索
            </el-button>
          </div>

          <el-table
            v-loading="loading"
            :data="list"
            style="width: 100%"
            stripe
            :default-sort="{prop:'solved',order:'descending'}"
            >
            <el-table-column
              label="排名"
              align="center"
              type="index"
              :index="indexrank"
            >
            </el-table-column>
            <el-table-column
              prop="nick"
              label="昵称"
              width="160"
              align="center">
            </el-table-column>
            <el-table-column
              prop="school"
              label="学校"
              width="200"
              align="center">
            </el-table-column>
            <el-table-column
              prop="introduce"
              label="签名"
              align="center">
            </el-table-column>
            <el-table-column
              prop="solved"
              label="积分"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="submit"
              label="提交"
              width="80"
              align="center"
              sortable>
            </el-table-column>
            <el-table-column
              label="通过率"
              width="80"
              align="center"
              prop="pass">
              <template slot-scope="scope">
                {{ scope.row.submit
                ? Math.floor(scope.row.solved / scope.row.submit * 10000)/100 + '%'
                :0 }}
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-container" style="margin-top:10px;">
            <el-pagination
              v-show="total>0"
              :current-page="listQuery.page"
              :page-size="listQuery.limit"
              :total="total"
              layout="prev, pager, next"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </el-card>
      </main>
    </section>
  </div>
</template>

<script>
import * as rank from '@/api/rank';

export default {
  name: 'rank',
  data() {
    return {
      loading: true,
      list: [],
      total: 0,
      size: 0,
      current: 0,
      listQuery: {
        nick: '',
        school: '',
        limit: 10,
        page: 1,
      },
    };
  },
  methods: {
    indexrank(index) {
      return index + 1 + (this.current - 1) * this.size;
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      rank.query(this.listQuery)
        .then((result) => {
          if (result.code === 1) {
            console.log(result);
            this.list = result.data.list;
            this.total = result.data.totalCount;
            this.current = result.data.currentPage;
            this.size = result.data.pageSize;
            this.loading = false;
          } else if (result.code === 0) {
            this.list = [];
            this.total = 0;
          }
        });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
#rank{
  main{
    width: $detailWidth;
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
      background: url('../../assets/rank-page/rank-back.jpg');
      background-position: center;
      background-size: cover;
      filter:brightness(0.5);
      position:absolute;
      top: 0;
      left: 0;
    }
    main{
      text-align: center;
      padding-top: 130px;
      font-size: 68px;
      color: white;
      letter-spacing: 20px;
      position: relative;
    }
  }
  #rankList{
    width: 100%;
    min-height: 400px;
    position: relative;
    main{
      margin-top: -120px;
      .box-card{
        text-align: center
      }
    }
  }
}
</style>
