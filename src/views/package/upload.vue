<template>
  <div id="upload">
    <main>
      <el-steps :active="active" align-center>
        <el-step title="题包信息"></el-step>
        <el-step title="题目信息"></el-step>
        <el-step title="增加题目"></el-step>
      </el-steps>
      <el-row>
        <el-col :span="16">
          <!-- 题包信息 -->
          <el-card class="step" shadow="never" v-show="active===0">
            <div>
              <h1>题包信息</h1>
                <el-form :rules="rules" ref="form" :model="form" label-position="top">
                  <el-form-item label="题包封面">
                    <el-upload
                      :action="`${API_ROOT}/packet/temp`"
                      list-type="picture-card"
                      :limit="1"
                      :file-list="fileList"
                      :on-success="handleSuccess"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                      :on-exceed="handleExceed">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                  <el-form-item label="题包名称" style="width:700px">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="价格">
                    <el-input-number v-model="form.price" :precision="2" :step="10" :min="0" :max="300"></el-input-number>
                  </el-form-item>
                  <el-form-item label="题包介绍" class="input" style="width:700px;">
                    <el-input type="textarea" v-model="form.introduce" :rows="5"></el-input>
                  </el-form-item>
                  <div class="item">
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    </el-form-item>
                  </div>
                </el-form>
            </div>
          </el-card>
          <!-- 增加题目 -->
          <el-card class="step" shadow="never" v-show="active===1">
            <div>
              <h1>题目信息</h1>
                <div class="filter-container" style="margin-bottom:20px">
                  <el-input
                    v-model="listQuery.title"
                    placeholder="题目"
                    style="width: 200px;margin-right:5px"
                    class="filter-item"
                    clearable
                    @keyup.enter.native="handleFilter"/>
                  <el-select v-model="listQuery.difficulty" placeholder="难度" clearable class="filter-item" style="width: 100px;margin-right:5px">
                    <el-option v-for="(item,key) in difficultyClasses" :key="key" :label="item.display_name" :value="item.value"/>
                  </el-select>
                  <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
                  <el-button class="filter-item" style="margin-left: 5px;" type="success" icon="el-icon-edit" @click="handleCreate">增加</el-button>
                </div>
                <el-table
                  :data="problemList"
                  border
                  fit
                  highlight-current-row>
                  <el-table-column align="center" label="编号" width="95">
                    <template slot-scope="scope">
                      {{ scope.row.problemId }}
                    </template>
                  </el-table-column>
                  <el-table-column class-name="status-col" label="难度" width="110" align="center">
                    <template slot-scope="scope">
                      <p class="difficulty" :style="difficultyClasses[scope.row.difficulty].display_name | tagStyle">
                        {{ difficultyClasses[scope.row.difficulty].display_name }}
                      </p>
                    </template>
                  </el-table-column>
                  <el-table-column label="标题">
                    <template slot-scope="scope">
                      <span class="link-type" >{{ scope.row.title }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" @click="handleDelete(scope.row.problemId)">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination-container" style="margin-top:10px;">
                  <el-pagination
                    v-show="total>0"
                    :current-page="listQuery.page"
                    :page-sizes="[10,20,30,50]"
                    :page-size="listQuery.limit"
                    :total="total"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>
            </div>
          </el-card>
          <!-- 题目信息 -->
          <el-card class="step" shadow="never" v-show="active===2">
            <div slot="header">
              <h1>增加题目</h1>
              <el-form :rules="rule" ref="forms" :model="forms" label-position="top">
                <el-form-item label="所属题包名" v-show="this.form.packetId !== 0">
                  <el-input v-model="form.name" class="input" :disabled="true"></el-input>
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
                    <el-button type="primary" @click="onSubmits" style="float: right;margin-right:10px">发布</el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="item clearfix">
              <el-button
                style="margin-top: 12px;"
                @click="prev">
                上一步
              </el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8" class="tips">
          <div v-show="active===0"><package-tips /></div>
          <div v-show="active===1"><problem-tips /></div>
          <div v-show="active===2"><add-problem-tips /></div>
        </el-col>
      </el-row>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import packageTips from './components/packageTips.vue';
import problemTips from './components/problemTips.vue';
import addProblemTips from './components/addProblemTips.vue';
import { API_ROOT } from '@/utils/request';
import * as packageUpload from '@/api/package';
import * as tag from '@/api/tag';
import * as problem from '@/api/problem';
import * as utils from '@/utils/index';

export default {
  name: 'Upload',
  data() {
    return {
      active: 0,
      data: 0,
      form: {
        image: null,
        name: '',
        introduce: '',
        price: 99,
      },
      rules: {
        name: [{ required: true, message: '请输入题包标题', trigger: 'blur' }],
        image: [{ required: true, message: '请输入题包封面', trigger: 'blur' }],
        introduce: [{ required: true, message: '请输入题包详情', trigger: 'blur' }],
        price: [{ required: true, message: '请输入题包发布价格', trigger: 'blur' }],
      },
      fileList: [],
      imageList: {},
      dialogImageUrl: '',
      dialogVisible: false,
      API_ROOT,
      // 题包

      forms: {
        title: '',
        description: '',
        input: '',
        output: '',
        sampleInput: '',
        sampleOutput: '',
        inDate: new Date(),
        timeLimit: 0,
        memoryLimit: 0,
        difficulty: '',
        type: 0,
        tags: [],
      },
      loading: true,
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
      // add题目
      problemList: [],
      total: 0,
      listQuery: {
        limit: 10,
        page: 1,
        title: null,
        tags: null,
        difficulty: null,
        type: null,
        isFree: null,
        packetId: 0,
      },
      difficultyClasses: [
        { value: 0, display_name: '入门' },
        { value: 1, display_name: '简单' },
        { value: 2, display_name: '中等' },
        { value: 3, display_name: '困难' },
        { value: 4, display_name: '超难' },
      ],
      // 题目
    };
  },
  computed: {
    ...mapGetters([
      'isLogin',
      'avator',
    ]),
  },
  components: {
    packageTips,
    problemTips,
    addProblemTips,
  },
  methods: {
    handleExceed() {
      this.$message({
        type: 'warning',
        message: '只支持1张图片!',
      });
    },
    handleRemove(file) {
      delete this.imageList[file.uid];
      this.form.image = null;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file) {
      const url = response.data.split('/');
      this.imageList[file.uid] = url[url.length - 1];
      this.form.image = url[url.length - 1];
    },
    onSubmit() {
      // eslint-disable-next-line consistent-return
      this.$refs.form.validate((valid) => {
        if (valid) {
          packageUpload.insert(this.form)
            .then((result) => {
              console.log(`题包创建${result}`);
              this.$message({
                type: 'success',
                message: '创建成功!',
              });
              this.data = result.data;
              this.active = 1;
            });
        } else {
          return false;
        }
      });
    },
    // 题包上传

    onSubmits() {
      this.setTags();
      this.forms.packetId = this.data;
      this.forms.tags = this.forms.tags.join();
      this.forms.inDate = utils.parseTime(this.forms.inDate);
      if (this.form.price !== 0) {
        this.forms.isFree = 0;
      } else {
        this.forms.isFree = 1;
      }
      this.$refs.forms.validate((valid) => {
        if (valid) {
          problem.upload(this.forms)
            .then((result) => {
              if (result.code === 1) {
                this.$message({
                  type: 'success',
                  message: '添加成功!',
                });
                this.getProblemData();
                this.active = 1;
                this.$refs.forms.resetFields();
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
    setTags() {
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
    getProblemData() {
      this.listQuery.packetId = this.data;
      problem.query(this.listQuery)
        .then((result) => {
          if (result.code) {
            this.total = result.data.totalCount;
            this.problemList = result.data.list;
          } else {
            this.problemList = [];
          }
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getProblemData();
    },
    handleCreate() {
      this.active = 2;
      this.selectTags = new Array(8);
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getProblemData();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getProblemData();
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        problem.deleteById(id)
          .then((result) => {
            if (result.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
              this.getProblemData();
            } else {
              this.$message({
                type: 'danger',
                message: '删除失败!',
              });
            }
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    // 题目信息
    prev() {
      // eslint-disable-next-line no-plusplus
      if (this.active-- === 0) this.active = 0;
    },
  },
  created() {
    this.getTags();
  },
  filters: {
    formatDate(val) {
      const date = new Date(val);
      const year = date.getFullYear();
      const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate() + 1}`;
      return `${year}-${month}-${day}`;
    },
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
    border-right: 1px solid #ecf0f1;
  }
  .tips{
    padding:10px;
    padding-top:45px;
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
