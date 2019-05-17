<template>
  <div id="problem">
    <section id="problemList">
      <el-card class="box-card" v-loading="listLoading">
        <div class="searchBar">
          <el-input
            placeholder="请输入题目名"
            @keyup.enter.native="handleFilter"
            @change="handleFilter"
            v-model="listQuery.title"
            style="width:250px;"
            size="medium"
            clearable>
          </el-input>
          <el-select
            v-model="listQuery.orderBy"
            size="medium"
            placeholder="请选择排序方式"
            @change="handleFilter"
            clearable
            style="width:180px;margin:5px 10px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button size="medium">
            <svg-icon icon-class="random" class-name="randomIcon"></svg-icon>
            随机选题
          </el-button>
        </div>
        <div class="selectBar">
          <div v-for="item in selectList" :key="item.key" class="select">
            <div class="title">{{item.title}}</div>
            <div class="options">
              <div
                v-for="option in item.options"
                :key="option.name"
                class="option"
                @click="handleClassFilter(item.key,option.value)"
                :style="listQuery[item.key] === option.value
                  ? 'color:#0681FF;font-weight:bold'
                  : null"
              >
                {{option.name}}
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" v-loading="searchLoading">
        <div class="options">
          <el-select
            v-for="option in classList"
            :key="option.value"
            v-model="selectTags[option.value]"
            @change="handleTagsFilter"
            filterable
            clearable
            :placeholder="option.name"
            class="optionSelect"
          >
            <el-option
              v-for="item in option.tags"
              :key="item.tagId"
              :label="item.name"
              :value="item.tagId">
            </el-option>
          </el-select>
        </div>
      </el-card>

      <el-card class="box-card" v-loading="listLoading">
        <el-table
          :data="list"
          @row-click="handleToProblemDetail"
          stripe
          style="width: 100%">
          <el-table-column
            align="center"
            width="40">
            <template slot-scope="scope">
              <svg-icon v-if="scope.row.result === 4" icon-class="finished" class-name="finished" />
            </template>
          </el-table-column>
          <el-table-column
            prop="difficulty"
            label="难度"
            align="center"
            width="100">
            <template slot-scope="scope">
              <div :style="difficulty[scope.row.difficulty] | tagStyle" class="tag">
                {{difficulty[scope.row.difficulty]}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="题目">
          </el-table-column>
          <el-table-column
            label="通过率"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-progress
                :text-inside="true"
                :stroke-width="22"
                :percentage="scope.row.submit
                  ? parseInt(scope.row.accepted/scope.row.submit*100)
                  : 0"
                status="success">
              </el-progress>
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
    </section>

    <section id="userStatus">
      <user-card />
      <el-card class="box-card" :body-style="{ padding: '0px' }" v-if="isLogin">
        <div class="title">算法统计</div>
        <div class="detail">
          <algorithm-statistic :max="algorithmMax" :chartData="classStatistic.slice(0,5)"/>
        </div>
      </el-card>
      <el-card class="box-card" :body-style="{ padding: '0px' }" v-if="isLogin">
        <div class="title">数据结构统计</div>
        <div class="detail">
          <data-struct-statistic :max="structMax" :chartData="classStatistic.slice(5,9)"/>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
import { problemList } from './mixins/problemList';
import { mapGetters } from 'vuex';
import * as problem from '@/api/problem';
import * as tag from '@/api/tag';
import UserCard from './components/userCard.vue';
import * as statistic from '@/api/infoStatistic';
import AlgorithmStatistic from '@/views/user/infoTabs/components/algorithmStatistic.vue';
import DataStructStatistic from '@/views/user/infoTabs/components/dataStructStatistic.vue';

export default {
  name: 'Problem',
  mixins: [problemList],
  data() {
    return {
      listLoading: true,
      searchLoading: true,
      total: 0,
      listQuery: {
        limit: 30,
        page: 1,
        tags: null,
        difficulty: null,
        type: null,
        title: null,
        isFree: null,
        orderBy: null,
      },
      list: [],
      structMax: 0,
      algorithmMax: 0,
      classStatistic: new Array(8).fill(1),
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
    ]),
  },
  components: {
    UserCard,
    AlgorithmStatistic,
    DataStructStatistic,
  },
  methods: {
    getClassStatistic() {
      let structMax = 0;
      let algorithmMax = 0;
      statistic.classList()
        .then((result) => {
          result.data.forEach((element) => {
            this.classStatistic[element.classId] += element.count;
            algorithmMax = element.classId < 5 && element.count > algorithmMax ? element.count : algorithmMax;
            structMax = element.classId > 5 && element.count > structMax ? element.count : structMax;
          });
          console.log(this.classStatistic.slice(0, 5), this.classStatistic.slice(5, 9));
          this.structMax = structMax;
          this.algorithmMax = algorithmMax;
        });
    },
    getList() {
      this.listLoading = true;
      problem.query(this.listQuery)
        .then((result) => {
          if (result.code) {
            this.list = result.data.list;
            this.total = result.data.totalCount;
          } else {
            this.list = [];
            this.total = 0;
          }
          this.listLoading = false;
        });
    },
    getTags() {
      this.SearchLoading = true;
      tag.query()
        .then((result) => {
          this.filterTagsData(result.data);
        });
    },
    filterTagsData(tags) {
      for (let i = 0; i < 8; i += 1) {
        this.classList[i].tags = tags.filter(element => element.classId === i);
      }
      this.searchLoading = false;
    },
  },
  created() {
    this.getTags();
    this.getList();
    if (this.isLogin) {
      this.getClassStatistic();
    }
  },
};
</script>

<style lang="scss" scoped>
#problem{
  width: $mainWidth;
  padding: 20px;
  min-height: 500px;
  margin: auto;
  display: flex;
  justify-content:space-between;
  .box-card{
    margin-bottom: 10px;
  }
  #problemList{
    width: calc(100% - 380px);
    min-height: 300px;
    .finished{
      width: 20px;
      height: 20px;
      margin-left: 5px;
      padding-top:3px;
    }
    .line{
      width:100%;
      height:1px;
      background:black;
    }
    .select{
      margin-top: 10px;
      min-height: 21px;
      display: flex;
      align-items: flex-start;
      .title{
        width:100px;
        color: $blue;
        border-left: 2px solid $blue;
        padding-left: 8px;
        font-size: 15px;
        &::after{
          content: '：'
        }
      }
    }
    .options{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .option{
        width: calc(100% / 6 - 14px);
        margin: 0 7px;
        margin-bottom: 5px;
        // border-bottom: 1px solid $fontTwo;
        font-size: 15px;
        line-height: 21px;
        text-align: center;
        color: $fontTwo;
        transition: all .3s;
        &:hover{
          cursor: pointer;
          color: $blue;
        }
      }
      .optionSelect{
        width: calc(100% / 5 - 14px);
        height: 40px;
        margin: 3px 7px;
        // border-bottom: 1px solid $fontTwo;
        font-size: 15px;
        text-align: center;
        color: $fontTwo;
        transition: all .3s;
        &:hover{
          cursor: pointer;
          color: $blue;
        }
      }
    }
    .tag{
      color: white;
      width: 80px;
      height: 25px;
      line-height: 25px;
      margin: auto;
      border-radius: 5px;
    }
  }

  #userStatus{
    width: 360px;
    min-height: 300px;
    .title{
      background: $black;
      height: 50px;
      color:white;
      line-height: 50px;
      text-align: center;
    }
    .detail{
      padding: 15px;
    }
  }
}
</style>
