const axios = require('axios');

// 根据交易id查询存储的数据-1
export function storagesGetById(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/storages/get?id=2ae89f859f20e6e9be7aeef5f7ff7b8c6a457ff712100a1b694436bddd9800c0`)
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

// 根据交易id查询存储的数据-2
export function storagesData(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/storages/2ae89f859f20e6e9be7aeef5f7ff7b8c6a457ff712100a1b694436bddd9800c0`)
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
