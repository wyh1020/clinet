// // const AschJS = require('asch-js');
// const Request = require('superagent');

// // const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor';
// // const secondSecret = '123456'

// export function blocks(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/blocks?limit=2&offset=0&orderBy=height:desc`)
//     .end((err, res) => {
//       console.log('获取区块数据')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// export function getBlock(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/blocks/get?id=6076474715648888747`)
//     .end((err, res) => {
//       console.log('获取指定区块的详情')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// export function getheight(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/blocks/getheight`)
//     .end((err, res) => {
//       console.log('获取区块链高度')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// export function getFee(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/blocks/getFee`)
//     .end((err, res) => {
//       console.log('获取普通转账手续费')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// export function getMilestone(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/blocks/getMilestone`)
//     .end((err, res) => {
//       console.log('获取里程碑')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// export function getReward(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/blocks/getReward`)
//     .end((err, res) => {
//       console.log('查看单个区块奖励')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// export function getSupply(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/blocks/getSupply`)
//     .end((err, res) => {
//       console.log('获取XAS当前供应值')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// export function getStatus(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/blocks/getStatus`)
//     .end((err, res) => {
//       console.log('区块链状态')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }

// export function blockInfo(obj, data) {
//   Request
//     .get(`${data[0]}:${data[1]}/api/blocks/full?height=2392`)
//     .end((err, res) => {
//       console.log('获取指定区块的交易信息')
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(res.body)
//       }
//     })
// }
