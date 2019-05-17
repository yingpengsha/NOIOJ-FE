<template>
  <div id="list">
    <el-card class="intro">
      {{description}}
    </el-card>
    <el-card class="item" v-for="(item,index) in list" :key="index">
      <header>
        <div class="title">{{`第 ${index+1} 章 `+item.title}}</div>
        <div class="description">{{item.description}}</div>
      </header>
      <main>
        <div
          class="section"
          v-for="(section,key) in item.subsectionList"
          :key="key"
          @click="handleToVideo(section.subsectionId)"
        >
          {{section.title}}
          <div style="float:right;font-size:20px;">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </main>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: Array,
    description: String,
  },
  methods: {
    handleToVideo(id) {
      this.$router.push({ name: 'Video', params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
#list{
  .intro{
    font-size: 14px;
  }
  .item{
    margin:20px 0;
    header{
      .title{
        font-size: 22px;
      }
      .description{
        margin:8px 0;
        font-size: 12px;
        color: $fontTwo;
      }
    }
    main{
      padding-top:10px;
      .section{
        margin: 5px;
        padding:15px;
        transition: all .3s;
        border-radius: 10px;
        &:hover{
          cursor: pointer;
          background: $borderFour;
        }
      }
    }
  }
}
</style>
