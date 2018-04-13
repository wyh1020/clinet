<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#edit-leftbar-nav" aria-controls="edit-leftbar-nav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="edit-leftbar-nav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" id="edit-leftbar-back" v-on:click="lastNav" v-if="this.$store.state.Edit.lastNav !== '/edit'">
          <a class="nav-link text-light" href="#"> 返回 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="edit-leftbar-choice" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            选择
          </a>
          <div class="dropdown-menu" id="edit-leftba-sel" aria-labelledby="edit-leftbar-choice">
            <a class="dropdown-item" href="#" v-on:click="newDoc('病案首页（卫统四CSV）')" id="edit-leftbar-wt4">病案首页（卫统四CSV）</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="newDoc('入院申请')" id="eidt-leftbar-admissionApplication">入院申请</a>
            <a class="dropdown-item" href="#" v-on:click="newDoc('首次病程')" id="eidt-leftbar-firstDisease">首次病程</a>
            <a class="dropdown-item" href="#" v-on:click="newDoc('病程记录')" id="eidt-leftbar-diseaseRecord">病程记录</a>
            <a class="dropdown-item" href="#" v-on:click="newDoc('病案首页')" id="eidt-leftbar-medicalHome">病案首页</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="newDoc('门诊病案')" id="eidt-leftbar-outpatientMedical">门诊病案</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="newDoc('健康体检')" id="eidt-leftbar-healthExamination">健康体检</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item" id="edit-leftbar-newdoc" v-on:click="newDoc(null)">
          <a class="nav-link text-light" href="#">新建</a>
        </li>
        <li class="nav-item" id="edit-leftbar-preservation" v-on:click="save(1)">
          <a class="nav-link text-light" href="#">保存</a>
        </li>
        <li class="nav-item" id="edit-leftbar-save" v-on:click="save(2)">
          <a class="nav-link text-light" href="#">另存</a>
        </li>
        <li class="nav-item" id="edit-leftbar-del" v-on:click="save(0)">
          <a class="nav-link text-light" href="#">删除</a>
        </li>
        <li class="nav-item active" id="edit-leftbar-uppage" v-on:click='page(-1)' v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="edit-leftbar-downpage" v-on:click='page(1)' v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#"> 后页 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0" v-on:submit.prevent>
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-on:keyup.enter="leftEnter" v-model="leftItem">
      </form>
    </div>
  </nav>
</template>

