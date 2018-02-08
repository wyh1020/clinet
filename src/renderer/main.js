import $ from 'jquery';
import Vue from 'vue';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import App from './App';
import router from './router';
import store from './store';

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
// 读取系统初始化文件
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const hitbdata = []
const file = path.format({ dir: 'C:\\hitbdata\\system\\hitb_table.csv' });
global.hitbdata = {};
if(fs.existsSync(file)){
  const fRead = fs.createReadStream(file);
  const fReadline = readline.createInterface({ input: fRead });
  const f = [];
  const table = {};
  
  fReadline.on('close', () => {
    // 将初始化数据转换为js对象
    f.shift();
    f.forEach((line)=>{
      let x = line.split(',');
      if(!table[x[0]]){table[x[0]] = [];}
      const a = x.shift();
      table[a].push(x);
    })
    global.hitbdata['table'] = table;
  });

  fReadline.on('line', (line) => {
    f.push(line)
  })
}else{
  console.log('读取系统初始化文件失败，请重新下载，放到C盘的hitbdata/system目录下');
}

