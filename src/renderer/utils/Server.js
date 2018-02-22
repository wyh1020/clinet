const axios = require('axios');
const qs = require('qs');

// 2.1.1 注册
export function sRegister(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/user/`,
    data: qs.stringify({ user: { username: 'test30', password: 'test', org: 'test', age: 20, tel: '13245678900', email: 'test@test.com', name: 'test', type: 1 } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.1.2 登录
export function sLogin(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/login/`,
    data: qs.stringify({ user: { username: 'test30', password: 'test' } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.1.3 获取用户列表
export function sGetUser(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/user/`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.1.4 更新用户信息
export function sUpdateUser(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/user/1`,
    data: qs.stringify({ user: { age: 21 } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.2.1 获取分析记录
export function sGetStat(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/api/stat_json/`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.2.2 分析记录的同比环比数据
export function sGetStatInfo(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/api/stat_info?id=19057`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.2.3 分析记录的同比环比图
export function sGetStatInfoChart(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/api/stat_chart?id=19057&chart_type=radar`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.2.4 下载分析记录
export function sdownLoadStatInfo(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/api/download_stat`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.2.5 保存用户自定义分析
export function sSaveDefined(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/api/save_defined/`,
    data: qs.stringify({ username: 'hitb', key: ['fee_avg'] }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.3.1 规则字典库查询
export function sGetRule(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/api/rule`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.3.2 规则搜索
export function sSearchRule(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/api/search_rule?table=mdc&code=F`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.4.1 获取机构列表
export function sGetOrg(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/org`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.4.2 新建机构
export function sCreateOrg(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/org/`,
    data: qs.stringify({ org: { code: 'test03', name: '医院2', level: '三级', type: '综合医院', province: '北京市', city: '北京市', person_name: 'dzc', tel: '18515290901', email: 'duanzhichao2008@gmail.com', is_show: true, is_ban: true, county: '海淀区', stat_org_name: '3' } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.4.3 更新机构信息
export function sUpdateOrg(obj, data) {
  axios({
    method: 'put',
    url: `http://${data[0]}:${data[1]}/hospitals/org/3`,
    data: qs.stringify({ org: { name: '医院3' } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.4.4 获取科室列表
export function sGetDepart(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/customize_department`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.4.5 新建科室
export function sCreateDepart(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/customize_department/`,
    data: qs.stringify({ customize_department: { wt_code: 'test03', wt_name: '医院2', c_user: 'hitb', class: '03-内科', department: '0303-神经内科专业', cherf_department: 'a', professor: 'b', is_spe: true, is_imp: true, is_ban: true, org: 'test1' } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.4.6 更新科室信息
export function sUpdateDepart(obj, data) {
  axios({
    method: 'put',
    url: `http://${data[0]}:${data[1]}/hospitals/customize_department/45`,
    data: qs.stringify({ customize_department: { wt_name: 'test04' } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.4.7 获取标准科室列表
export function sGetSystemDepart(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/department`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.5.1 病案上传
export function sUploadDoc(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/json_upload/`,
    data: qs.stringify({ doc: { wt_code: 'test03', wt_name: '医院2' } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.5.2 病案校验
export function sCheckDoc(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/json_check/`,
    data: qs.stringify({ doc: { wt_code: 'test03', wt_name: '医院2' } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.5.3 病案导入
export function sInsertDoc(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/hospitals/wt4_insert`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
// 2.6.1 统计分析
export function sStatDoc(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/api/stat/`,
    data: qs.stringify({ username: 'hitb', password: 'test123456' }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
// 2.6.2 调用单条分组（跳转到分组服务器）
export function sCompDrg(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/hospitals/api/comp_drg/`,
    data: qs.stringify({ B_WT4_V1_ID: 70235613, DISEASE_CODE: 'H25.901', AGE: 20, GENDER: '男', SF0100: -1, SF0102: -1, SF0104: -1, SF0108: -1, ACCTUAL_DAYS: 13, TOTAL_EXPENSE: 348128.74, diags_code: [], opers_code: ['00.31001', '02.93002', '86.98001', '87.03001'] }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
