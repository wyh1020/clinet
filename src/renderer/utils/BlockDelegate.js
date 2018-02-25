// const AschJS = require('asch-js');
const axios = require('axios');

// const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor';
// const secondSecret = '123456'

// const userName = '张三'
// const a = AschJS.delegate.createDelegate(userName, secret, secondSecret || undefined)
// console.log('注册受托人')
// console.log(a)

// // 投票内容是一个列表，列表中的每一个元素是一个符号加上所选择的受托人的公钥，符号为+表示投票，符号为-表示取消投票
// const voteContent = [
//   '-ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7',
//   '+c292db6ea14d518bc29e37cb227ff260be21e2e164ca575028835a1f499e4fe2'
// ];
// const b = AschJS.vote.createVote(voteContent, secret, secondSecret || undefined);
// console.log('给受托人增加/取消投票')
// console.log(b)

// 注册受托人
// export function delegates(obj, data) {
//   Request
//     .put(`${data[0]}:${data[1]}/api/delegates`)
//     .send({ secret: secret, username: 'delegate_0821' })
//     .set('Content-Type', 'application/json')
//     .end((err, res) => {
//       console.log('注册受托人')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// 获取受托人总个数
export function delegatesCount(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/delegates/count`)
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

// 获取受托人列表
export function delegatesList(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/delegates?orderby=approval:desc&limit=2`)
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

// 根据受托人公钥查看哪些人为其投了票
export function delegatesVoters(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/delegates/voters?publicKey=ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7`)
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

// 根据公钥获取受托人详情
export function getDelegatesByKey(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/delegates/get?publicKey=bd1e78c5a10fbf1eca36b28bbb8ea85f320967659cbf1f7ff1603d0a368867b9`)
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

// 根据用户名获取受托人详情
export function getDelegatesByName(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/delegates/get?username=delegate_register`)
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

// 获取受托人设置的转账费
export function delegatesFee(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/delegates/fee?publicKey=ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7`)
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

// 根据公钥查看其锻造情况
export function getForgedByAccount(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/delegates/forging/getForgedByAccount?generatorPublicKey=ae256559d06409435c04bd62628b3e7ea3894c43298556f52b1cfb01fb3e3dc7`)
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

// 受托人开启锻造
// export function forgingEnable(obj, data) {
//   Request
//     .post(`${data[0]}:${data[1]}/api/delegates/forging/enable/`)
//     .send({ secret: secret })
//     .set('Content-Type', 'application/json')
//     .end((err, res) => {
//       console.log('受托人开启锻造')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// 受托人关闭锻造
// export function forgingDisable(obj, data) {
//   Request
//     .post(`${data[0]}:${data[1]}/api/delegates/forging/disable/`)
//     .send({ secret: secret })
//     .set('Content-Type', 'application/json')
//     .end((err, res) => {
//       console.log('受托人关闭锻造')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// 受托人锻造状态查看
export function forgingStatus(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/delegates/forging/status?publicKey=fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575`)
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

