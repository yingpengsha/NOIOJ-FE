<template>
  <div id="questions">
    <section id="questionsList">
      <el-card class="box-card">
        <div class="searchBar">
          <el-input
            placeholder="请输入题目名"
            v-model="listQuery.title"
            style="width:250px;"
            size="medium"
            clearable>
          </el-input>
          <el-select v-model="value" size="medium" placeholder="请选择排序方式" style="margin:5px 10px;">
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
              <div v-for="option in item.options" :key="option.value" class="option">
                {{option.name}}
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card" v-loading="listLoading">
        <el-table
          :data="list"
          stripe
          style="width: 100%">
          <el-table-column
            prop="difficulty"
            label="难度"
            align="center"
            width="120">
            <template slot-scope="scope">
              <div :style="scope.row.difficulty | tagStyle" class="tag">
                {{scope.row.difficulty}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="题目">
          </el-table-column>
          <el-table-column
            prop="rote"
            label="通过率"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-progress
                :text-inside="true"
                :stroke-width="22"
                :percentage="scope.row.rote*100"
                status="success">
              </el-progress>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </section>

    <section id="userStatus">
      <el-card class="rankCard" :body-style="{ padding: '0px' }">
        <div class="cardHead">
          我
        </div>
        <div class="cardMain">
          <img :src="avator" width="180px" height="180px" />
          <div class="rank">
            <div>
              <p class="title">AC排名</p>
              <p class="detail">3981</p>
            </div>
            <div>
              <p class="title">天梯段位</p>
              <p class="detail">青铜一</p>
            </div>
          </div>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { questionsList } from './mixins/questionsList';

export default {
  name: 'Questions',
  mixins: [questionsList],
  data() {
    return {
      listLoading: false,
      listQuery: {
        title: '',
      },
      list: [
        { difficulty: '入门', title: '1. A + B 问题', rote: '0.52' },
        { difficulty: '简单', title: '1. A + B 问题', rote: '0.52' },
        { difficulty: '中等', title: '1. A + B 问题', rote: '0.52' },
        { difficulty: '困难', title: '1. A + B 问题', rote: '0.52' },
        { difficulty: '超难', title: '1. A + B 问题', rote: '0.52' },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
  },
};
</script>

<style lang="scss" scoped>
#questions{
  width: $mainWidth;
  padding: 20px;
  min-height: 500px;
  margin: auto;
  display: flex;
  justify-content:space-between;
  .box-card{
    margin-bottom: 10px;
  }
  #questionsList{
    width: calc(100% - 380px);
    min-height: 300px;
    .select{
      margin-top: 10px;
      min-height: 21px;
      display: flex;
      align-items: flex-start;
      .title{
        width:80px;
        color: $blue;
        border-left: 2px solid $blue;
        padding-left: 8px;
        font-size: 15px;
        &::after{
          content: '：'
        }
      }
      .options{
        display: flex;
        flex-wrap: wrap;
        width: calc(100% - 80px);
        .option{
          width: calc(100% / 5 - 20px);
          margin: 0 10px;
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
    .rankCard{
      .cardHead{
        width: 100%;
        height: 50px;
        color: white;
        background: $black;
        text-align: center;
        line-height: 50px;
        font-size: 17px;
      }
      .cardMain{
        img{
          border-radius: 50%;
          margin:30px 90px;
          border: 1px solid $black;
        }
        .rank{
          display: flex;
          justify-content:space-between;
          border-top: 1px solid $borderOne;
          background: #fdfdfd;
          div{
            width:50%;
            text-align: center;
            .title{
              color:$fontThree;
              font-size: 14px;
            }
            .detail{
              color:$fontTwo;
              font-size: 17px;
            }
            &:nth-of-type(2){
              border-left: 1px solid $borderOne;
            }
          }
        }
      }
    }
  }
}
</style>
