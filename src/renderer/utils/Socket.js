const { Socket } = require('phoenix-channels')
export default function connect(obj) {
  const socket = new Socket('ws://127.0.0.1:3001/socket', {});
  console.log(socket);
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
