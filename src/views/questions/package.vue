<template>
  <div id="questionsPackage">
    <div class="title">
      <p>欢迎来到</p>
      <p>信奥训练题包广场</p>
    </div>
    <div class="search">
      <el-input style="width:250px" v-model="input" placeholder="关键词搜索"></el-input>
      <el-button type="success" style="margin-left:10px;">搜索</el-button>
      <el-button type="primary">上传题包</el-button>
    </div>

    <div class="packageList">
      <div class="package" v-for="(item,key) in packageList" :key="key">
        <div class="back">
          <div class="author">{{item.author}}</div>
          <div class="name">{{item.name}}</div>
        </div>
        <div class="items">
          <div class="item">
            <p>{{item.number}}</p>
            <p>题目</p>
          </div>
          <div class="item">
            <p>{{item.people}}</p>
            <p>购买人数</p>
          </div>
          <div class="item">
            <p>{{item.price || '免费' }}</p>
            <p>价格</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionsPackage',
  data() {
    return {
      packageList: [
        {
          name: '2017信奥训练真题', author: '信奥训练平台', number: 99, people: 10, price: 99,
        },
        {
          name: '2018信奥训练真题', author: '信奥训练平台', number: 99, people: 10, price: 99,
        },
        {
          name: '2019信奥训练真题', author: '信奥训练平台', number: 99, people: 10, price: 0,
        },
        {
          name: '2019信奥训练真题', author: '信奥训练平台', number: 99, people: 10, price: 99,
        },
        {
          name: '2019信奥训练真题', author: '信奥训练平台', number: 99, people: 10, price: 0,
        },
        {
          name: '2019信奥训练真题', author: '信奥训练平台', number: 99, people: 10, price: 0,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#questionsPackage{
  width: $mainWidth;
  margin: auto;
  min-height: 500px;
  padding:40px;
  .title{
    p{
      margin:8px;
    }
    p:nth-of-type(1){
      color: $fontTwo;
    }
    p:nth-of-type(2){
      font-size: 30px;
    }
  }
  .search{
    margin:20px 0;
  }
  .packageList{
    display: flex;
    flex-wrap: wrap;
    .package{
      width: calc(100% / 5 - 20px);
      height: 250px;
      margin: 10px;
      background: white;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, .12);
      border-radius: 20px;
      transition: all .3s;
      .back{
        width:100%;
        height: 180px;
        padding: 15px;
        background: gray;
        border-radius: 20px 20px 0 0;
        .author{
          color:$borderThree;
        }
        .name{
          color: white;
          font-size: 25px;
        }
      }
      .items{
        width: 100%;
        display: flex;
        .item{
          width: calc(100% / 3);
          text-align: center;
          p:nth-of-type(1){
            font-size: 18px;
            margin: 10px 0 0 0;
            height: 25px;
            line-height: 25px;
          }
          p:nth-of-type(2){
            font-size: 12px;
            margin: 5px 0 0 0;
            color:$fontThree;
          }
        }
      }
      &:hover{
        cursor: pointer;
        box-shadow: 6px 8px 10px rgba(0, 0, 0, .12);
      }
    }
  }
}
</style>
