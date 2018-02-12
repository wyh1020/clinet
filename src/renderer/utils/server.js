import axios from 'axios'
const fs = require('fs')
const path = require('path');
const agent = require('superagent');

// 服务器配置文件
const serverFile = path.format({
  dir: path.join(process.env.USERPROFILE, '\\clinet-data\\system'),
  base: 'hitb_server.csv'
});
export function s1() {
  if (!fs.existsSync(serverFile)) {
    const data = '服务器名称,IP地址,PORT端口,连接设置\n'
    fs.writeFile(serverFile, data, (err) => {
      console.log(err)
    })
  }
}
// 导入数据，系统表结构
const tableFile = path.format({
  dir: path.join(process.env.USERPROFILE, '\\clinet-data\\system'),
  base: 'hitb_table.csv'
});
export function s2() {
  if (!fs.existsSync(tableFile)) {
    axios.get('/static/hitb_table.csv')
      .then((res) => {
        fs.writeFile(tableFile, res.data, (err) => {
          console.log(err)
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}


// 2.1.1 注册
export function sRegister(obj, data) {
  console.log(data)
  agent.post(`http://${data[0]}:${data[1]}/hospitals/user/`)
    .send({ user: { username: 'test', password: 'test', org: 'test', age: 20, tel: '13245678900', email: 'test@test.com', name: 'test', type: 1 } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.1.2 登录
export function sLogin(obj, data) {
  agent.post(`http://${data[0]}:${data[1]}/hospitals/login/`)
    .send({ user: { username: 'test1000', password: 'test' } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.1.3 获取用户列表
export function sGetUser(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/user/`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接失败'])
      } else {
        obj.$store.commit('SYSTEM_SET_SERVER_STATUS', [data[2], '连接成功'])
        console.log(res.body)
      }
    })
}
// 2.1.4 更新用户信息
export function sUpdateUser(obj, data) {
  agent.post(`http://${data[0]}:${data[1]}/hospitals/user/1`)
    .send({ user: { age: 21 } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.2.1 获取分析记录
export function sGetStat(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/api/stat_json/`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.2.2 分析记录的同比环比数据
export function sGetStatInfo(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/api/stat_info?id=19057`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.2.3 分析记录的同比环比图
export function sGetStatInfoChart(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/api/stat_chart?id=19057&chart_type=radar`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.2.4 下载分析记录
export function sdownLoadStatInfo(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/api/download_stat`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.2.5 保存用户自定义分析
export function sSaveDefined(obj, data) {
  agent.post(`http://${data[0]}:${data[1]}/hospitals/api/save_defined/`)
    .send({ username: 'hitb', key: ['fee_avg'] })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.3.1 规则字典库查询
export function sGetRule(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/api/rule`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.3.2 规则搜索
export function sSearchRule(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/api/search_rule?table=mdc&code=F`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.4.1 获取机构列表
export function sGetOrg(obj, data) {
  console.log(data)
  agent.get(`http://${data[0]}:${data[1]}/hospitals/org`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.4.2 新建机构
export function sCreateOrg(obj, data) {
  agent.post(`http://${data[0]}:${data[1]}/hospitals/org/`)
    .send({ org: { code: 'test03', name: '医院2', level: '三级', type: '综合医院', province: '北京市', city: '北京市', person_name: 'dzc', tel: '18515290901', email: 'duanzhichao2008@gmail.com', is_show: true, is_ban: true, county: '海淀区', stat_org_name: '3' } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.4.3 更新机构信息
export function sUpdateOrg(obj, data) {
  agent.put(`http://${data[0]}:${data[1]}/hospitals/org/3`)
    .send({ org: { name: '医院3' } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.4.4 获取科室列表
export function sGetDepart(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/customize_department`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.4.5 新建科室
export function sCreateDepart(obj, data) {
  agent.post(`http://${data[0]}:${data[1]}/hospitals/customize_department/`)
    .send({ customize_department: { wt_code: 'test03', wt_name: '医院2', c_user: 'hitb', class: '03-内科', department: '0303-神经内科专业', cherf_department: 'a', professor: 'b', is_spe: true, is_imp: true, is_ban: true, org: 'test1' } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.4.6 更新科室信息
export function sUpdateDepart(obj, data) {
  agent.put(`http://${data[0]}:${data[1]}/hospitals/customize_department/45`)
    .send({ customize_department: { wt_name: 'test04' } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.4.7 获取标准科室列表
export function sGetSystemDepart(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/department`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.5.1 病案上传
export function sUploadDoc(obj, data) {
  agent.post(`http://${data[0]}:${data[1]}/hospitals/json_upload/`)
    .send({ doc: { wt_code: 'test03', wt_name: '医院2' } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.5.2 病案校验
export function sCheckDoc(obj, data) {
  agent.post(`http://${data[0]}:${data[1]}/hospitals/json_check/`)
    .send({ doc: { wt_code: 'test03', wt_name: '医院2' } })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.5.3 病案导入
export function sInsertDoc(obj, data) {
  agent.get(`http://${data[0]}:${data[1]}/hospitals/wt4_insert/`)
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.6.1 统计分析
export function sStatDoc(obj, data) {
  agent.post(`http://${data[0]}:${data[1]}/hospitals/api/stat/`)
    .send({ username: 'hitb', password: 'test123456' })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
// 2.6.2 调用单条分组（跳转到分组服务器）
export function sCompDrg(obj, data) {
  agent.post(`http://${data[0]}:${data[1]}/hospitals/api/comp_drg/`)
    .send({ B_WT4_V1_ID: 70235613, DISEASE_CODE: 'H25.901', AGE: 20, GENDER: '男', SF0100: -1, SF0102: -1, SF0104: -1, SF0108: -1, ACCTUAL_DAYS: 13, TOTAL_EXPENSE: 348128.74, diags_code: [], opers_code: ['00.31001', '02.93002', '86.98001', '87.03001'] })
    .set('header_key', 'header_value')
    .end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })
}
