## 介绍
用于查询电费信息。昌大助手的组件。
## 运行方式
```javascript
npm install ncu-electricity --save
```
```
var ele = require('ncu-electricity')
// 填写寝室号
ele.getInfo(dormitory)
  .then(data => {
    // 对获取到的电费数据进行操作
  })
  .catch(err => {
    // 错误处理
  })

将要查找的图书地址，放入一个json文件中即可。
## 开发
```
git clone https://github.com/Lxxyx/ncu-electricity
cd ncu-electricity
npm install
gulp
```
### 测试
全局安装mocha
```
npm i mocha -g
```
然后:
```
npm test
```