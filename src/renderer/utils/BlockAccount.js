// const AschJS = require('asch-js');
const axios = require('axios');
const qs = require('qs');
export function open(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/api/open/`,
    data: qs.stringify({ username: data[2] }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      console.log(res)
      obj.$store.commit('SET_NOTICE', '区块链服务登录成功!');
      obj.$store.commit('BLOCK_SET_ACCOUNT', res.data.user);
      // obj.$store.commit('BLOCK_SET_TRANS', res.data.transactions)
      obj.$store.commit('BLOCK_SET_BLOCKCHAIN', res.data)
    } else {
      obj.$store.commit('SET_NOTICE', '未注册用户登陆！');
    }
  }).catch((err) => {
    obj.$store.commit('SET_NOTICE', '未注册用户登陆！');
    console.log(err)
  })
}
// 本地不加密直接登陆
export function open3(obj, data) {
  const serverIp = '127.0.0.1'
  const serverPort = '80'
  console.log(`http://${serverIp}:${serverPort}/block/blockchain/`)
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/api/accounts/open/`,
    data: { secret: data[2] },
    headers: { 'Content-Type': 'application/json' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
    if (res.status === 200) {
      obj.$store.commit('SET_NOTICE', '区块链服务登录成功!')
      obj.$store.commit('BLOCK_SET_ACCOUNT', res.data.account)
    } else {
      obj.$store.commit('SET_NOTICE', '未注册用户登陆！');
    }
  }).catch((err) => {
    obj.$store.commit('SET_NOTICE', '未注册用户登陆！');
    console.log(err)
  })
}

// 根据地址获取账户信息
export function accounts(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/accounts?address=${data[2]}`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取账户余额
export function getBalance(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/accounts/getBalance?address=${data[2]}`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 根据地址获取账户公钥
export function getPublickey(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/accounts/getPublickey?address=${data[2]}`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 根据地址获取其投票列表
export function delegatesAddress(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/accounts/delegates?address=${data[2]}`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取受托人手续费设置
export function delegatesFee(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/accounts/delegates/fee`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 给受托人投票
// export function delegates(obj, data) {
//   Request
//     .put(`${data[0]}:${data[1]}/api/accounts/delegates/`)
//     .send({ secret: secret,
//       publicKey: publicKey,
//       delegates: [`+${address}`]
//     }).set('Content-Type', 'application/json')
//     .end((err, res) => {
//       console.log('给受托人投票')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// 生成新账户
export function accountsNew(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/accounts/new`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取账户排行榜前100名
export function accountsTop(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/accounts/top?limit=2&offset=0`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取当前链上账户总个数
export function accountsCount(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/accounts/count`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 设置二级密码
// export function signatures(obj, data) {
//   Request
//     .put(`${data[0]}:${data[1]}/api/signatures`)
//     .send({ secret: secret, secondSecret: '123456' })
//     .set('Content-Type', 'application/json')
//     .set('magic', '5f5b3cf5')
//     .set('version', '')
//     .end((err, res) => {
//       console.log('设置二级密码')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// 获取二级密码设置手续费
export function signaturesFee(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/signatures/fee`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 根据公钥获取挂起的多重签名交易详情
export function multisignaturesPending(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/multisignatures/pending?publicKey=2cef5711e61bb5361c544077aa08aebc4d962a1d656571901c48d716382ad4fd`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取多重签名账户信息
export function multisignaturesAccounts(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/multisignatures/accounts?publicKey=eb48b9ab7c9a34a9b7cdf860265d65b31af774355cabf1b3a387d14a1925dc97`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_PEERS', res.data.peers)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// 获取用户地址
export function getAccountsPublicKey(obj, data) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/api/getAccountsPublicKey?username=${data[2]}`,
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      console.log(res.data.publicKeys)
      obj.$store.commit('BLOCK_GET_PUBLICKEYS', res.data.publicKeys)
    } else {
      obj.$store.commit('SET_NOTICE', '未注册用户登陆！');
    }
  }).catch((err) => {
    obj.$store.commit('SET_NOTICE', '未注册用户登陆！');
    console.log(err)
  })
}
