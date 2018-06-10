const axios = require('axios');
const qs = require('qs');

// /peer相关的api，在请求时都需要设置一个header
// key为magic，testnet value:594fe0f3, mainnet value:5f5b3cf5
// key为version，value为''
export function blockPost(obj, data) {
  // console.log(data)
  const pay = {
    publicKey: data[2].recipientId, amount: data[2].amount, recipientId: data[2].targetAddress, message: data[2].message
  }
  console.log(pay);
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/api/addTransactions`,
    data: qs.stringify(pay),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    async: false,
    responseType: 'json'
  }).then((res) => {
    console.log(res)
    if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_TRANS', res.data)
    }
  })
    .catch((err) => {
      console.log(err);
    });
}
export function transactions1(obj, data) {
  // const targetAddress = data[2].targetAddress;
  // const amount = parseInt(data[2].amount, 10); // 100 XAS
  // const message = data[2].message;
  // const secret = global.hitbdata.blockchain_user;
  // const secondSecret = data[2].secondPassword;
  // const transaction = AschJS.transaction.createTransaction(targetAddress, amount, message, secret, secondSecret || undefined);
  const transaction = {}
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/peer/transactions`,
    data: { transaction: transaction },
    headers: { magic: '594fe0f3', version: '' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
    if (res.status === 200) {
      // obj.$store.commit('BLOCK_SET_TRANS', res.data)
    }
  })
    .catch((err) => {
      console.log(err);
    });
}

// 根据交易id查看交易详情
export function getTransactionsById(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/transactions/get?id=${data[2]}`)
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

// 根据未确认交易id查看详情
export function transactionsUnconfirmed(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/transactions/unconfirmed/get?id=${data[2]}`)
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

export function transactionsUnconfirmedAll(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/getTransactions`)
    .then((res) => {
      console.log(res)
      if (res.status === 200) {
        obj.$store.commit('BLOCK_SET_TRANSUN', res.data.data)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