<script>
  import saveFile from '../../utils/SaveFile'
  import { saveEdit } from '../../utils/EditServerFile'
  import { getStat } from '../../utils/StatServerFile'
  import { getLibrary } from '../../utils/LibraryServerFile';
  export default {
    data() {
      return {
        name: this.$route.name,
        leftItem: ''
      };
    },
    methods: {
      lastNav: function () {
        this.$router.push(this.$store.state.Edit.lastNav);
        this.$store.commit('EDIT_SET_LAST_NAV', '/edit');
      },
      newDoc: function (n) {
        // this.$store.commit('EDIT_SET_DOC')
        this.$store.commit('EDIT_SET_DOC_INDEX', [0, true])
        this.$store.commit('EDIT_SET_FILE_INDEX', this.$store.state.Edit.file.length)
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
        if (n) {
          this.$store.commit('EDIT_SET_DOC_TYPE', n)
          this.$store.commit('SET_NOTICE', n);
        } else {
          this.$store.commit('EDIT_SET_DOC');
          this.$store.commit('EDIT_SET_BAR_VALUE', '');
          const docType = this.$store.state.Edit.docType
          if (global.hitbmodel[docType] !== undefined) {
            this.$store.commit('EDIT_LOAD_DOC', global.hitbmodel[docType])
            this.$store.commit('SET_NOTICE', docType);
          }
        }
        document.getElementById('edit-editbar-input').focus()
      },
      page: function (n) {
        let page = 0
        let countPage = 0
        switch (this.$store.state.Edit.lastNav) {
          case '/library':
            page = this.$store.state.Library.tablePage
            countPage = this.$store.state.Library.countPage
            break;
          case '/stat':
            page = this.$store.state.Stat.tablePage
            countPage = this.$store.state.Stat.countPage
            break;
          default:
            page = this.$store.state.Edit.filePage
            break;
        }
        if (page === 1 && n === -1) {
          this.$store.commit('SET_NOTICE', '当前已是第一页')
        } else if (countPage === page && n === 1 && ['/stat', '/library'].includes(this.$store.state.Edit.lastNav)) {
          this.$store.commit('SET_NOTICE', '当前已是尾页');
        } else {
          switch (this.$store.state.Edit.lastNav) {
            case '/library':
              if (this.$store.state.Library.tableType === 'server') {
                this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
                getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Library.serverTable.tableName, this.$store.state.Library.tablePage, this.$store.state.Library.dimensionType, this.$store.state.Library.dimensionServer])
              } else {
                this.$store.commit('LIBRARY_TABLE_PAGE', [n]);
                this.$store.commit('EDIT_LOAD_FILE', this.$store.state.Library.localTable)
                this.$store.commit('SET_NOTICE', `当前${this.$store.state.Library.tablePage}页,共${this.$store.state.Library.countPage}页`)
              }
              break;
            case '/stat':
              if (this.$store.state.Stat.tableType === 'server') {
                this.$store.commit('STAT_TABLE_PAGE', n);
                getStat(this, [this.$store.state.System.server, this.$store.state.System.port], { tableName: this.$store.state.Stat.serverTable.tableName, page: this.$store.state.Stat.tablePage, username: this.$store.state.System.user.username, type: this.$store.state.Stat.dimensionType, value: this.$store.state.Stat.dimensionServer })
              } else {
                this.$store.commit('STAT_TABLE_PAGE', n);
                this.$store.commit('SET_NOTICE', `当前${this.$store.state.Stat.tablePage}页,共${this.$store.state.Stat.countPage}页`)
              }
              break;
            default:
              this.$store.commit('EDIT_SET_FILE_PAGE', n);
              this.$store.commit('SET_NOTICE', '下一页')
              break;
          }
        }
      },
      save: function (n) {
        const fileIndex = this.$store.state.Edit.fileIndex
        let doc = this.$store.state.Edit.doc
        doc = doc.map(x => x.join(' '))
        switch (n) {
          case 0:
            if (this.$store.state.Edit.fileIndex === null) {
              this.$store.commit('SET_NOTICE', '请选择删除内容');
            } else {
              this.$store.commit('SET_NOTICE', '删除成功');
              this.$store.commit('EDIT_DELETE_DOC', fileIndex);
              this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
              this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
            }
            break;
          case 1:
            if (doc.toString() === '') {
              this.$store.commit('SET_NOTICE', '保存内容不能为空');
            } else if (this.$store.state.Edit.serverType === 'show') {
              saveEdit(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Edit.files[this.$store.state.Edit.filesIndex], this.$store.state.Edit.file, this.$store.state.System.user.username])
            } else {
              let x = ''
              if (this.$store.state.Edit.lastNav === '/stat') {
                x = this.$store.state.Stat.fileName
              } else {
                x = this.$store.state.Edit.files[this.$store.state.Edit.filesIndex]
              }
              this.$store.commit('EDIT_SAVE_DOC', [fileIndex, doc.toString()]);
              // const x = this.$store.state.Edit.files[this.$store.state.Edit.filesIndex]
              const p = this.$store.state.Edit.lastNav
              saveFile(this, x, p)
            }
            break;
          case 2:
            this.$store.commit('EDIT_ADD_DOC', doc.toString());
            this.$store.commit('SET_NOTICE', '另存成功');
            break;
          default:
            break;
        }
      },
      leftEnter(e) {
        const doc = this.$store.state.Edit.doc
        const indexArr = []
        doc.map((x) => {
          indexArr.push(x.indexOf(e.target.value))
          const index1 = indexArr.indexOf(0)
          if (index1 > -1) {
            this.$store.commit('EDIT_SEARCH_DOC_INDEX', index1);
            this.$store.commit('SET_NOTICE', '')
          } else {
            this.$store.commit('SET_NOTICE', '未查找到，请输入正确内容！')
          }
          return index1
        })
        this.leftItem = ''
      },
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
