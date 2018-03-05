// const AschJS = require('asch-js');
const axios = require('axios');

// // const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor';
// // const secondSecret = '123456'

// 获取区块数据
export function blocks(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/blocks?limit=2&offset=0&orderBy=height:desc`)
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

// 获取指定区块的详情
export function getBlock(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/blocks/get?id=6076474715648888747`)
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

// 获取区块链高度
export function getheight(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/blocks/getheight`)
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

// 获取普通转账手续费
export function getFee(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/blocks/getFee`)
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

// 获取里程碑
export function getMilestone(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/blocks/getMilestone`)
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

// 查看单个区块奖励
export function getReward(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/blocks/getReward`)
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

// 获取XAS当前供应值
export function getSupply(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/blocks/getSupply`)
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

// 区块链状态
export function getStatus(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/blocks/getStatus`)
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

// 获取指定区块的交易信息
export function blockInfo(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/blocks/full?height=2392`)
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
