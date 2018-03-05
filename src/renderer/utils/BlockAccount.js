// const AschJS = require('asch-js');
const axios = require('axios');

// const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor';
// const keys = AschJS.crypto.getKeys(secret);
// console.log('根据密码生成公钥、私钥');
// console.log(keys);

// const publicKey = keys.publicKey
// const address = AschJS.crypto.getAddress(publicKey);
// console.log('根据公钥生成地址')
// console.log(address)

// const secondSecret = '123456'
// const trans = AschJS.signature.createSignature(secret, secondSecret)
// console.log('设置二级密码')
// console.log(trans)

// const b = AschJS.transaction.createLock(8130, secret, secondSecret)
// console.log('账户锁仓')
// console.log(b)

// /peer相关的api，在请求时都需要设置一个header
// key为magic，testnet value:594fe0f3, mainnet value:5f5b3cf5
// key为version，value为''

// 设置二级密码的交易
// export function transactions(obj, data) {
//   Request
//     .post(`${data[0]}:${data[1]}/peer/transactions`)
//     .send({ transaction: trans })
//     .set('Content-Type', 'application/json')
//     .set('magic', '594fe0f3')
//     .set('version', '')
//     .end((err, res) => {
//       console.log('设置二级密码的交易')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// 本地加密后再登陆
// export function open2(obj, data) {
//   Request
//     .post(`${data[0]}:${data[1]}/api/accounts/open2/`)
//     .send({ publicKey: publicKey })
//     .set('Content-Type', 'application/json')
//     .end((err, res) => {
//       console.log('本地加密后再登陆')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// 本地不加密直接登陆
export function open(obj, data) {
  console.log(`http://${data[0]}:${data[1]}/api/accounts/open/`)
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
      obj.$store.commit('SET_NOTICE', '区块链服务登录失败!')
    }
  }).catch((err) => {
    obj.$store.commit('SET_NOTICE', '区块链服务登录失败!')
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

// 生成公钥
// export function generatePublickey(obj, data) {
//   Request
//     .post(`${data[0]}:${data[1]}/api/accounts/generatePublickey/`)
//     .send({ secret: secret })
//     .set('Content-Type', 'application/json')
//     .end((err, res) => {
//       console.log('生成公钥')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

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

// 设置普通账户为多重签名账户
// export function multisignatures(obj, data) {
//   Request
//     .put(`${data[0]}:${data[1]}/api/multisignatures`)
//     .send({ secret: secret,
//       secondSecret: '123456',
//       min: 2,
//       lifetime: 1,
//       keysgroup: ['+eb48b9ab7c9a34a9b7cdf860265d65b31af774355cabf1b3a387d14a1925dc97', '+d5d7aa157f866c47a2a1e09e2746286ed089fd90976b54fbfa930e87d11609cb'] })
//     .set('Content-Type', 'application/json')
//     .end((err, res) => {
//       console.log('设置普通账户为多重签名账户')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

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

// 非交易发起人对交易进行多重签名
// export function multisignaturesSign(obj, data) {
//   Request
//     .post(`${data[0]}:${data[1]}/api/multisignatures/sign`)
//     .send({ secret: secret,
//       secondSecret: secondSecret,
//       transactionId: '17620378998277022323' })
//     .set('Content-Type', 'application/json')
//     .end((err, res) => {
//       console.log('非交易发起人对交易进行多重签名')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

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

