const axios = require('axios');
const qs = require('qs');
// 正则表达式
const regEmail = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
const regTel = /^1[34578]\d{9}$/

//  测试连接服务器
export function sConnect(obj, data) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/servers/connect/`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      if (res.data.success) {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
        obj.$store.commit('SET_NOTICE', '连接成功')
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      }
    } else {
      obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
  })
}
// ------------用户管理
// 注册
export function sRegister(obj, data) {
  // 取出user
  const user = data[2]
  const isEmail = regEmail.test(user.username)
  const isTel = regTel.test(user.tel)
  if (isEmail && isTel && user.password !== '') {
    axios({
      method: 'post',
      url: `http://${data[0]}:${data[1]}/servers/user/`,
      data: qs.stringify({ user: data[2] }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      responseType: 'json'
    }).then((res) => {
      if (res.status === 201) {
        if (res.data.success) {
          obj.$store.commit('SYSTEM_REGISTER_USER', [res.data, '用户创建成功', true])
        } else {
          obj.$store.commit('SYSTEM_REGISTER_USER', [res.data, '用户创建失败,用户名重复', false])
        }
      } else {
        obj.$store.commit('SYSTEM_REGISTER_USER', [res.data, '连接失败', false])
      }
    }).catch((err) => {
      console.log(err);
      obj.$store.commit('SYSTEM_REGISTER_USER', [{}, '连接失败', false])
    })
  } else {
    let info = ''
    if (user.password === '') {
      info = '密码未填写'
    } else if (isEmail) {
      info = '请输入正确的Email地址'
    } else {
      info = '请输入正确的手机号码'
    }
    obj.$store.commit('SYSTEM_REGISTER_USER', [user, info, false])
  }
}
// 登录
export function sLogin(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/login/`,
    data: qs.stringify({ user: data[2] }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.data.login) {
      obj.$store.commit('SYSTEM_SET_USER', ['用户登录成功', res.data])
      obj.$store.commit('SET_NOTICE', '用户登录成功')
    } else {
      obj.$store.commit('SYSTEM_SET_USER', ['用户名或密码错误', res.data])
      obj.$store.commit('SET_NOTICE', '用户登录成功')
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_SET_USER', ['用户登录失败', { username: '', login: false }])
  })
}
// 获取用户列表
export function sGetUsers(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/servers/user/`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_SET_USERS', [data[2], '连接成功'])
      } else {
        obj.$store.commit('SYSTEM_SET_USERS', [data[2], '连接失败'])
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// 更新用户信息
export function sUpdateUser(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/user/${data[2]}`,
    data: qs.stringify({ user: data[3] }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    obj.$store.commit('SYSTEM_SET_USER', ['更新用户信息成功', res.data])
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_SET_USER', ['更新用户信息失败', { username: '', login: false }])
  })
}
// ------------机构管理
// 获取机构信息多条
export function sGetOrg(obj, data) {
  const userOrg = data[2].org
  const userType = data[2].type
  let url = ''
  // 根据用户权限判断取值
  if (userType === 1) {
    url = `http://${data[0]}:${data[1]}/servers/org`
  } else {
    url = `http://${data[0]}:${data[1]}/servers/org?name=${userOrg}`
  }
  axios.get(url)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_GET_ORGS', res.data)
      } else {
        obj.$store.commit('SYSTEM_GET_ORGS', [])
      }
    })
    .catch((err) => {
      console.log(err);
      obj.$store.commit('SYSTEM_GET_ORGS', [])
    });
}
// 新建机构
export function sCreateOrg(obj, data) {
  const org = data[2]
  // 正则判断
  const isEmail = regEmail.test(org.email)
  const isTel = regTel.test(org.tel)
  if (isEmail && isTel) {
    axios({
      method: 'post',
      url: `http://${data[0]}:${data[1]}/servers/org/`,
      data: qs.stringify({ org: { code: org.code, name: org.name, level: org.level, type: org.type, province: org.province, city: org.city, person_name: org.person_name, tel: org.tel, email: org.email, is_show: false, is_ban: false, county: org.county, stat_org_name: '1' } }),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      responseType: 'json'
    }).then((res) => {
      if (res.status === 201) {
        if (res.data.success) {
          obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '机构创建成功', true])
          obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs')
          obj.$store.commit('SET_NOTICE', '机构创建成功')
        } else {
          obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '机构创建失败,机构编码重复', false])
        }
      } else {
        obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '连接失败', false])
      }
    }).catch((err) => {
      console.log(err);
      obj.$store.commit('SYSTEM_NEW_ORG', [{}, '连接失败', false])
    })
  } else {
    let info = ''
    if (isEmail) {
      info = '请输入正确的Email地址'
    } else {
      info = '请输入正确的手机号码'
    }
    obj.$store.commit('SYSTEM_NEW_ORG', [org, info, false])
  }
}
// 获取科室列表([url,port,user])
export function sGetDepart(obj, data) {
  const userOrg = data[2].org
  const userType = data[2].type
  let url = ''
  // 根据用户权限判断取值
  if (userType === 1) {
    url = `http://${data[0]}:${data[1]}/servers/customize_department`
  } else {
    url = `http://${data[0]}:${data[1]}/servers/customize_department?name=${userOrg}`
  }
  axios.get(url)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_GET_DEPAETMENTS', res.data)
      } else {
        obj.$store.commit('SYSTEM_GET_DEPAETMENTS', [])
      }
    })
    .catch((err) => {
      console.log(err);
      obj.$store.commit('SYSTEM_GET_DEPAETMENTS', [])
    });
}
// 新建科室([url,port,user,obj])
export function sCreateDepart(obj, data) {
  const user = data[2]
  const department = data[3]
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/customize_department/`,
    data: qs.stringify({ customize_department: { wt_code: department.code, wt_name: department.name, c_user: user.username, class: department.class, department: department.department, cherf_department: department.cherf_department, professor: department.professor, is_spe: department.is_spe, is_imp: department.is_imp, is_ban: false, org: user.org } }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 201) {
      if (res.data.success) {
        obj.$store.commit('SYSTEM_NEW_DEPAERT', [res.data, '机构创建成功', true])
        obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getDepartments')
      } else {
        obj.$store.commit('SYSTEM_NEW_DEPAERT', [res.data, '机构创建失败,机构编码重复', false])
      }
    } else {
      obj.$store.commit('SYSTEM_NEW_DEPAERT', [res.data, '连接失败', false])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_NEW_DEPAERT', [{}, '连接失败', false])
  })
}
// 2.2.1 获取分析记录
export function sGetStat(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/servers/api/stat_json/`)
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
  axios.get(`http://${data[0]}:${data[1]}/stat/stat_info?id=19057`)
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
  axios.get(`http://${data[0]}:${data[1]}/stat/stat_chart?id=19057&chart_type=radar`)
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
  axios.get(`http://${data[0]}:${data[1]}/stat/download_stat`)
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
    url: `http://${data[0]}:${data[1]}/stat/save_defined/`,
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
  axios.get(`http://${data[0]}:${data[1]}/library/rule`)
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
  axios.get(`http://${data[0]}:${data[1]}/library/search_rule?table=mdc&code=F`)
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


// 2.4.3 更新机构信息
export function sUpdateOrg(obj, data) {
  axios({
    method: 'put',
    url: `http://${data[0]}:${data[1]}/servers/org/3`,
    data: qs.stringify({ org: { name: '医院3' } }),
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
    url: `http://${data[0]}:${data[1]}/servers/customize_department/45`,
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
  axios.get(`http://${data[0]}:${data[1]}/servers/department`)
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
