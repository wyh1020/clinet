import saveFile from './SaveFile'
import { saveEdit } from './EditServerFile'
export default function saveDoc(obj, data) {
  const date = new Date();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = `0${strDate}`
  }
  const currentdate = `${date.getFullYear()}-${month}-${strDate} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  obj.$store.commit('EDIT_UPDATE_DOC_HEADER', ['保存时间', currentdate]);
  obj.$store.commit('EDIT_SET_DOC_STATE');
  const fileName = obj.$store.state.Edit.fileName
  let doc = obj.$store.state.Edit.doc
  doc = doc.filter(x => x !== '')
  doc = doc.map(x => x.join(' '))
  let x = ''
  let p = ''
  if (fileName.includes('@')) {
    if (data === '保存模板') {
      if (!obj.$store.state.Edit.modelName) {
        obj.$store.commit('SET_NOTICE', '请输入模板名称！')
      } else {
        saveEdit(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.Edit.files[this.$store.state.Edit.filesIndex], [doc.toString()], this.$store.state.System.user.username, 1, this.$store.state.Edit.docType, '模板')
      }
    } else if (data === '保存病案') {
      saveEdit(obj, [obj.$store.state.System.server, obj.$store.state.System.port], obj.$store.state.Edit.files[this.$store.state.Edit.filesIndex], [doc.toString()], this.$store.state.Edit.serverId, this.$store.state.System.user.username, 1, this.$store.state.Edit.docType, '病案')
    }
    obj.$store.commit('EDIT_SET_DELETE_SERVER', obj.$store.state.Edit.filesIndex)
  } else {
    if (data === '保存模板') {
      obj.saveType = '保存模板'
    } else {
      obj.saveType = '保存病案'
    }
    if (obj.$store.state.Edit.lastNav === '/stat') {
      x = obj.$store.state.Stat.fileName
    } else {
      x = obj.$store.state.Edit.files[obj.$store.state.Edit.filesIndex]
    }
    p = obj.$store.state.Edit.lastNav
    saveFile(obj, x, p)
    obj.$store.commit('EDIT_SET_DELETE_LOCAL', obj.$store.state.Edit.filesIndex)
  }
}
