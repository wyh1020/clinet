const { Socket } = require('phoenix-channels')
let socket = null
let channel = null
// 连接(obj, [url, port, username])
export function connect(obj, data) {
  if (data[0] !== '' && data[1] !== '' && data[2] !== '') {
    socket = new Socket(`ws://${data[0]}:8000/socket`, {});
    socket.connect();
    channel = socket.channel('room:lobby', {})
    channel.join()
      .receive('ok', () => {
        obj.$store.commit('SET_NOTICE', '加入房间成功')
      })
      .receive('error', () => {
        obj.$store.commit('SET_NOTICE', '加入房间失败')
      })
    channel.push('加入房间', { body: `${data[2]}`, username: data[2] })
    channel.on('新消息', (payload) => {
      obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: payload.body, type: 'message', username: payload.username });
    })
    channel.on('加入房间', (payload) => {
      obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: payload.body, type: 'info', username: payload.username });
    })
    channel.on('离开房间', (payload) => {
      obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: payload.body, type: 'info', username: payload.username });
    })
  } else {
    obj.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
  }
}

export function message(obj, message, username = '') {
  channel.push('新消息', { body: message, username: username })
  obj.$store.commit('SET_NOTICE', '消息发送成功')
}

export function leave(obj, username = '') {
  channel.push('离开房间', { body: '离开房间', username: username });
  obj.$store.commit('SET_NOTICE', '已离开房间')
}
