<template>
  <div id="app">
<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">

  <el-menu-item index="1"><router-link to='/about'>请登录</router-link></el-menu-item>
  <el-menu-item index="2"><router-link to='/2'>1705</router-link></el-menu-item>
  <el-menu-item index="3"><router-link to='/3'>升班</router-link></el-menu-item>
  <el-menu-item index="4"><router-link to='/4'>末班</router-link></el-menu-item>
</el-menu>

<router-view/>

</div>


</template>


<script>
export default {
   created(){
      if(this.$route.params.state==null){
        this.activeIndex2="1"
      }else{
        this.activeIndex2=parseInt(this.$route.params.state)+1+""
      }
    },
    data() {
      return {
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
      
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
