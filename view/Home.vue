<template>
  <div class="home">
     <el-button @click="tanchu" type="success"  v-if="$route.params.id==2">+</el-button> 
   <el-dialog title="新增" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="班级" :label-width="formLabelWidth">
      <el-select v-model="form.class" placeholder="请选择活动区域">
        <el-option label="1705A" value="1705A"></el-option>
        <el-option label="1705B" value="1705B"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
 
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取消</el-button>
    <el-button type="primary" @click="addClick">确 定</el-button>
  </div>
</el-dialog>

 <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="class"
        label="1705b"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
         width="180">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="400">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row,1)" type="danger" size="small">删除</el-button>
        <el-button type="info" size="small" @click="gaiChick(scope.row,$event.currentTarget.id)" id='3'>升班</el-button>
        <el-button type="info" size="small" @click="gaiChick(scope.row,$event.currentTarget.id)" id='4'>末班</el-button>
      </template>
    </el-table-column>
    </el-table>
    
    
    </div>

</template>
<script>
export default {
    data() {
      return {
        tableData: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {},
        AA:false,
        formLabelWidth: '120px'
        }
    },
     methods: {

      addClick(){
               this.dialogFormVisible = false
               this.$http.post('http://localhost:8000/add',this.form,{emulateJSON:true}).then((e)=>{
               this.abc()
               this.form={}
              })
             },
     
      tanchu(){
          this.dialogFormVisible = true
          },

       handleClick(row,i) {
         this.$http.post('http://localhost:8000/del',{state:row.id},{emulateJSON:true}).then(e=>{
           var _del=this.tableData.indexOf(row)
           this.tableData.splice(_del,1)
         }) 
         },
         gaiChick(row,i){
          this.$http.post('http://localhost:8000/gai',{state:i,id:row.id},{emulateJSON:true}).then(e=>{
           this.abc()
           this.form={}
         }) 
         },

          abc(){
         this.$http.post('http://localhost:8000/sel',{state:this.$route.params.id},{emulateJSON:true}).then(e=>this.tableData=e.body)
      }
   },

   

    watch:{
       'form.name'(){
            var number = /^[u4e00-u9fa5]+$/
            // console.log(number.test(this.form.name))
            var zifu = number.test(this.form.name)
            if(zifu == true){
              this.AA = true
            }else{
              this.AA = false
            }
        },
     '$route'(){
      this.abc()
     }
   },
   
    created(){
      this.abc()
    }
   
}
</script>
