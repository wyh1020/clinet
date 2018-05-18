const { Socket } = require('phoenix-channels')
let socket = null
let channel = null
// 连接(obj, [url, port, username])
export function connect(obj, data) {
  if (data[0] !== '' && data[1] !== '' && data[2] !== '') {
    socket = new Socket(`ws://${data[0]}:8000/socket`, {});
    socket.connect();
    obj.$store.commit('SET_NOTICE', '在线交流连接成功，点击远程文件选择聊天房间！');
  } else {
    obj.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
  }
}

export function join(obj, filename, username) {
  channel = socket.channel(`room:${filename}`, {})
  channel.join()
    .receive('ok', () => {
      obj.$store.commit('SET_NOTICE', '加入房间成功')
      channel.push('加入房间', { body: username, username: username })
      obj.$store.commit('EDIT_SET_CHAT_TYPE', true);
    })
    .receive('error', () => {
      obj.$store.commit('SET_NOTICE', '加入房间失败')
    })
  channel.on('新消息', (payload) => {
    obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: payload.body, type: payload.type, username: payload.username });
  })
  channel.on('加入房间', (payload) => {
    obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: payload.body, type: 'info', username: payload.username });
  })
  channel.on('离开房间', (payload) => {
    obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: payload.body, type: 'info', username: payload.username });
  })
}

export function message(obj, message, username = '', type = 'message') {
  channel.push('新消息', { body: message, username: username, type: type })
  obj.$store.commit('SET_NOTICE', '消息发送成功')
}

export function leave(obj, username = '') {
  channel.push('离开房间', { body: '离开房间', username: username });
  obj.$store.commit('SET_NOTICE', '已离开房间')
}
