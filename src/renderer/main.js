import $ from 'jquery';
import Vue from 'vue';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import App from './App';
import router from './router';
import store from './store';
import {s1, s2, s3} from './utils/server.js';

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
let pathHome = ''
let pathData = ''
let pathSystem = ''
let pathLoaded = ''
let pathCompare = ''
let pathUser = ''
let pathLibrary = ''
let pathStat = ''
if (process.env.USERPROFILE) {
  pathHome = process.env.USERPROFILE
  pathData = '\\clinet-data'
  pathSystem = '\\system'
  pathLoaded = '\\loaded'
  pathCompare = '\\compare'
  pathUser = '\\user'
  pathLibrary = '\\library'
  pathStat = '\\stat'
} else {
  pathHome = process.env.HOME
  pathSystem = '/system'
  pathData = '/clinet-data'
  pathSystem = '/system'
  pathLoaded = '/loaded'
  pathCompare = '/compare'
  pathUser = '/user'
  pathLibrary = '/library'
  pathStat = '/stat'
}

if (!pathHome) { pathHome = process.env.HOME }
const hitbdata = path.join(pathHome, pathData);
if (!fs.existsSync(hitbdata)) { fs.mkdirSync(hitbdata) }
const hitbdataSystem = path.join(hitbdata, pathSystem);
if (!fs.existsSync(hitbdataSystem)) { fs.mkdirSync(hitbdataSystem) }
const hitbdataLoaded = path.join(hitbdata, pathLoaded);
if (!fs.existsSync(hitbdataLoaded)) { fs.mkdirSync(hitbdataLoaded) }
const hitbdataCompare = path.join(hitbdata, pathCompare);
if (!fs.existsSync(hitbdataCompare)) { fs.mkdirSync(hitbdataCompare) }
const hitbdataUser = path.join(hitbdata, pathUser);
if (!fs.existsSync(hitbdataUser)) { fs.mkdirSync(hitbdataUser) }
const hitbdataLibrary = path.join(hitbdata, pathLibrary);
if (!fs.existsSync(hitbdataLibrary)) { fs.mkdirSync(hitbdataLibrary) }
const hitbdataStat = path.join(hitbdata, pathStat);
if (!fs.existsSync(hitbdataStat)) { fs.mkdirSync(hitbdataStat) }
s1()
s2()
s3()
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
const systemHitbTable = path.format({
  dir: hitbdataSystem,
  base: 'hitb_table.csv'
});
// path.join(hitbdataSystem, '\\hitb_table.csv')
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
const systemHitbServer = path.format({
  dir: hitbdataSystem,
  base: 'hitb_server.csv'
});
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
const systemHitbBlockChain = path.format({
  dir: hitbdataSystem,
  base: 'hitb_blockchain.csv'
});
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
