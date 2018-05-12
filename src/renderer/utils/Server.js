const axios = require('axios');
const qs = require('qs');
const AschJS = require('asch-js');
// 正则表达式
const regEmail = /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
const regTel = /^1[34578]\d{9}$/
const ChartScatter = require('./ChartScatter');
const ChartRadar = require('./ChartRadar');
const ChartBar = require('./ChartBar');
const ChartLine = require('./ChartLine');
const ChartPie = require('./ChartPie');
const ChartData = require('./ChartData');

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
        obj.$store.commit('SET_NOTICE', '连接失败')
      }
    } else {
      obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      obj.$store.commit('SET_NOTICE', '连接失败')
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
    obj.$store.commit('SET_NOTICE', '连接失败')
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
          obj.$store.commit('SET_NOTICE', '用户创建成功')
          obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getUsers')
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
  // console.log(data)
  const secret = 'someone manual strong movie roof episode eight spatial brown soldier soup motor';
  const keys = AschJS.crypto.getKeys(secret)
  const publicKey = keys.publicKey
  const privateKey = keys.privateKey
  const address = AschJS.crypto.getAddress(publicKey)
  const user = { username: data[2].username, password: data[2].password, address: address, privateKey: privateKey, publicKey: publicKey, secret: secret }
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/login/`,
    data: qs.stringify({ user: user }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.data.login) {
      obj.$store.commit('SYSTEM_SET_USER', ['用户登录成功', res.data])
      obj.$store.commit('SYSTEM_SET_SERVER', ['', data[0], data[1]])
      obj.$store.commit('SYSTEM_SET_CONNECT_INFO', true)
      obj.$store.commit('SET_NOTICE', '远程服务用户登录成功')
    } else {
      obj.$store.commit('SYSTEM_SET_USER', ['用户登录失败', { username: '', org: '', type: 2, login: false }])
      obj.$store.commit('SYSTEM_SET_SERVER', ['', '', ''])
      obj.$store.commit('SYSTEM_SET_CONNECT_INFO', false)
      obj.$store.commit('SET_NOTICE', '用户名或密码错误,使用未注册用户登陆！');
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SET_NOTICE', '连接错误,使用未注册用户登陆！');
  })
}
// 获取用户列表
export function sGetUsers(obj, data) {
  axios.get(`http://${data[0]}:${data[1]}/servers/user/`)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_GET_USERS', res.data)
      } else {
        // obj.$store.commit('SYSTEM_SET_USERS', [data[2], '连接失败'])
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
    url: `http://${data[0]}:${data[1]}/servers/user_update/`,
    data: qs.stringify({ id: data[2], user: data[3] }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (obj.$store.state.System.toolbar !== 'getPersons') {
      const objs = res.data.data
      objs.login = true
      obj.$store.commit('SYSTEM_SET_USER', ['更新用户信息成功', res.data.data])
    }
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
  const page = data[3]
  let url = ''
  // 根据用户权限判断取值
  if (userType === 1) {
    url = `http://${data[0]}:${data[1]}/servers/org?page=${page}`
  } else {
    url = `http://${data[0]}:${data[1]}/servers/org?name=${userOrg}&page=${page}`
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
// 更新机构信息
export function sUpdateOrg(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/org_update`,
    data: qs.stringify({ id: data[2], org: data[3] }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 201) {
      if (res.data.success) {
        obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '机构更新成功', true])
        obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getOrgs')
        obj.$store.commit('SET_NOTICE', '机构更新成功')
      } else {
        obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '机构更新失败', false])
      }
    } else {
      obj.$store.commit('SYSTEM_NEW_ORG', [res.data, '连接失败', false])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_NEW_ORG', [{}, '连接失败', false])
  })
}
// 获取科室列表([url,port,user])
export function sGetDepart(obj, data) {
  const userOrg = data[2].org
  const userType = data[2].type
  const page = data[3]
  let url = ''
  // 根据用户权限判断取值
  if (userType === 1) {
    url = `http://${data[0]}:${data[1]}/servers/customize_department?page=${page}`
  } else {
    url = `http://${data[0]}:${data[1]}/servers/customize_department?name=${userOrg}&page=${page}`
  }
  axios.get(url)
    .then((res) => {
      if (res.status === 200) {
        obj.$store.commit('SYSTEM_GET_DEPARTMENTS', res.data)
      } else {
        obj.$store.commit('SYSTEM_GET_DEPARTMENTS', [])
      }
    })
    .catch((err) => {
      console.log(err);
      obj.$store.commit('SYSTEM_GET_DEPARTMENTS', [])
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
    console.log(res)
    if (res.status === 201) {
      if (res.data.success) {
        obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '科室创建成功', true])
        // obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getDepart')
        obj.$store.commit('SET_NOTICE', '科室创建成功')
      } else {
        obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '科室创建失败,机构编码重复', false])
        obj.$store.commit('SET_NOTICE', '科室更新失败,机构编码重复')
      }
    } else {
      obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '连接失败', false])
      obj.$store.commit('SET_NOTICE', '连接失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [{}, '连接失败', false])
    obj.$store.commit('SET_NOTICE', '连接失败')
  })
}
// 更新科室信息
export function sUpdateDepart(obj, data) {
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/servers/customize_department_update/`,
    data: qs.stringify({ id: data[2], customize_department: data[3] }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
    if (res.status === 200) {
      if (res.data.success) {
        obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '科室更新成功', true])
        // obj.$store.commit('SYSTEM_SET_TOOLBAR', 'getDepart')
        obj.$store.commit('SET_NOTICE', '科室更新成功')
      } else {
        obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '科室更新失败,机构编码重复', false])
        obj.$store.commit('SET_NOTICE', '科室更新失败,机构编码重复')
      }
    } else {
      obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [res.data, '连接失败', false])
      obj.$store.commit('SET_NOTICE', '连接失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_NEW_DEPARTMENT', [{}, '连接失败', false])
    obj.$store.commit('SET_NOTICE', '连接失败')
  })
}
// ------------病案
// 病案查询
export function sGetWt4(obj, data) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/library/wt4?page=${data[2]}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (data[3] === 'stat') {
      if (res.status === 200) {
        const keys = Object.keys(res.data.data[0])
        const newWt4 = []
        newWt4.push(keys)
        res.data.data.forEach((x) => {
          newWt4.push(keys.map((k) => {
            let a = []
            if (typeof (x[k]) === 'object') {
              if (x[k] !== null) {
                a = x[k].join(',')
              } else {
                a = ''
              }
            } else {
              a = x[k]
            }
            return a
          }))
        })
        res.data.data = newWt4
        // const resObj = { page: parseInt(res.data.page, 10), countPage: res.data.count, data: res.data.stat, pageList: res.data.page_list, tableName: tableName, tableSel: res.data.num, dimensionOrg: res.data.org_num, dimensionTime: res.data.time_num, dimensionDrg: res.data.drg_num }
        const a = res.data
        a.tableSel = res.data.num
        a.dimensionOrg = res.data.org_num
        a.dimensionTime = res.data.time_num
        a.dimensionDrg = res.data.drg_num
        obj.$store.commit('STAT_SET_SERVER_TABLE', a)
        ChartData.default(obj, res.data.data, obj.$store.state.Stat.selectedRow, obj.$store.state.Stat.selectedCol)
        switch (obj.$store.state.Stat.chartLeft) {
          case '柱状图':
            ChartBar.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          case '折线图':
            ChartLine.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          case '雷达图':
            ChartRadar.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          case '散点图':
            ChartScatter.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          case '饼图':
            ChartPie.default('chartLeft', obj.$store.state.Stat.chartData)
            break;
          default: break;
        }
        switch (obj.$store.state.Stat.chartRight) {
          case '柱状图':
            ChartBar.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          case '折线图':
            ChartLine.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          case '雷达图':
            ChartRadar.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          case '散点图':
            ChartScatter.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          case '饼图':
            ChartPie.default('chartRight', obj.$store.state.Stat.chartData)
            break;
          default: break;
        }
      }
    } else if (res.status === 200) {
      obj.$store.commit('SYSTEM_SET_WT4', [res.data, '病案查询成功', true])
    } else {
      obj.$store.commit('SYSTEM_SET_WT4', [{}, '病案查询失败', false])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_SET_WT4', [{}, '连接失败', false])
  })
}
// 分组规则查询
export function sGetCompRule(obj, data) {
  const table = data[2]
  const rule = data[3]
  let code = ''
  switch (table) {
    case 'mdc':
      code = '';
      break;
    case 'adrg':
      code = rule.mdc;
      break;
    case 'drg':
      code = rule.code;
      break;
    default:
      code = '';
  }
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/library/server_rule?table=${table}&code=${code}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SYSTEM_GET_COMPRULE', [res.data, '规则查询成功', true])
    } else {
      obj.$store.commit('SYSTEM_GET_COMPRULE', [{}, '规则查询成功', false])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SYSTEM_GET_COMPRULE', [{}, '连接失败', false])
  })
}
// 单条分组
export function sCompDrg(obj, data, type = '') {
  const dataWt4 = data[2]
  let diagsCode = dataWt4.diags_code
  let opersCode = dataWt4.opers_code
  const version = data[3]
  let url = ''
  switch (version) {
    case 'BJ':
      url = `http://${data[0]}:${data[1]}/drgserverbj/comp_drg/`
      break;
    case 'GB':
      url = `http://${data[0]}:${data[1]}/drgservergb/comp_drg/`
      break;
    case 'CN':
      url = `http://${data[0]}:${data[1]}/drgserver/comp_drg/`
      break;
    default:
      url = `http://${data[0]}:${data[1]}/drgserver/comp_drg/`
  }
  if (dataWt4) {
    if (type !== '') {
      diagsCode = diagsCode.split('-')
      opersCode = opersCode.split('-')
    }
    diagsCode = diagsCode.join('","')
    opersCode = opersCode.join('","')
    const wt4 = { ACCTUAL_DAYS: dataWt4.acctual_days, B_WT4_V1_ID: dataWt4.b_wt4_v1_id, DISEASE_CODE: dataWt4.disease_code, AGE: dataWt4.age, GENDER: dataWt4.gender, SF0100: dataWt4.sf0100, SF0102: dataWt4.sf0102, SF0104: dataWt4.sf0104, SF0108: dataWt4.sf0108, TOTAL_EXPENSE: dataWt4.total_expense, diags_code: `["${diagsCode}"]`, opers_code: `["${opersCode}"]` }
    axios({
      method: 'post',
      url: url,
      data: qs.stringify(wt4),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      responseType: 'json'
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        if (version === 'CN') {
          obj.$store.commit('SYSTEM_GET_WT4_COMP', [res.data.result, '病案分组成功', true])
        } else {
          obj.$store.commit('SYSTEM_GET_WT4_COMP', [res.data, '病案分组成功', true])
        }
      } else {
        obj.$store.commit('SYSTEM_GET_WT4_COMP', [{}, '病案分组失败', true])
      }
    }).catch((err) => {
      console.log(err)
      obj.$store.commit('SYSTEM_GET_WT4_COMP', [{}, '连接失败', true])
    })
  } else {
    obj.$store.commit('SYSTEM_GET_WT4_COMP', [{}, '病案分组失败,病案不存在', true])
  }
}
// 获取分析字段和范围
export function sGetTarget(obj, data, type) {
  let url = ''
  if (type === 'list') {
    url = `http://${data[0]}:${data[1]}/stat/target1/`
  } else {
    url = `http://${data[0]}:${data[1]}/stat/target?file=${type}`
  }
  axios({
    method: 'get',
    url: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (type === 'list') {
      obj.$store.commit('SYSTEM_GET_TARGET_LIST', res.data.list)
    } else {
      obj.$store.commit('SYSTEM_GET_TARGET', res.data)
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_GET_TARGET', {})
  })
}

function fileInsert(obj, data) {
  axios({
    method: 'GET',
    url: `http://${data[0]}:${data[1]}/servers/wt4_insert`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    console.log(res)
    if (res.status === 200) {
      obj.$store.commit('SYSTEM_UPLOAD_FILE', res)
      obj.$store.commit('SET_NOTICE', `文件上传${res.data.result}条`)
    } else {
      obj.$store.commit('SYSTEM_PROVINCE', [])
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_PROVINCE', [])
  })
}

function fileUploadDoc(obj, data, res) {
  axios({
    method: 'GET',
    url: `http://${data[0]}:${data[1]}/hospitals/json_check?file_path=${res.file_path}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      fileInsert(obj, data)
      // obj.$store.commit('SYSTEM_PROVINCE', res.data)
    } else {
      obj.$store.commit('SYSTEM_PROVINCE', [])
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_PROVINCE', [])
  })
}
// 上传病案
export function sUploadDoc(obj, data) {
  console.log(data)
  if (data[3] && data[2]) {
    const content = data[3].join('\n')
    const objFile = new File([content], data[2]);
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    fd.append('file', objFile);
    xhr.open('POST', `http://${data[0]}:${data[1]}/servers/wt4_upload/`, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        obj.$store.commit('SET_NOTICE', '文件上传成功!')
        const res = JSON.parse(xhr.responseText)
        fileUploadDoc(obj, data, res)
      } else {
        // obj.$store.commit('SYSTEM_UPLOAD_FILE', {})
      }
    }
    xhr.send(fd);
  }
}

// 获取省份
export function sGetProvince(obj, data) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/servers/province/`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SYSTEM_PROVINCE', res.data)
    } else {
      obj.$store.commit('SYSTEM_PROVINCE', [])
    }
  }).catch((err) => {
    console.log(err)
    obj.$store.commit('SYSTEM_PROVINCE', [])
  })
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
