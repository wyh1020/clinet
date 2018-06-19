<template>
  <div v-bind:style="{ height: height + 'px', overflow: 'auto' }">
    <table v-if="!this.$store.state.Edit.rightFolds.includes('编辑病案')" id="edit-leftpaneltable-table">
      <tr>
        <th colspan="10" class="table-info"> {{fileName}}（共有{{fileLength}}条记录）
          <a href="#" v-on:click="close('编辑病案')" style="float: right">✖</a>
          <a href="#" v-on:click="fold('编辑病案')" style="float: right; marginRight: 3px">↗</a>
        </th>
      </tr>
      <tr class="edit-leftpaneltable-tr" v-for="(data, index) in file" v-bind:key='index' v-bind:class="{'table-warning':flag === index}">
        <td> {{index + 1}} </td>
        <td v-if="lastNav !== '/edit' && index < 10" v-for="(field, index) in data" v-bind:key='index' v-on:click="onClickTd(data, index)" v-bind:class="{'table-danger':flagTd.find((n)=>n===index)}">{{data[index]}}</td>
        <td v-if="lastNav === '/edit'">{{data.substr(0, 100)}}</td>
        <td v-on:click="delDoc(data, index)" v-bind:id="'edit-leftpaneltable-del'+index" v-if="rightPanel !== 'block'"><a href="#">删除</a></td>
        <td v-on:click="loadDoc(data, index, 'edit')" v-bind:id="'edit-leftpaneltable-edit'+index" v-if="rightPanel !== 'block'"><a href="#">编辑</a></td>
        <td v-on:click="loadDoc(data, index, 'show')" v-bind:id="'edit-leftpaneltable-ref'+index" v-if="rightPanel !== 'block'"><a href="#">参考</a></td>
        <td v-on:click="uploadDoc(data)" v-if="!fileName.includes('@') || rightPanel !== 'block'" v-bind:id="'edit-leftpaneltable-upl'+index"><a href="#">上传</a></td>
        <td v-on:click="downloadDoc(data, index)" v-if="fileName.includes('@')" v-bind:id="'edit-leftpaneltable-dow'+index"><a href="#">下载</a></td>
      </tr>
    </table>
    <table v-if="this.$store.state.Edit.rightFolds.includes('编辑病案')">
      <tr>
        <th colspan="10" class="table-info"> {{fileName}}（共有{{fileLength}}条记录）
          <a href="#" v-on:click="close('编辑病案')" style="float: right">✖</a>
          <a href="#" v-on:click="fold('编辑病案')" style="float: right; marginRight: 5px">↙</a>
        </th>
      </tr>
      <tr  style="textAlign: center"><a href="#" v-on:click="fold('编辑病案')">...</a></tr>
    </table>
  </div>
</template>

