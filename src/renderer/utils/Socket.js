const { Socket } = require('phoenix-channels')
let socket = null
let channel = null
export function connect(obj, data) {
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
}

export function message(obj, message) {
  channel.push('新消息', { body: message })
  obj.$store.commit('SET_NOTICE', '消息发送成功')
}
