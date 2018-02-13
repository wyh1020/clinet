const AschJS = require('asch-js');
const Request = require('superagent');

const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor';
const secondSecret = '123456'

const content = new Buffer('helloworld').toString('hex')
const trans = AschJS.storage.createStorage(content, secret, secondSecret)
console.log('创建存储交易')
console.log(trans)

export function storages() {
  Request
    .put('127.0.0.1:4096/api/storages')
    .send({ secret: secret,
      secondSecret: secondSecret,
      content: content,
      encode: 'base64',
      wait: 1 })
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      console.log('上传数据(直接上传)')
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}

export function transactions() {
  Request
    .post('127.0.0.1:4096/peer/transactions')
    .send({ transaction: trans })
    .set('Content-Type', 'application/json')
    .set('magic', '594fe0f3')
    .set('version', '')
    .end((err, res) => {
      console.log('上传数据(签名后再上传)')
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}

export function storagesGetById() {
  Request
    .get('127.0.0.1:4096/api/storages/get?id=2ae89f859f20e6e9be7aeef5f7ff7b8c6a457ff712100a1b694436bddd9800c0')
    .end((err, res) => {
      console.log('根据交易id查询存储的数据-1')
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}

export function storagesData() {
  Request
    .get('127.0.0.1:4096/api/storages/2ae89f859f20e6e9be7aeef5f7ff7b8c6a457ff712100a1b694436bddd9800c0')
    .end((err, res) => {
      console.log('根据交易id查询存储的数据-2')
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}

