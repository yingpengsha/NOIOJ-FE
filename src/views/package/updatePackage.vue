<template>
  <div id="upload">
    <main>
          <!-- 题包信息 -->
          <el-card class="step" shadow="never">
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
                      <el-button type="primary" @click="onSubmit">修改信息</el-button>
                    </el-form-item>
                  </div>
                </el-form>
            </div>
          </el-card>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { API_ROOT } from '@/utils/request';
import * as packageUpload from '@/api/package';

export default {
  name: 'Upload',
  data() {
    return {
      form: {
        image: null,
        name: '',
        introduce: '',
        price: 99,
        status: 0,
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
    getPackage() {
      packageUpload.queryById(this.$route.query.id)
        .then((result) => {
          console.log(result);
          this.form = result.data;
          const url = result.data.image.split('/');
          this.fileList.push({
            name: url[url.length - 1],
            url: this.form.image,
          });
          this.imageList[url[url.length - 1]] = url[url.length - 1];
        });
    },
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
          this.form.status = 0;
          console.log(this.form);
          packageUpload.update(this.form)
            .then(() => {
              this.$message({
                type: 'success',
                message: '修改成功!',
              });
              this.$router.push({ name: 'problemPackageUpdate', params: { id: this.$route.query.id } });
            });
        } else {
          return false;
        }
      });
    },
    // 题包上传
  },
  created() {
    this.getPackage();
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
