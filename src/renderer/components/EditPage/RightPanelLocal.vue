<template>
  <div style="marginBottom: 10px">
    <div style="overflow:auto;">
      <table id="edit-rightpanellocal-table" v-show="this.$store.state.Edit.chatType === false">
        <tr>
          <th colspan="10" class="table-info" id="edit-rightpanellocal-title"> {{title}}
            <a href="#" v-on:click="close(panelName)" style="float: right">✖</a>
          </th>
        </tr>
        <tr class="edit-rightpanellocal-tr" v-for="(data, index) in xs" v-bind:key='index' v-bind:id="'edit-rightpanellocal-tr'+index" v-bind:class="{'table-danger':flag == index}">
          <td v-on:click="loadFile(data, index)">{{index + 1}}</td>
          <td v-on:click="loadFile(data, index)">{{data}}</td>
          <td v-if ="title === '远程文件的用户列表' && data.split('').includes('-')">
            <a href="#" v-on:click="blockShare(data)">发布</a>
          </td>
        </tr>
      </table>
    </div>
    <table id='aaa' v-show="chatType">
      <div v-bind:style="{ height: height + 'px', overflow: 'auto' }" >
        <div v-for="(data, index) in socketRecord" v-bind:key='index'>
          <div style="width: 200px; margin: 0 auto"><span style="padding: 5px">{{data.time}}</span></div>
          <div v-if="data.username === username && data.message.includes('邀请您进入')" style="margin: 15px"><span class="alert alert-danger" style="padding: 5px">{{data.message}}</span></div>
          <div v-if="data.username !== username && data.message.includes('邀请您进入')" style="margin: 15px"><span class="alert alert-danger" style="padding: 5px">{{data.message}}</span></div>
          <div v-if="data.username === username" style="margin: 15px"><span class="alert alert-success" style="padding: 5px"><b>{{data.username}}</b>: {{data.message}}</span></div>
          <div v-if="data.username !== username" style="margin: 15px"><span class="alert alert-warning" style="padding: 5px"><b>{{data.username}}</b>: {{data.message}}</span></div>
        </div>
      </div>
    </table>
  </div>
</template>

<script>
  import { share } from '../../utils/Server';
  import loadFile from '../../utils/LoadFile';
  import { getLibrary } from '../../utils/LibraryServerFile'
  import { getStat } from '../../utils/StatServerFile';
  import { getEditFiles, getEdit } from '../../utils/EditServerFile'
  export default {
    data() {
      return {
        panelName: '',
      };
    },
    created: function () {
      this.height = document.body.clientHeight - 120
    },
    computed: {
      username: {
        get() {
          return this.$store.state.System.user.username
        }
      },
      chatType: {
        get() {
          return this.$store.state.Edit.chatType
        }
      },
      socketRecord: {
        get() {
          return this.$store.state.Edit.socketRecord
        }
      },
      title: {
        get() {
          let x = '用户本地的文件列表'
          this.panelName = '本地文件'
          if (this.$store.state.Edit.rightPanel === 'server') {
            x = '远程文件的用户列表'
            this.panelName = '远程文件'
            if (!this.$store.state.System.user.login) {
              x = '远程文件的用户列表（用户未登陆服务器，请先登陆！）'
            }
          } else if (this.$store.state.Edit.rightPanel === 'block') {
            x = '区块链文件的用户列表'
          }
          switch (this.$store.state.Edit.lastNav) {
            case '/stat':
              x = '数据分析文件列表'
              break;
            case '/library':
              x = '术语字典文件列表'
              break;
            case '/system':
              x = '本地导入文件列表'
              break;
            default:
              break
          }
          return x
        }
      },
      xs: {
        get() {
          let x = this.$store.state.Edit.files
          switch (this.$store.state.Edit.lastNav) {
            case '/stat':
              x = this.$store.state.Stat.files
              break;
            case '/library':
              x = this.$store.state.Library.files
              break;
            case '/system':
              x = this.$store.state.System.files
              break;
            default:
              break
          }
          return x
        },
      },
      flag: {
        get() {
          return this.$store.state.Edit.filesIndex
        }
      }
    },
    methods: {
      getheight: function () {
        // document.getElementById('aaa').scrollIntoView(true)
      },
      loadFile: function (data, index) {
        this.$store.commit('EDIT_SET_FILES_INDEX', index)
        if (data.endsWith('.cda')) {
          this.$store.commit('EDIT_SET_FILE_TYPE', 'cda')
        } else {
          this.$store.commit('EDIT_SET_FILE_TYPE', 'csv')
        }
        let x = 'user'
        switch (this.$store.state.Edit.lastNav) {
          case '/stat':
            x = 'stat'
            break;
          case '/library':
            x = 'library'
            break;
          default:
            break
        }
        if (this.$store.state.Edit.rightPanel === 'server' || this.$store.state.Edit.rightPanel === 'block') {
          this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
          switch (this.$store.state.Edit.lastNav) {
            case '/edit':
              if (this.$store.state.Edit.serverType === 'file') {
                // getEditFiles(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Edit.serverType, data, this.$store.state.System.user.username])
                getEditFiles(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Edit.serverType, this.$store.state.System.user.username, this.$store.state.Edit.rightPanel)
              } else {
                getEdit(this, [this.$store.state.System.server, this.$store.state.System.port], data)
              }
              break;
            case '/library':
              this.$store.commit('LIBRARY_SET_TABLE_PAGE', 1);
              getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], data, 1, null, null, 'edit')
              break;
            case '/stat':
              this.$store.commit('STAT_SET_TABLE_PAGE', 1)
              getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: this.$store.state.Stat.tablePage, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer }, 'edit')
              break;
            default:
              break;
          }
          if (this.$store.state.Edit.rightPanels.includes('编辑病案')) {
            this.$store.commit('EDIT_DELETE_RIGHT_PANELS', '编辑病案');
          }
        } else {
          if (this.$store.state.Edit.rightPanels.includes('编辑病案')) {
            this.$store.commit('EDIT_DELETE_RIGHT_PANELS', '编辑病案');
          }
          this.$store.commit('EDIT_SET_LOAD_FILENAME', data);
          loadFile(this, data, x, 'edit')
        }
      },
      close(data) {
        this.$store.commit('EDIT_DELETE_RIGHT_PANELS', data);
      },
      blockShare(data) {
        if (data.split('-')[0] === this.$store.state.System.user.username) {
          share(this, [this.$store.state.System.server, this.$store.state.System.port], 'edit', data, this.$store.state.System.user.username, '')
        } else {
          this.$store.commit('SET_NOTICE', '用户权限不够，不能够发布他人文件');
        }
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
        this.$store.commit('EDIT_UPDATE_DOC_HEADER', ['发布时间', currentdate]);
        this.$store.commit('EDIT_SET_DOC_STATE');
      }
    },
  };
</script>

<style scoped>

</style>
