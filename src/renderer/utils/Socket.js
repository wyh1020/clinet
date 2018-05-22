// const { Socket } = require('phoenix-channels')
import { Socket } from 'phoenix'
let socket = null
let channel = null
let createRoomTime = ''
// 连接(obj, [url, port, username])
export function connect(obj, data) {
  if (data[0] !== '' && data[1] !== '' && data[2] !== '') {
    socket = new Socket(`ws://${data[0]}:8000/socket`, { params: { token: 'a token', username: data[2] } });
    socket.connect();
    const channel2 = socket.channel('online:list', {})
    channel2.join();
    channel2.on('邀请加入', (r) => {
      obj.$store.commit('EDIT_SET_CHAT_TYPE', true);
      obj.$store.commit('SET_NOTICE', `${r.message}`)
      obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: r.message, type: 'info', time: r.time, room: r.room, create_room_time: r.create_room_time });
      createRoomTime = r.create_room_time
    })
  } else {
    obj.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
  }
}

export function join(obj, filename, username) {
  channel = socket.channel(`room:${username}`, { username: username })
  channel.join()
    .receive('ok', () => {
      obj.$store.commit('SET_NOTICE', '加入房间成功')
      channel.push('加入房间', { body: username, username: username, create_room_time: createRoomTime })
      obj.$store.commit('EDIT_SET_CHAT_TYPE', true);
    })
    .receive('error', () => {
      obj.$store.commit('SET_NOTICE', '加入房间失败')
    })
  channel.on('新消息', (r) => {
    obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: r.body, type: r.type, username: r.username, time: r.time, create_room_time: createRoomTime });
  })
  channel.on('加入房间', (r) => {
    obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: r.body, type: 'info', username: r.username, time: r.time, create_room_time: createRoomTime });
  })
  channel.on('离开房间', (r) => {
    obj.$store.commit('EDIT_SET_SOCKET_RECORD', { message: r.body, type: 'info', username: r.username, time: r.time, create_room_time: createRoomTime });
  })
  channel.on('ping', (r) => {
    obj.$store.commit('EDIT_SET_CHAT_USERS', r.users);
  })
}


export function invite(obj, filename, username = '') {
  channel.push('邀请加入', { body: '', room: filename, username: username, create_room_time: createRoomTime })
}

export function message(obj, message, username = '', type = 'message') {
  channel.push('新消息', { body: message, username: username, type: type, create_room_time: createRoomTime })
  obj.$store.commit('SET_NOTICE', '消息发送成功')
}

export function leave(obj, username = '') {
  channel.push('离开房间', { body: '离开房间', username: username, create_room_time: createRoomTime });
  obj.$store.commit('SET_NOTICE', '已离开房间')
}
