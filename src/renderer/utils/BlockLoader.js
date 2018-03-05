// const AschJS = require('asch-js');
const axios = require('axios');

// AschJS.options.set('secret', 'minor borrow display rebel depart core buzz right distance avocado immense push')

// const secret = AschJS.options.get('secret')
// console.log('获取一个option')
// console.log(secret)

// const option = AschJS.options.getAll()
// console.log('获取全部option')
// console.log(option)

// const initTime = AschJS.utils.slots.beginEpochTime()
// console.log('Asch主网创世块生成时间')
// console.log(initTime)

// const nowTimeAsch = AschJS.utils.slots.getTime()
// console.log('当前时间戳，相对于Asch纪元经历的秒数')
// console.log(nowTimeAsch)

// const nowTime = AschJS.utils.slots.getRealTime(nowTimeAsch)
// console.log('真实的 unix时间戳* 1000，毫秒单位')
// console.log(nowTime)

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

