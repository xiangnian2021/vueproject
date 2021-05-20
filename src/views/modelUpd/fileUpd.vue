<template>
  <div class="login-wrap">
           <el-row :gutter="20">
            <el-col :span="8">
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
                      icon="el-icon-upload">
              <el-button slot="trigger"   type="primary" plain style="margin:5px 0px 0px 20px;">选取文件</el-button>
              <el-button style="margin-left: 10px;"  type="primary" plain @click="submitUpload">文件上传</el-button>
              <span slot="tip" class="el-upload__tip" style="margin-left: 10px;margin-top:18px">只能上传xls/xlsx/csv文件</span>
            </el-upload>
            </el-col>
            <el-col :span="16"><el-button  type="primary" plain @click="btnDownLoad">下载</el-button></el-col>
          </el-row>
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
                     this.path = res.path
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
    btnDownLoad(path){
      let params = {path:this.path}
      let logintoken = localStorage.getItem('logintoken')
      debugger
      console.log(localStorage.getItem('logintoken'))
        // exportDownload(params).then(res=>{
        //   if(res.status==200){
        //     const link = document.createElement('a');
        //     let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
        //     let url = window.URL.createObjectURL(blob);
        //     link.href = url;
        //     debugger
        //     link.download = this.insurlink_code_name + 'file.xls'; // 自定义文件名
        //     link.click(); // 下载文件
        //     URL.revokeObjectURL(url); // 释放内存
        //   }else if (res.status==2002){
        //     //跳转到登录
        //     this.$store.commit('logout', 'false')
        //     this.$router.push({ path: '/login' })
        //     this.$message({
        //       type: 'info',
        //       message: "登录超时,请重新登录"
        //     })
        //   }else{
        //     this.$message({
        //       type: 'info',
        //       message: res.msg

        
        //     })
        //   }
        // });
      exportDownload(params).then(response => {
       if (response.data.type === 'application/octet-stream') {
        // 获取http头部的文件名信息，若无需重命名文件，将下面这行删去
        const fileName = response.headers['content-disposition'].split('=')[1]
        /* 兼容ie内核，360浏览器的兼容模式 */
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          const blob = new Blob([response.data], { type: 'application/zip' })
          window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else {
          /* 火狐谷歌的文件下载方式 */
          const blob = new Blob([response.data], { type: 'application/zip' })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a') // 创建a标签
          link.href = url
          link.download = fileName // 文件重命名，若无需重命名，将该行删去
          link.click()
          URL.revokeObjectURL(url) // 释放内存
        }
        resolve(response)
      } else {
        const reader = new FileReader()
        reader.onload = function(event) {
          const msg = JSON.parse(reader.result).data
          _this.$errorMsg(message) // 将错误信息显示出来
        }
        reader.readAsText(response.data)
      }
      }).catch(error => _this.$errorMsg(error) )
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