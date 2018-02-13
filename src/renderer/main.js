import $ from 'jquery';
import Vue from 'vue';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import App from './App';
import router from './router';
import store from './store';
import {s1, s2, s3} from './utils/server.js';
s1()
s2()
s3()
// const ipc = require('electron').ipcRenderer

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

// ipc.send('asynchronous-message', 'ping')
// ipc.on('asynchronous-reply', function (event, arg) {
//   const message = `异步消息回复: ${arg}`
//   hitbdata.push(message)
//   console.log(hitbdata)
// })

// 文件保存位置
const fs = require('fs');
const path = require('path');
const hitbdata = path.join(process.env.USERPROFILE, '\\clinet-data');
if (!fs.existsSync(hitbdata)) { fs.mkdirSync(hitbdata) }
const hitbdataSystem = path.join(hitbdata, '\\system');
if (!fs.existsSync(hitbdataSystem)) { fs.mkdirSync(hitbdataSystem) }
const hitbdataLoaded = path.join(hitbdata, '\\loaded');
if (!fs.existsSync(hitbdataLoaded)) { fs.mkdirSync(hitbdataLoaded) }
const hitbdataCompare = path.join(hitbdata, '\\compare');
if (!fs.existsSync(hitbdataCompare)) { fs.mkdirSync(hitbdataCompare) }
const hitbdataUser = path.join(hitbdata, '\\user');
if (!fs.existsSync(hitbdataUser)) { fs.mkdirSync(hitbdataUser) }
const hitbdataLibrary = path.join(hitbdata, '\\library');
if (!fs.existsSync(hitbdataLibrary)) { fs.mkdirSync(hitbdataLibrary) }
const hitbdataStat = path.join(hitbdata, '\\stat');
if (!fs.existsSync(hitbdataStat)) { fs.mkdirSync(hitbdataStat) }
// 设置应用系统的全局变量-文件存储位置
global.hitbdata = {};
global.hitbdata['path'] = {
  home: hitbdata,
  system: hitbdataSystem,
  loaded: hitbdataLoaded,
  compare: hitbdataCompare,
  user: hitbdataUser,
  library: hitbdataLibrary,
  stat: hitbdataStat
};
// 读取系统初始化文件-数据表结构
const systemHitbTable = path.join(hitbdataSystem, '\\hitb_table.csv')
const readline = require('readline');
if(fs.existsSync(systemHitbTable)){
  const fRead = fs.createReadStream(systemHitbTable);
  const fReadline = readline.createInterface({ input: fRead });
  const f = []; // 将CSV文件逐行读到数组中
  const t = {}; // 将数组逐行转换为js对象
  
  fReadline.on('close', () => {
    f.shift();
    f.forEach((line)=>{
      let x = line.split(',');
      if(!t[x[0]]){t[x[0]] = [];}
      const a = x.shift();
      t[a].push(x);
    })
    global.hitbdata['table'] = t;
  });

  fReadline.on('line', (line) => {
    f.push(line)
  })
}else{
  console.log('读取系统初始化文件失败!');
}
// 读取系统初始化文件-远程服务器节点列表
const systemHitbServer = path.join(hitbdataSystem, '\\hitb_server.csv')
if(fs.existsSync(systemHitbServer)){
  const fRead = fs.createReadStream(systemHitbServer);
  const fReadline = readline.createInterface({ input: fRead });
  const f = []; // 将CSV文件逐行读到数组中
  const t = {}; // 将数组逐行转换为js对象
  
  fReadline.on('close', () => {
    f.shift();
    f.forEach((line)=>{
      let x = line.split(',');
      if(!t[x[0]]){t[x[0]] = [];}
      const a = x.shift();
      t[a].push(x);
    })
    global.hitbdata['server'] = t;
  });

  fReadline.on('line', (line) => {
    f.push(line)
  })
}else{
  console.log('读取系统初始化文件失败!');
}
// 读取系统初始化文件-区块链服务器节点列表
const systemHitbBlockChain = path.join(hitbdataSystem, '\\hitb_blockchain.csv')
if(fs.existsSync(systemHitbBlockChain)){
  const fRead = fs.createReadStream(systemHitbBlockChain);
  const fReadline = readline.createInterface({ input: fRead });
  const f = []; // 将CSV文件逐行读到数组中
  const t = {}; // 将数组逐行转换为js对象
  
  fReadline.on('close', () => {
    f.shift();
    f.forEach((line)=>{
      let x = line.split(',');
      if(!t[x[0]]){t[x[0]] = [];}
      const a = x.shift();
      t[a].push(x);
    })
    global.hitbdata['blockchain'] = t;
  });

  fReadline.on('line', (line) => {
    f.push(line)
  })
}else{
  console.log('读取系统初始化文件失败!');
}
