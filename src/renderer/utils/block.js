// const AschJS = require('asch-js');
const agent = require('superagent');
// const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor';
// const secondSecret = '123456'

export default function s1() {
  agent
    .get('http://127.0.0.1:4096/api/blocks/getheight')
    .end((err, res) => {
      console.log('docker-0')
      if (err) {
        console.log('err')
      } else {
        console.log(res.body)
      }
    })
  return null
}
