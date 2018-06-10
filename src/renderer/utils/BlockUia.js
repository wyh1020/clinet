const axios = require('axios');

// 获取全网所有发行商
export function issuers(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/issuers?offset=0&limit=1`)
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

// 查询指定发行商的信息
export function getIssuer(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/issuers/zhenxi`)
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

// 查看指定发行商的资产
export function getIssuerInfo(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/issuers/zhenxi/assets?offset=0&limit=2`)
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

// 获取全网所有资产信息
export function assets(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/assets?offset=0&limit=2`)
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

// 获取指定资产信息
export function getAsset(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/assets/zhenxi.UIA`)
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

// 获取指定资产的访问控制列表（acl）
export function getAssetAcl(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/assets/zhenxi.UIA/acl/1`)
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

// 获取指定账户所有uia的余额
export function balances(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/balances/AKKHPvQb2A119LNicCQWLZQDFxhGVEY57a`)
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

// 获取指定账户所有资产相关操作记录
export function transactions(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/my/transactions/16358246403719868041?offset=0&limit=2`)
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

// 获取指定账户指定资产的余额
export function getBalance(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/balances/16358246403719868041/IssuerName.CNY`)
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

// 获取指定账户指定资产转账记录
export function getTransaction1(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/transactions/my/16358246403719868041/IssuerName.CNY`)
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

// 获取指定资产转账记录
export function getTransaction2(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/api/uia/transactions/absorb.YLB`)
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
