// const AschJS = require('asch-js');
const axios = require('axios');

// const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor';
// const secondSecret = '123456'
// const name = 'IssuerName'
// const desc = 'IssuerDesc'
// const a = AschJS.uia.createIssuer(name, desc, secret, secondSecret)
// console.log('资产发行商注册')
// console.log(a)

// const currency = 'IssuerName.CNY';
// // const maximum = '1000000';
// // const precision = 3;
// // const strategy = '';
// // const b = AschJS.uia.createAsset(currency, desc, maximum  , precision, strategy, secret, secondSecret)
// // console.log('资产注册')
// // console.log(b)

// let flagType = 1 // 资产是否注销，1：流通，2：注销
// const flag = 1 // 访问控制列表的类型，0：黑名单， 1：白名单，资产创建后默认为黑名单模式
// const c = AschJS.uia.createFlags(currency, flagType, flag, secret, secondSecret)
// console.log('资产设置访问控制列表(acl)模式')
// console.log(c)

// const operator = '+'
// const list = ['15745540293890213312']
// const d = AschJS.uia.createAcl(currency, operator, flag, list, secret, secondSecret)
// console.log('更新访问控制列表')
// console.log(d)

// const amount = '100000'
// const e = AschJS.uia.createIssue(currency, amount, secret, secondSecret)
// console.log('资产发行')
// console.log(e)

// const recipientId = 'AKKHPvQb2A119LNicCQWLZQDFxhGVEY57a' // 接收地址
// const f = AschJS.uia.createTransfer(currency, amount, recipientId, secret, secondSecret)
// console.log('资产转账')
// console.log(f)

// flagType = 2
// const g = AschJS.uia.createFlags(currency, flagType, flag, secret, secondSecret)
// console.log('资产注销')
// console.log(g)

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
