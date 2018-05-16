const { Socket } = require('phoenix-channels')
export default function connect(obj, data) {
  const socket = new Socket(`ws://${data[0]}:${data[1]}`, {});
  socket.connect();
  const channel = socket.channel('room:lobby', {})
  channel.join()
    .receive('ok', (resp) => {
      console.log('Joined successfully', resp)
    })
    .receive('error', (resp) => {
      console.log('Unable to join', resp)
    })
  obj.$store.commit('SET_NOTICE', '测试')
}
