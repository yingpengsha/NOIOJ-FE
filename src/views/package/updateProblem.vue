<template>
  <div id="upload">
    <main>
          <el-card class="step" shadow="never">
              <h1>增加题目</h1>
              <el-form :rules="rule" ref="forms" :model="forms" label-position="top">
                <el-form-item label="所属题包名" v-show="this.forms.packetId !== 0">
                  <el-input v-model="$route.query.name" class="input" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="题目名称" style="width:700px" prop="title">
                  <el-input v-model="forms.title"></el-input>
                </el-form-item>
                <el-form-item label="难度" prop="difficulty">
                  <el-radio-group v-model="forms.difficulty">
                    <el-radio :label="0">入门</el-radio>
                    <el-radio :label="1">简单</el-radio>
                    <el-radio :label="2">中等</el-radio>
                    <el-radio :label="3">困难</el-radio>
                    <el-radio :label="4">超难</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="算法/数据结构" prop="tags" class="select">
                  <el-select
                    v-for="(tag,index) in 8"
                    @change="setTags"
                    v-model="selectTags[index]"
                    :key="index"
                    filterable
                    clearable
                    :placeholder="tagName[index]"
                    style="margin-right:10px;margin-bottom:10px"
                    prop="tags"
                  >
                    <el-option
                      v-for="item in tags[index]"
                      :key="item.tagId"
                      :label="item.name"
                      :value="item.tagId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="时间限制(秒)" prop="timeLimit">
                  <el-input-number size="small" :min="0" v-model="forms.timeLimit"></el-input-number>
                </el-form-item>
                <el-form-item label="空间限制(MByte)" prop="memoryLimit">
                  <el-input-number size="small" :min="0" v-model="forms.memoryLimit"></el-input-number>
                </el-form-item>
                <el-form-item label="题目介绍" prop="description">
                  <el-input type="textarea" :rows="5" class="input" v-model="forms.description"></el-input>
                </el-form-item>
                <el-form-item label="输入参照" prop="sampleInput">
                  <el-input type="textarea" :rows="2" class="input" v-model="forms.sampleInput"></el-input>
                </el-form-item>
                <el-form-item label="输出参照" prop="sampleOutput">
                  <el-input type="textarea" :rows="2" class="input" v-model="forms.sampleOutput"></el-input>
                </el-form-item>
                <el-form-item>
                  <div class="item clearfix">
                    <el-button type="primary" @click="onSubmits" style="float: right;margin-right:10px">修改</el-button>
                  </div>
                </el-form-item>
              </el-form>
          </el-card>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as tag from '@/api/tag';
import * as problem from '@/api/problem';
import * as packageUpload from '@/api/package';
import * as utils from '@/utils/index';

export default {
  name: 'UpdateProblem',
  data() {
    return {
      forms: {
        problemId: 0,
        title: '',
        description: '',
        input: '',
        output: '',
        sampleInput: '',
        sampleOutput: '',
        spj: 0,
        hint: '',
        source: 'OJ',
        inDate: new Date(),
        timeLimit: 0,
        memoryLimit: 0,
        defunct: 'Y',
        accepted: 0,
        submit: 0,
        solved: 0,
        difficulty: 1,
        type: 0,
        isFree: 1,
        packetId: 0,
        tags: [],
      },
      data: {},
      loading: true,
      tagLoading: true,
      tags: new Array(8),
      selectTags: new Array(8),
      tagName: ['搜索/递归/回溯', '排序', '动态规划', '数学', '其他', '树结构', '线性结构', '其他'],
      rule: {
        title: [
          { required: true, message: '请输入题目名称' },
        ],
        description: [
          { required: true, message: '请输入题目介绍' },
        ],
        input: [
          { required: true, message: '请输入题目输入参照' },
        ],
        tags: [
          { required: true, message: '算法和数据结构中至少选一个' },
        ],
        output: [
          { required: true, message: '请输入题目输出参照' },
        ],
        sampleInput: [
          { required: true, message: '请输入题目输入说明' },
        ],
        sampleOutput: [
          { required: true, message: '请输入题目输出说明' },
        ],
        difficulty: [
          { required: true, message: '请选择难度' },
        ],
        inDate: [
          { required: true, message: '请选择发布时间' },
        ],
        timeLimit: [
          { required: true, message: '请输入时间限制' },
        ],
        memoryLimit: [
          { required: true, message: '请输入空间限制' },
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
    packageId() {
      return this.$route.query;
    },
  },
  methods: {
    onSubmits() {
      this.setTags();
      this.forms.tags = this.forms.tags.join();
      this.forms.inDate = utils.parseTime(this.forms.inDate);
      this.$refs.forms.validate((valid) => {
        if (valid) {
          problem.update(this.forms)
            .then((result) => {
              if (result.code === 1) {
                this.$message({
                  type: 'success',
                  message: '修改成功!',
                });
                this.$router.push({ name: 'problemPackageUpdate', params: { id: this.forms.packetId } });
                this.data.status = 0;
                this.data.packetId = this.forms.packetId;
                packageUpload.update(this.data);
              } else {
                console.log(result.code);
              }
            });
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
    getTags() {
      tag.query()
        .then((result) => {
          this.filterTagsData(result.data);
        });
    },
    getForm() {
      problem.queryById(this.$route.query.id)
        .then((result) => {
          this.forms = result.data;
          this.selectData(this.forms.tags);
          this.loading = false;
        });
    },
    selectData(tags) {
      console.log(tags);
      tags.forEach((element) => {
        this.selectTags[element.classId] = element.tagId;
        console.log(this.selectTags);
      });
      this.setTags();
    },
    setTags() {
      this.forms.tags = [];
      this.selectTags.forEach((element) => {
        if (element) {
          this.forms.tags.push(element);
        }
      });
    },
    filterTagsData(tags) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 8; i++) {
        this.tags[i] = tags.filter(element => element.classId === i);
      }
      this.loading = false;
    },
    // 题目上传
  },
  created() {
    this.getTags();
    if (this.$route.name === 'problemUpdate') {
      this.forms.packetId = this.$route.query.id;
    }
    this.getForm();
    console.log(this.forms);
  },
  filters: {
    tagStyle(difficulty) {
      let style = 'background:';
      switch (difficulty) {
        case '入门':
          style += '#909399';
          break;
        case '简单':
          style += '#67C23A';
          break;
        case '中等':
          style += '#0681FF';
          break;
        case '困难':
          style += '#E6A23C';
          break;
        case '超难':
          style += '#F56C6C';
          break;
        default:
          break;
      }
      return style;
    },
  },
};
</script>

<style lang="scss">
#upload{
  main{
    width: $detailWidth;
    margin:0 auto;
    padding:30px;
  }
  .step{
    background: $grayBack;
    border: none;
  }
  .el-form-item__label {
    font-size: 18px !important;
  }
  .input{
    width:500px;
  }
  .difficulty{
    width: 80px;
    height:28px;
    line-height: 28px;
    margin:0 auto;
    background: black;
    color: white;
    border-radius: 3px;
  }
  .item {
    margin-top: 18px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
}
</style>
