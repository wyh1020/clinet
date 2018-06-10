const axios = require('axios');

// 查看本地区块链加载状态
export function loaderStatus(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/loader/status`)
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

// 查看区块同步信息
export function loaderStatusSync(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/loader/status/sync`)
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
