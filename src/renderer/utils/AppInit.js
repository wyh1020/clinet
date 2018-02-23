import axios from 'axios'
const fs = require('fs')
const path = require('path');
// console.log(process.env)
// 服务器配置文件
let pathHome = ''
let pathSystem = ''
if (process.env.USERPROFILE) {
  pathHome = process.env.USERPROFILE
  pathSystem = '\\clinet-data\\system'
} else {
  pathHome = process.env.HOME
  pathSystem = '/clinet-data/system'
}

const serverFile = path.format({
  dir: path.join(pathHome, pathSystem),
  base: 'hitb_server.csv'
});
export function s1() {
  if (!fs.existsSync(serverFile)) {
    const data = '服务器名称,IP地址,PORT端口,连接设置\n远程测试服务器,139.129.165.56,3010,'
    fs.writeFile(serverFile, data, (err) => {
      console.log(err)
    })
  }
}
// 导入数据，系统表结构
const tableFile = path.format({
  dir: path.join(pathHome, pathSystem),
  base: 'hitb_table.csv'
});
export function s2() {
  if (!fs.existsSync(tableFile)) {
    axios.get('/static/hitb_table.csv')
      .then((res) => {
        fs.writeFile(tableFile, res.data, (err) => {
          console.log(err)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
// 区块链服务节点
const blockFile = path.format({
  dir: path.join(pathHome, pathSystem),
  base: 'hitb_blockchain.csv'
});
export function s3() {
  if (!fs.existsSync(blockFile)) {
    const data = '服务器名称,IP地址,PORT端口,连接设置\n本地测试服务器,127.0.0.1,4096,'
    fs.writeFile(blockFile, data, (err) => {
      console.log(err)
    })
  }
}

