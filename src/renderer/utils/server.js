import axios from 'axios'
const fs = require('fs')
const path = require('path');

const serverFile = path.format({
  dir: path.join(process.env.USERPROFILE, '\\clinet-data\\system'),
  base: 'hitb_server.csv'
});
export function s1() {
  if (!fs.existsSync(serverFile)) {
    const data = '服务器名称,IP地址,PORT端口,连接设置\n'
    fs.writeFile(serverFile, data, (err) => {
      console.log(err)
    })
  }
}

const tableFile = path.format({
  dir: path.join(process.env.USERPROFILE, '\\clinet-data\\system'),
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

