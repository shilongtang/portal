## 项目启动

``` bash
# 安装包
npm install
(推荐使用 cnpm i)

# 运行开发环境
npm run dev

# 打包
npm run build

# 打包并显示包依赖图
npm run build --report

# 运行单元测试
npm run unit

```
## app说明
```
APP存放目录：src/apps/{appName}
api文件：api.js
常量文件：constant.js
路由文件：router.js
入口文件：index.js
```
###注意
```
app相互引用必须通过入口文件引入
