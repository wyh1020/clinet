const axios = require('axios');
const qs = require('qs');
export function getEditFiles(obj, data, type, username, serverType = 'server') {
  let url = ''
  if (type === 'user') {
    url = `http://${data[0]}:${data[1]}/edit/cda_user?server_type=${serverType}`
  } else {
    url = `http://${data[0]}:${data[1]}/edit/cda_file?username=${username}&server_type=${serverType}`
  }
  axios({
    method: 'get',
    url: url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('EDIT_SERVER_FILES', res.data.cda)
      if (type === 'user') {
        obj.$store.commit('EDIT_SET_SERVER_TYPE', 'file');
      } else {
        obj.$store.commit('EDIT_SET_SERVER_TYPE', 'show');
      }
      obj.$store.commit('SET_NOTICE', res.data.info);
    } else {
      obj.$store.commit('EDIT_SERVER_FILES', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('EDIT_SERVER_FILES', [])
  })
}
// this, [url, port, filename, serverType]
export function getEdit(obj, data, filename, serverType = 'server', type = '') {
  // 去除文件名中的.csv
  const file = filename.split('-')
  let url = ''
  if (type === 'upload') {
    url = '&type=create'
  }
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/edit/cda?filename=${file[1]}&username=${file[0]}${url}&server_type=${serverType}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      // obj.$store.commit('EDIT_LOAD_FILE', res.data)
      obj.$store.commit('EDIT_SERVER_ID', res.data.cda.id)
      obj.$store.commit('EDIT_LOAD_FILE', [res.data.cda.content])
      obj.$store.commit('SET_NOTICE', res.data.info);
      obj.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
    } else {
      obj.$store.commit('EDIT_LOAD_FILE', [])
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('EDIT_LOAD_FILE', [])
  })
}

export function saveEdit(obj, data, fileName, content, id, saveType, username, doctype, mouldtype) {
  content = content[0]
  const url = `http://${data[0]}:${data[1]}/edit/cda`
  const header = obj.$store.state.Edit.docHeader
  axios({
    method: 'post',
    url: url,
    data: qs.stringify({ id: id, file_name: fileName, content: content, username: username, doctype: doctype, mouldtype: mouldtype, header: header, save_type: saveType }),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      if (res.data.success) {
        console.log(res.data);
        obj.$store.commit('SET_NOTICE', res.data.info)
      } else {
        obj.$store.commit('SET_NOTICE', res.data.info)
      }
    } else {
      obj.$store.commit('SET_NOTICE', '保存失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '保存失败')
  })
}

export function getDocTypes(obj, data, username) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/edit/mouldlist?username=${username}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      const results = res.data.result.map(n => n.slice(0, -4))
      obj.$store.commit('EDIT_SET_DOC_TYPES', results)
      obj.$store.commit('SET_NOTICE', '模板列表查询成功')
    } else {
      obj.$store.commit('SET_NOTICE', '模板列表查询失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '模板列表查询失败')
  })
  obj.$store.commit('SET_NOTICE', '远程docType未查询')
}

export function getDocContent(obj, data, username, filename) {
  filename = `${filename}.cdh`
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/edit/mouldfile?username=${username}&name=${filename}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      obj.$store.commit('SET_NOTICE', '模板内容查询成功')
      const con = res.data.result.split(',')
      obj.$store.commit('EDIT_LOAD_DOC', con)
      obj.$store.commit('SET_NOTICE', '模板内容查询成功')
    } else {
      obj.$store.commit('SET_NOTICE', '模板内容查询失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '模板内容查询失败')
  })
}

export function getHelpTypes(obj, data) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/edit/helplist`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      const b = res.data.result
      if (b) {
        obj.$store.commit('EDIT_SET_HELP_TYPES', b)
      }
    } else {
      obj.$store.commit('SET_NOTICE', '远程帮助失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '远程帮助失败')
  })
}

export function clinetHelp(obj, data, name) {
  axios({
    method: 'get',
    url: `http://${data[0]}:${data[1]}/edit/helpfile?name=${name}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      const b = res.data.result.split('\\n')
      const obj1 = {}
      b.map((n) => {
        const index = n.indexOf(' ')
        const c = n.slice(0, index)
        const a = [n.slice(index + 1)]
        obj1[c] = a
        return obj1
      })
      obj.$store.commit('EDIT_SET_RIGHT_CDH', obj1)
    } else {
      obj.$store.commit('SET_NOTICE', '远程帮助失败')
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '远程帮助失败')
  })
}


export function getCaseHistory(obj, data, name, username) {
  const objs = {}
  name.forEach((n) => {
    if (['姓名', '年龄', '性别', '婚姻', '民族', '出生地', '职业'].includes(n[0])) {
      if (n.length === 2) {
        objs[n[0]] = n[1]
      } else {
        objs[n[0]] = '-'
      }
    }
  })
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/edit/patientlist`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    data: qs.stringify({ info: objs, username: username }),
    responseType: 'json'
  }).then((res) => {
    if (res.status === 200) {
      console.log(res)
      obj.$store.commit('SET_NOTICE', '病案历史查询成功')
      obj.$store.commit('EDIT_SET_DOC_HIS', res.data.result)
    }
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '病案历史查询失败')
  })
}

export function editDocState(obj, doc) {
  if (doc[0][0]) {
    const value = doc[0][0].split(';')
    const header = value.map((x) => {
      const a = x.split(':')
      if (a[0] && a[0].includes('时间')) {
        const b = `${a[1]}:${a[2]}:${a[3]}`
        a[1] = b
        a.splice(2, 2)
      }
      return a
    })
    // 未缓存 修改时间》缓存时间
    // 未保存 缓存时间》保存时间
    // 已保存 保存时间》缓存时间
    const keys = []
    const values = []
    header.forEach((x) => {
      keys.push(x[0])
      values.push(x[1])
    })
    const obj1 = {}
    keys.forEach((x, key) => {
      if (values[key] && values.includes('　')) {
        obj1[x] = values[key].replace(/　/g, ' ')
      } else {
        obj1[x] = ''
      }
    })
  }
  // obj.$store.commit('EDIT_SET_DOC_HEADER', obj1)
  // console.log(obj1)
}

export function editDocShow(obj, data, value) {
  const value2 = value.split(',').map(x => x.split(' ')[1])
  axios({
    method: 'post',
    url: `http://${data[0]}:${data[1]}/edit/cda_consule`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    data: qs.stringify({ diag: `["${value2.join('","')}"]` }),
    responseType: 'json'
  }).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
    obj.$store.commit('SET_NOTICE', '病案历史查询失败')
  })
  // console.log(diag)
}
