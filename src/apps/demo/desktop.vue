<template>
  <panel>
  <el-row>
    <el-button>默认按钮</el-button>
    <el-button type="primary" @click="loding('1')">主要按钮</el-button>
    <el-button type="success" @click="loding('2')">成功按钮</el-button>
    <el-button type="info" @click="loding('3')">信息按钮</el-button>
    <el-button type="warning" @click="loding('4')">警告按钮</el-button>
    <el-button type="danger" @click="loding('5')">危险按钮</el-button>
  </el-row>
    <el-input v-model="input"></el-input>
    <el-input v-model="input"></el-input>


  </panel>
</template>

<script>
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import {muenList} from './api';
  export default {
    components: {ElInput}, data(){
      return{
        input:""
      }
    },
    mounted(){
      const _this=this;

    },
    methods: {
        loding(type){
         if(type === '1'){
           this.$message('主要按钮');
         }else if(type === '2'){
           this.$message.success('成功按钮');
         }else if(type === '3'){
           this.$message('信息按钮');
         }else if(type === '4'){
           this.$message.warning('警告按钮');
         }else if(type === '5'){
           this.$message.error('危险按钮');
         }
        }
    }
  };
</script>

