<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#edit-leftbar-nav" aria-controls="edit-leftbar-nav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="edit-leftbar-nav">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" id="edit-leftbar-back" v-on:click="lastNav" v-if="this.$store.state.Edit.lastNav">
          <a class="nav-link text-light" href="#"> 返回 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="edit-leftbar-choice" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            选择
          </a>
          <div class="dropdown-menu" aria-labelledby="edit-leftbar-choice">
            <a class="dropdown-item" href="#" v-on:click="newDoc" id="edit-leftbar-wt4">病案首页（卫统四CSV）</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="newDoc" id="eidt-leftbar-admissionApplication">入院申请</a>
            <a class="dropdown-item" href="#" v-on:click="newDoc" id="eidt-leftbar-firstDisease">首次病程</a>
            <a class="dropdown-item" href="#" v-on:click="newDoc" id="eidt-leftbar-diseaseRecord">病程记录</a>
            <a class="dropdown-item" href="#" v-on:click="newDoc" id="eidt-leftbar-medicalHome">病案首页</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="newDoc" id="eidt-leftbar-outpatientMedical">门诊病案</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="newDoc" id="eidt-leftbar-healthExamination">健康体检</a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
        <li class="nav-item" id="edit-leftbar-newdoc" v-on:click="newDoc">
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
          <a class="nav-link text-light" href="#">写文件</a>
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
      },
      newDoc: function () {
        this.$store.commit('EDIT_SET_DOC')
        this.$store.commit('EDIT_SET_DOC_INDEX', [0, true])
        this.$store.commit('EDIT_SET_FILE_INDEX', this.$store.state.Edit.file.length)
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
        document.getElementById('edit-editbar-input').focus()
      },
      page: function (n) {
        this.$store.commit('EDIT_SET_FILE_PAGE', n);
      },
      saveFile: function () {
        const x = this.$store.state.Edit.files[this.$store.state.Edit.filesIndex]
        const p = this.$store.state.Edit.lastNav
        saveFile(this, x, p)
      },
      save: function (n) {
        const fileIndex = this.$store.state.Edit.fileIndex
        const doc = this.$store.state.Edit.doc
        switch (n) {
          case 0:
            this.$store.commit('EDIT_DELETE_DOC', fileIndex);
            this.$store.commit('EDIT_SET_LEFT_PANEL', 'table');
            this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
            break;
          case 1:
            this.$store.commit('EDIT_SAVE_DOC', [fileIndex, doc.toString()]);
            break;
          case 2:
            this.$store.commit('EDIT_ADD_DOC', doc.toString());
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
