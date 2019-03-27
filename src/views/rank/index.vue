<template>
  <div id="rank">
    <section id="bk1">
      <div class="title">
        🎉排行榜🎉
      </div>
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
            :data="tableData"
            style="width: 100%"
            stripe
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <el-table-column
              type="index"
              label="排名"
              align="center"
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
              header-align="center">
            </el-table-column>
            <el-table-column
              prop="solved"
              label="通过"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="submit"
              label="提交"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              label="通过率"
              width="80"
              align="center">
              <template slot-scope="scope">
                {{ Math.floor(scope.row.solved / scope.row.submit * 10000)/100 + '%' }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'rank',
  data() {
    return {
      loading: false,
      list: null,
      total: null,
      listQuery: {
        nick: '',
        school: '',
        limit: 50,
        page: 1,
        orderBy: 'solved',
        desc: 'desc',
      },
      tableData: [{
        nick: '王小虎',
        school: 'XXXX中学',
        introduce: '这个人很懒。这个人很懒。这个人很懒。这个人很懒。',
        solved: 378,
        submit: 388,
      }, {
        nick: '王小虎',
        school: 'XXXX中学',
        introduce: '这个人很懒。这个人很懒。这个人很懒。这个人很懒。这个人很懒。这个人很懒。这个人很懒。这个人很懒。',
        solved: 378,
        submit: 388,
      }, {
        nick: '王小虎',
        school: 'XXXX中学',
        introduce: '这个人很懒。这个人很懒。这个人很懒。这个人很懒。',
        solved: 378,
        submit: 388,
      }, {
        nick: '王小虎',
        school: 'XXXX中学',
        introduce: '这个人很懒。这个人很懒。这个人很懒。这个人很懒。',
        solved: 378,
        submit: 388,
      }],

    };
  },
  methods: {
    formatter(row) {
      return row.address;
    },
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
    background: $blue;
    .title{
      text-align: center;
      padding-top: 130px;
      font-size: 68px;
      color: white;
      letter-spacing: 20px
    }
  }
  #rankList{
    width: 100%;
    min-height: 400px;
    position: relative;
    main{
      margin-top: -120px;
      .box-card{
        min-height: 1000px;
      }
    }
  }
}
</style>
