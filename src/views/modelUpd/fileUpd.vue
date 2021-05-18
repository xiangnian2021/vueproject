<template>
  <div class="login-wrap">
     <el-upload style="display: -webkit-inline-box;"
                      class="upload-demo"
                      ref="upload"
                      action=""
                      :on-preview="handlePreview"
                      :before-upload="beforeUpload"
                      :on-remove="handleRemove"
                      :auto-upload = 'false'
                      :on-success = 'handleSuccess'
                       accept=".csv,.xls,.xlsx"
                      name="file" :limit=1
                      icon="el-icon-upload"
                      >
           <el-button slot="trigger"  type="primary" style="margin:5px 0px 0px 20px;">选取文件</el-button>
           <el-button style="margin-left: 10px;" type="success" @click="submitUpload">文件上传</el-button>
           <div slot="tip" class="el-upload__tip" style="margin-left: 10px;margin-top:15px">只能上传xls/xlsx/csv文件</div>
           <el-button style="margin-left: 10px;" type="success" @click="btnDownLoad">下载</el-button>
       </el-upload>
  </div>
</template>
<script type="text/ecmascript-6">
import { fileUpd, exportDownload } from '../../api/userMG'
export default {
  name: 'login',
  data() {
    return {
      //定义loading默认为false
      logining: false
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
  },
  // 里面的函数只有调用才会执行
  methods: {
 submitUpload() {
        this.$refs.upload.submit();
  },
   beforeUpload(file) {
       //传入格式验证
        let Xls = file.name.split('.');
        if(Xls[1] === 'xls'||Xls[1] === 'xlsx'||Xls[1] === 'doc'||Xls[1] === 'docx'||Xls[1] === 'csv'){
          // 读取Excel文件并校验返回Boolean值
           const isLt2M = file.size / 1024 / 1024 < 100;
              if (!isLt2M) {
                this.$message.error('文件大小不能超过100MB!');
                return false;
              }else{
                let fd = new FormData()
                fd.append('file', file)
                fileUpd(fd).then(res=>{
                   if (res.status==200) { 
                      this.$message({
                            type: 'success',
                            message: res.data.msg
                            })
                    }else if (res.code==2002){
                        //跳转到登录
                        this.$store.commit('logout', 'false')
                        this.$router.push({ path: '/login' })
                        this.$message({
                            type: 'info',
                            message: "登录超时,请重新登录"
                           })
                        }else{
                        this.$message({
                            type: 'info',
                            message: res.msg
                           })
                    }
                 })
              }
        }else {
          this.$message.error('上传文件只能是 xls/xlsx/csv格式!')
          return false
        };
      },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleSuccess(res,file,fileList){
        if(res.code=='200'){
          this.$message({
            message: '上传成功！',
            type: 'success'
          });
        }else {
          this.$message({
            message: res.msg,
            type: 'error'
          });
        }
    },
    btnDownLoad(){
        exportDownload().then(res=>{
          if(res.status==200){
            const link = document.createElement('a');
            let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
            let url = window.URL.createObjectURL(blob);
            link.href = url;
            link.download = this.insurlink_code_name + 'file.xls'; // 自定义文件名
            link.click(); // 下载文件
            URL.revokeObjectURL(url); // 释放内存
          }else if (res.status==2002){
            //跳转到登录
            this.$store.commit('logout', 'false')
            this.$router.push({ path: '/login' })
            this.$message({
              type: 'info',
              message: "登录超时,请重新登录"
            })
          }else{
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        });
    }
  }
}
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 5%;
  padding-left: 5%;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;}
</style>