<template>
  <panel>
    <div style=" padding-bottom: 10px;">
      <el-button  size="small" onclick="history.go(-1)">返回</el-button>
      <el-button  type="primary"  size="small" @click="addNode">新增</el-button>
    </div>
    <div class="container-two-wrap">
      <div class="table-tree left">
        <div class="title-module">菜单结构</div>
        <div class="table-tree">
          <el-row class="title-module">
            <el-col :span="12">编码</el-col>
            <el-col :span="12">名称</el-col>
          </el-row>
          <el-tree
            :data="data1"
            node-key="id"
            :props="defaultProps"
            :highlight-current="true"
            default-expand-all
            :expand-on-click-node="false">
              <span  @click="() => nodeClick(node, data)" class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{data.code}}</span>
                <span class="ml120">{{data.description}}</span>
              <span>
                <el-button type="text" size="mini"  @click="() => append(data)"><i class="fa fa-plus"></i></el-button>
              </span>
              </span>
          </el-tree>
        </div>

      </div>
      <div >
        <div class="title-module">菜单信息</div>
        <el-row class="bg-f">
          <div>
            <el-button @click="saveForm('formInline')" type="primary"  size="small">保存</el-button>
            <el-button @click="deleteNode()" type="danger" size="small">删除</el-button>
            <div style=" padding-top: 10px;">
            </div>
          </div>

          <el-col :span="24" class="form-wrap">
            <el-form :model="formInline" :rules="rules"  ref="formInline" label-width="100px" :label-position="'left'">
              <el-form-item label="编码" prop="description" class="item-5">
                <el-input v-model="formInline.code" size="small"></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="description" class="item-5">
                <el-input v-model="formInline.description" size="small" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="父级编码" prop="parentCode" class="item-5">
                <el-input v-model="formInline.parentCode" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="父级名称" prop="parentDescription" class="item-5">
                <el-input v-model="formInline.parentDescription" size="small" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="菜单级别"  class="item-5">
                <el-input v-model="formInline.level" size="small" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>

  </panel>

</template>

<script>

  import { muenList,save} from './api';
  import   {list2tree}   from '../../utils/treeUtils'
  export default {
    data() {
      var code =(rule,value,callback)=>{
        console.log("校验编码不能重复")
        callback();
      }
      return {
        treeStatus:[],
        sign:false,
        currentRow: null,
        labelPosition: 'left',
        formInline: {
          parentCode: '',
          parentDescription: '',
          parentId: '',
          code: '',
          id:'',
          description: '',
          level:''
        },
        rules: {
          code: [
            {required: true, message: '请填写编码', trigger: 'change'},
            { validator: code, trigger: 'change' }
          ],
          description: [
            {required: true, message: '请填写名称', trigger: 'change'}
          ]
        },
        data1: [],  //树型列表
        formInline: {},
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        selectedNode: {},
        pageData: [],  //树型列表
      }
    },
    mounted(){
      const _this=this;
      _this.tableDataInit();
    },
    methods: {
      nodeClick(node, data){
        console.log(node);
        console.log(data);
      },
      //保存节点
      saveForm(form){
        const _this=this;
        _this.$refs[form].validate((valid) => {
          if (!valid) {
            return false;
          } else {
            let data= {
              "code": _this.formInline.code,
              "id": _this.formInline.id,
              "description": _this.formInline.description,
              "parentId": _this.formInline.parentId,
              "level":_this.formInline.level
            }
            //执行保存操作
          }
        });

      },
      deleteNode(){
        const _this=this;
        if(_this.selectedNod===undefined||_this.selectedNod==null){
          _this.$message({
            message: '请选择一个菜单！',
            type: 'warning'
          });
        }else if(_this.selectedNod.data.children != undefined && _this.selectedNod.data.children.length > 0) {
          _this.$message({
            message: '所选菜单已使用，不可删除！',
            type: 'warning'
          });
        }else {
          this.$confirm('是否确认删除此菜单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //执行删除操作
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      addNode(){//添加父级菜单
        let _this=this;
        let obj={
          "id": _this.getUUid(),
          "description": '',
          "code": '',
          "level": 0
        };
        _this.pageData.push(obj);
        let a=_this.dataFormat(_this.pageData);
        _this.data1=a;
      },
      //添加子级别
      getUUid() {//生成时间戳
        let num="";
        for(var i=0;i<6;i++)
        {
          num+=Math.floor(Math.random()*10);
        }
        return new Date().getTime()+num;
      },
      //选中节点信息
      selected(node, store, data){
        const _this=this;
        _this.selectedNod = {
          data: data,
          store: store
        };
        /*//根据父节点查找,父节点信息
        if (data.parentId!=undefined&&data.parentId != ''){
          global.httpClient(getDataById,[""+data.parentId], function(error, results) {
            _this.formInline = data;
            _this.formInline.parentDescription=results.functionMenu.description;
            _this.formInline.parentCode=_this.treeCheckCode(results.functionMenu.code);
          },true);
        }else {
          this.formInline = data;
          _this.specialInd=data.specialInd+"";
          _this.blockInd=data.blockInd+"";
        }*/
      },
      //格式化数据list=>tree
      dataFormat(data){
        const _this=this;
        let jsonData=[];
        for (let i = 0; i < data.length; i++) {
          jsonData.push({
            parentId: data[i].parentId,
            id:data[i].id,
            code:_this.treeCheckCode(data[i].code),
            description:data[i].description,
            level:data[i].level
          });
        };
        //转换数据格式
       return list2tree(jsonData);
      },
      //初始化table数据
      tableDataInit(){
        const _this=this;
        let page = {
          'number':1,
          'size':4000
        };
        muenList().then(result=>{
          let theData=_this.dataFormat(result.body.list);
          _this.pageData=result.body.list;
          _this.data1 =theData;
          console.log(_this.data1)
        })
      },
      treeCheckCode(code){
        if((code+"").length % 2 == 0){
          return code+"";
        }else {
          return code;
        }
      },
      //添加子级别
      append(data) {
        let _this=this;
        if(_this.sign==true){
          _this.$message({
            message: '请先保存新增数据！',
            type: 'warning'
          });
          return;
        }
        if(data.level===5){
          _this.$message({
            message: '该菜单不可添加子菜单！',
            type: 'warning'
          });
          return;
        }
        let obj={
          "parentId": data.id,
          "id": _this.getUUid(),
          "description": '',
          "code": '',
          "level": parseInt(data.level)+1
        };
        _this.pageData.push(obj);
        let a=_this.dataFormat(_this.pageData);
        _this.data1=a;
        _this.sign=true;
        _this.treeStatus.push(data.id);
      },
    }
  };

</script>

<style lang="scss" scoped>
  .table-button {
    float: right;
    width: 18px;
    height: 36px;
    margin-right: 12px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .ml120{
    margin-left:120px;
    width: 100px;
    text-align: left;
  }
  .table-tree {
    width: 360px;
    .table-head {
      height: 28px;
      line-height: 28px;
      text-align: center;
      background-color: #eef1f6;
     // border: 1px solid #d1dbe5;
      border-bottom: none;
      div:first-child {
        border-right: 1px solid #d1dbe5;
      }

    }
    .table-tr {
      display: block;
      overflow: hidden;
      .table-button {
        float: right;
        width: 18px;
        height: 36px;
        margin-right: 12px;
      }
      .table-text {
        display: block;
        overflow: hidden;
        span:last-child {
          display: block;
          overflow: hidden;
        }
        span:first-child {
          float: right;
          width: 150px;
          height: 36px;
          padding-left: 10px;
          border-left: 1px solid #d1dbe5;
        }
      }
    }
  }
</style>
