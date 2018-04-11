<template>
 <div class='about'>
   <div>
   <el-button @click="tanchu" type="success">登录</el-button> 
<el-dialog title="Welcome" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="用户" :label-width="formLabelWidth">
      <el-input v-model="form.user" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input v-model="form.pass" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="sign">注册</el-button>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</el-dialog>
</div>

</div>
</template>
<script>
export default({
  data(){
    return {
    
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '120px'
      }
  },
   methods:{
      sign(){
        	 this.dialogFormVisible = false
           this.$http.post('http://localhost:8000/sign',{user:this.form.user,pass:this.form.pass},{emulateJSON:true}).then((e)=>{
        console.log(e.body)
          if(e.body == '注册成功'){
 						alert('注册成功')
 					}else{
 						 this.$message({
                showClose: true,
                 message: '账号以存在'
              });
 				   	}
        })
      },

      tanchu(){
          this.dialogFormVisible = true
          },

       login(){
        	 this.dialogFormVisible = false
          this.dialogFormVisible = false,
   			 this.$http.post('http://localhost:8000/login',{user:this.form.user,pass:this.form.pass},{emulateJSON:true}).then((e)=>{
 					if(e.body == '登录成功'){
 						alert('登录成功')
 					}else{
 						alert('账号密码失败')
 					}
 			})
      },

  }

})


</script>  


