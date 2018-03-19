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
        <li class="nav-item" id="edit-leftbar-file" v-on:click="saveFile">
          <a class="nav-link text-light" href="#">写入文件</a>
        </li>
        <li class="nav-item active" id="edit-leftbar-uppage" v-on:click='page(-1)' v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" id="edit-leftbar-downpage" v-on:click='page(1)' v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#"> 后页 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </div>
  </nav>
</template>

<script>
  import saveFile from '../../utils/SaveFile'
  export default {
    data() {
      return {
        name: this.$route.name
      };
    },
    methods: {
      lastNav: function () {
        this.$router.push(this.$store.state.Edit.lastNav);
        this.$store.commit('EDIT_SET_LAST_NAV', '/edit');
      },
      newDoc: function (n) {
        this.$store.commit('EDIT_SET_DOC')
        this.$store.commit('EDIT_SET_DOC_INDEX', [0, true])
        this.$store.commit('EDIT_SET_FILE_INDEX', this.$store.state.Edit.file.length)
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
        console.log(global.hitbmodel[n])
        if (global.hitbmodel[n] !== undefined) {
          this.$store.commit('EDIT_LOAD_DOC', global.hitbmodel[n])
          this.$store.commit('SET_NOTICE', n);
        } else {
          this.$store.commit('SET_NOTICE', n);
        }
        document.getElementById('edit-editbar-input').focus()
      },
      page: function (n) {
        if (this.$store.state.Edit.filePage === 0 && n === -1) {
          this.$store.commit('SET_NOTICE', '当前已是第一页')
        } else {
          this.$store.commit('EDIT_SET_FILE_PAGE', n);
        }
      },
      saveFile: function () {
        const x = this.$store.state.Edit.files[this.$store.state.Edit.filesIndex]
        const p = this.$store.state.Edit.lastNav
        saveFile(this, x, p)
      },
      save: function (n) {
        const fileIndex = this.$store.state.Edit.fileIndex
        let doc = this.$store.state.Edit.doc
        // console.log(doc)
        doc = doc.map(x => x.join(' '))
        switch (n) {
          case 0:
            console.log(this.$store.state.Edit.fileIndex)
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
            } else {
              this.$store.commit('SET_NOTICE', '保存成功');
              this.$store.commit('EDIT_SAVE_DOC', [fileIndex, doc.toString()]);
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
