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
const file = path.format({ dir: 'C:\\hitbdata\\system\\hitb_data.csv' });
if(fs.existsSync(file)){
  const fRead = fs.createReadStream(file);
  const fReadline = readline.createInterface({ input: fRead });
  const f = [];
  fReadline.on('close', () => {
    // todo：此处要将初始化数据转换为js对象
    global.hitbdata = f;
    console.log('readline close...');
  });
  fReadline.on('line', (line) => {
    f.push(line)
  })
}else{
  console.log('读取系统初始化文件失败，请重新下载，放到C盘的hitbdata/system目录下')
}

