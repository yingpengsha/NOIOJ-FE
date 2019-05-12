<template>
  <div id="ladderRank">
    <header>
      <div
        v-for="(item,key) in levelList"
        :key="key"
        @click="handleToChangeRank(item.value)"
        :class="item.value === levelId ? 'focus' : null"
      >
        {{item.name}}
      </div>
    </header>

    <main>
      <el-card>
        <el-table
          :data="list"
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            type="index"
            label="排行"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="nick"
            label="名称"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="school"
            label="学校"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="levelId"
            align="center"
            label="段位">
            <template slot-scope="scope">
              {{levelList[scope.row.levelId-1].name}}{{5-parseInt((scope.row.acChallengeNum-(scope.row.levelId-1)*16)/4,0)}}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </main>
  </div>
</template>

<script>
import * as ladder from '@/api/ladder';

export default {
  name: 'LadderRank',
  data() {
    return {
      levelList: [
        { name: '青铜', value: 1 },
        { name: '白银', value: 2 },
        { name: '黄金', value: 3 },
        { name: '铂金', value: 4 },
        { name: '钻石', value: 5 },
      ],
      levelId: 1,
      list: [],
      loading: true,
    };
  },
  methods: {
    handleToChangeRank(id) {
      this.levelId = id;
      this.getList();
    },
    getList() {
      this.loading = true;
      ladder.rank(this.levelId)
        .then((result) => {
          if (result.data) {
            this.list = result.data.list;
          } else {
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
#ladderRank{
  width: $detailWidth;
  margin:auto;
  header{
    display: flex;
    justify-content: center;
    div{
      margin:20px;
      padding:5px 0;
      font-size:18px;
      font-weight: 300;
      letter-spacing: 3px;
      width: 130px;
      text-align: center;
      border:1px solid $blue;
      border-radius: 5px;
      transition: all .3s;
      &:hover{
        cursor: pointer;
        background: $blue;
        color:white;
      }
    }
    .focus{
      background: $blue;
      color:white;
    }
  }
  main{
    width: 800px;
    margin:auto;
  }
}
</style>