<script>
  import { saveEdit, editDocState } from '../../utils/EditServerFile'
  import saveFile from '../../utils/SaveFile';
  import { join } from '../../utils/Socket'
  export default {
    data() {
      return {
        height: window.innerHeight - 120
      };
    },
    computed: {
      lastNav: {
        get() {
          return this.$store.state.Edit.lastNav
        }
      },
      rightPanel: {
        get() {
          return this.$store.state.Edit.rightPanel
        }
      },
      fileName: {
        get() {
          if (this.$store.state.Edit.fileName) {
            return this.$store.state.Edit.fileName
          }
          return ''
        }
      },
      fileLength: {
        get() {
          return this.$store.state.Edit.file.length
        }
      },
      file: {
        get() {
          let f = []
          const file = this.$store.state.Edit.file
          let start = 0
          let fileLen = this.$store.state.Edit.file.length;
          if (fileLen > 100) {
            if (this.$store.state.Edit.filePage > 0) {
              start = 100 * this.$store.state.Edit.filePage
              fileLen = start + 100
            } else {
              fileLen = 100
            }
          }
          for (let i = start; i < fileLen; i += 1) {
            f.push(file[i])
          }
          const type = typeof file[0]
          if (this.$store.state.Edit.lastNav !== '/edit' && type !== 'object') {
            f = f.map(n => n.split(','))
          }
          return f
        }
      },
      flag: {
        get() {
          return this.$store.state.Edit.fileIndex
        }
      },
      flagTd: {
        get() {
          return this.$store.state.Edit.selectedCol
        }
      }
    },
    methods: {
      onClickTd: function (data, index) {
        this.$store.commit('EDIT_SET_SELECTED_TYPE', 'row');
        switch (this.$store.state.Stat.tableType) {
          case 'local':
            if (data[0] === 'org' && data[1] === 'time') {
              this.$store.commit('EDIT_SET_COL', index);
              this.$store.commit('EDIT_SET_SELECTED_TYPE', 'col');
            }
            break;
          case 'server':
            if (data[0] === '机构' && data[1] === '时间') {
              this.$store.commit('EDIT_SET_COL', index);
              this.$store.commit('EDIT_SET_SELECTED_TYPE', 'col');
            }
            break;
          default:
        }
        this.$store.commit('EDIT_SET_BAR_VALUE', data[index]);
      },
      delDoc: function (data, index) {
        this.$store.commit('EDIT_DELETE_DOC', index);
        this.$store.commit('SET_NOTICE', '删除成功');
      },
      uploadDoc: function (data, index) {
        if (!this.$store.state.System.user.login) {
          this.$store.commit('SET_NOTICE', '未登录用户,请在系统服务-用户设置内登录');
        } else {
          this.$store.commit('EDIT_SET_FILE_INDEX', index)
          // obj, data, fileName, content, id, username, doctype, mouldtype
          saveEdit(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Edit.files[this.$store.state.Edit.filesIndex], [data], '', this.$store.state.System.user.username, 1, this.$store.state.Edit.docType, '病案')
        }
      },
      downloadDoc: function (data, index) {
        const index1 = this.$store.state.Edit.files[this.$store.state.Edit.filesIndex].indexOf('-')
        const filename = this.$store.state.Edit.files[this.$store.state.Edit.filesIndex].substr(index1 + 1)
        console.log(filename);
        saveFile(this, this.$store.state.Edit.loadFileName, [...this.$store.state.Edit.downFile, data]);
        this.$store.commit('EDIT_SET_FILE_INDEX', index)
      },
      loadDoc: function (data, index, type) {
        if (type === 'edit') {
          this.$store.commit('EDIT_SET_RIGHT_PANELS', '编辑病案');
          this.$store.commit('EDIT_SET_FILE_INDEX', index)
          let r = []
          if (this.$store.state.Edit.fileType === 'csv') {
            const file = this.$store.state.Edit.file
            const type = typeof this.$store.state.Edit.file[0]
            let h = []
            h = file[0]
            // if (file.length === 20) {
            //   h = file[index]
            // } else {
            //   h = file[0].split(',')
            // }
            if (type === 'string') {
              h.split(',').forEach((key, i) => {
                r.push(`${key} ${data[i]}`)
              });
            } else {
              h.forEach((key, i) => {
                r.push(`${key} ${data[i]}`)
              });
            }
          } else {
            r = data.split(',')
          }
          this.$store.commit('EDIT_LOAD_DOC', r)
          if (this.$store.state.Edit.helpType === '在线交流') {
            this.$store.commit('EDIT_SET_CHAT_TYPE', true)
            join(this, this.$store.state.Edit.fileName, this.$store.state.System.user.username)
            this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
          } else if (this.$store.state.Edit.selectedType === 'row') {
            this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
            this.$store.commit('EDIT_SET_RIGHT_TYPE', 'left')
          }
          // this.$store.commit('EDIT_SET_RIGHT_PANEL', 'left')
          this.$store.commit('EDIT_SET_RIGHT_TYPE', 'left')
          this.$store.commit('EDIT_SET_DOC_INDEX', [0, true]);
          document.getElementById('edit-editbar-input').focus()
        } else {
          this.$store.commit('EDIT_SET_RIGHT_PANELS', '病案参考');
          this.$store.commit('EDIT_SET_FILE_INDEX', index)
          this.$store.commit('EDIT_LOAD_DOC_SHOW', data.split(','))
          this.$store.commit('EDIT_SET_RIGHT_PANEL', 'help');
          this.$store.commit('EDIT_SET_HELP_TYPE', '病案参考');
        }
        const doc = this.$store.state.Edit.doc
        editDocState(this, doc)
        this.$store.commit('EDIT_SET_DOC_STATE')
      },
      close(data) {
        this.$store.commit('EDIT_DELETE_RIGHT_PANELS', data);
      },
      fold(data) {
        this.$store.commit('EDIT_SET_RIGHT_FOLDS', data);
      }
    },
  };
</script>

<style scoped>

</style>
