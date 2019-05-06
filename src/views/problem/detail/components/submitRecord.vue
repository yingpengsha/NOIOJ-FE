<template>
  <div class="submitRecord">
    <div class="header">
      <div class="count">共 {{total}} 条记录</div>
      <el-button :loading="loading" icon="el-icon-refresh" circle @click="refresh"></el-button>
    </div>
    <el-table
      :data="list"
      v-loading="listLoading"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="inDate"
        label="上传时间"
        align="center">
        <template slot-scope="scope">
          {{scope.row.inDate | parseTime}}
        </template>
      </el-table-column>
      <el-table-column
        prop="result"
        label="结果"
        align="center">
        <template slot-scope="scope">
          <el-tag :type="resultList[scope.row.result].type">
            {{resultList[scope.row.result].en}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="运行时间"
        align="center">
        <template slot-scope="scope">
          {{`${scope.row.time} ms`}}
        </template>
      </el-table-column>
      <el-table-column
        prop="memory"
        label="内存消耗"
        align="center">
        <template slot-scope="scope">
          {{scope.row.memory | memoryFilter}}
        </template>
      </el-table-column>
      <el-table-column
        prop="language"
        label="语言"
        align="center">
        <template slot-scope="scope">
          {{language[scope.row.language]}}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="listQuery.page"
      :page-size="listQuery.limit"
      layout="prev, pager, next, jumper"
      :total="total"
      v-show="total > this.listQuery.limit"
      style="width:300px;">
    </el-pagination>
  </div>
</template>

<script>
import * as solution from '@/api/solution';
import * as utils from '@/utils';
import { resultList, language } from '@/utils/OJ';

export default {
  name: 'SubmitRecord',
  data() {
    return {
      total: 0,
      list: [],
      listLoading: true,
      loading: true,
      listQuery: {
        limit: 10,
        page: 1,
        problemId: this.$route.params.id,
      },
      problemId: this.$route.params.id,
      resultList,
      language,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    refresh() {
      this.loading = true;
      this.listLoading = true;
      window.setTimeout(() => {
        this.getList();
      }, 1000);
    },
    getList() {
      solution.query(this.listQuery)
        .then((result) => {
          if (result.code === 1) {
            this.total = result.data.totalCount;
            this.list = result.data.list;
          }
          this.loading = false;
          this.listLoading = false;
        });
    },
  },
  created() {
    this.getList();
  },
  filters: {
    parseTime(date) {
      return utils.parseTime(date, '{y}-{m}-{d}');
    },
    memoryFilter(memory) {
      if (memory < 1024) {
        return `${memory} KB`;
      }
      return `${(memory / 1024).toFixed(1)} MB`;
    },
  },
};
</script>

<style lang="scss" scoped>
.submitRecord{
  height: calc(100vh - 120px - 40px - 40px - 15px);
  width: 100%;
  padding: 0 10px;
  overflow:scroll;
  .header{
    display: flex;
    justify-content:space-between;
    align-items: center;
    margin: 5px 0;
    padding: 0 10px;
    .count{
      font-size: 14px;
      color:$fontTwo;
      margin-right: 10px;
    }
  }
}
</style>
