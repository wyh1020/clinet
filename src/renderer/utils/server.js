import axios from 'axios'
const fs = require('fs')
const path = require('path');
const agent = require('superagent');

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

export function sGetUser(obj, data, index) {
  agent.get(`http://${data[1]}:${data[2]}/hospitals/user/`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [index, '连接失败'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [index, '连接成功'])
        console.log(res.body)
      }
    })
}

export function sLogin(obj, data) {
  agent.post(`http://${data[1]}:${data[2]}/hospitals/login/`)
    .send({ user: { username: 'test1000', password: 'test' } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}

export function sRegister(obj, data) {
  console.log(data)
  agent.post(`http://${data[1]}:${data[2]}/hospitals/user/`)
    .send({ user: { username: 'test', password: 'test', org: 'test', age: 20, tel: '13245678900', email: 'test@test.com', name: 'test', type: 1 } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
