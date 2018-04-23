<template>
  <panel>
  <el-row>
    <el-button>默认按钮</el-button>
    <el-button type="primary" @click="loding">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
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
        loding(){
          muenList().then(result=>{
            console.error("xxx",...result.body.list);
          })
        }
    }
  };
</script>

