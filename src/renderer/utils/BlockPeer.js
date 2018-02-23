// const AschJS = require('asch-js');
// const Request = require('superagent');
const axios = require('axios');
axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';

export function serverStatus(obj, data) {
  // Request
  //   .get(`${data[0]}:${data[1]}`)
  //   .end((req, res) => {
  //     // console.log(res.statusCode === 200)
  //     if (res && res.statusCode === 200) {
  //       obj.$store.commit('BLOCK_SET_SERVER_STATUS', [data[2], '连接成功'])
  //     } else {
  //       console.log(res)
  //     }
  //   })

  axios.get(`http://${data[0]}:${data[1]}`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('BLOCK_SET_SERVER_STATUS', [data[2], '连接成功'])
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function peers(obj, data) {
  // Request
  //   .get(`${data[0]}:${data[1]}/api/peers?limit=2`)
  //   .end((req, res) => {
  //     console.log('获取本机连接的所有节点信息')
  //     if (res) {
  //       console.log(res.body)
  //     }
  //   })

  axios.get(`http://${data[0]}:${data[1]}/api/peers?limit=2`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// export function peersVersion(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/peers/version`)
//     .end((req, res) => {
//       console.log('获取本节点版本号等信息')
//       if (res) {
//         console.log(res.body)
//       }
//     })
// }

// export function peersGetIp(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/peers/get?ip=192.168.0.1&port=4096`)
//     .end((req, res) => {
//       console.log('获取指定ip节点信息')
//       if (res) {
//         console.log(res.body)
//       }
//     })
// }

// export function peerList(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/peer/list`)
//     .set('magic', '594fe0f3')
//     .set('version', '')
//     .end((req, res) => {
//       console.log('查找dapp peer')
//       if (res) {
//         console.log(res.body)
//       }
//     })
// }

// export function peerBlocks(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/peer/blocks/common`)
//     .set('magic', '594fe0f3')
//     .set('version', '')
//     .end((req, res) => {
//       console.log('查找common block')
//       if (res) {
//         console.log(res.body)
//       }
//     })
// }

