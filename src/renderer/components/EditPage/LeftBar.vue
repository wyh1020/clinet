<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click="lastNav" v-if="this.$store.state.Edit.lastNav">
          <a class="nav-link text-light" href="#"> 返回 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            选择
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#" v-on:click="newDoc">病案首页（卫统四）</a>
            <a class="dropdown-item" href="#" v-on:click="newDoc">病案首页</a>
            <a class="dropdown-item" href="#" v-on:click="newDoc">首次病程</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" v-on:click="newDoc">疾病名称</a>
          </div>
        </li>
        <li class="nav-item" v-on:click="newDoc">
          <a class="nav-link text-light" href="#">新建</a>
        </li>
        <li class="nav-item" v-on:click="save(1)">
          <a class="nav-link text-light" href="#">保存</a>
        </li>
        <li class="nav-item" v-on:click="save(2)">
          <a class="nav-link text-light" href="#">另存</a>
        </li>
        <li class="nav-item" v-on:click="save(0)">
          <a class="nav-link text-light" href="#">删除</a>
        </li>
        <li class="nav-item active" v-on:click='page(-1)' v-if="this.$store.state.Edit.leftPanel == 'table'">
          <a class="nav-link text-light" href="#"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='page(1)' v-if="this.$store.state.Edit.leftPanel == 'table'">
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
  const fs = require('fs')
  const path = require('path');
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
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
      },
      page: function (n) {
        this.$store.commit('EDIT_SET_FILE_PAGE', n);
      },
      save: function (n) {
        let dir = global.hitbdata.path.home
        switch (this.$store.state.Edit.lastNav) {
          case 'user':
            dir = global.hitbdata.path.user
            break
          case 'stat':
            dir = global.hitbdata.path.stat
            break
          case 'library':
            dir = global.hitbdata.path.library
            break
          case 'system':
            dir = global.hitbdata.path.system
            break
          default:
            dir = global.hitbdata.path.user
            break
        }
        const files = this.$store.state.Edit.files
        const index = this.$store.state.Edit.filesIndex
        const fileName = path.format({
          dir: dir,
          base: files[index]
        });
        const file = this.$store.state.Edit.file
        const fileIndex = this.$store.state.Edit.fileIndex
        const doc = this.$store.state.Edit.doc
        console.log(doc)
        console.log(file)
        if (n > 10 && doc.length > 0) {
          const data = doc.map(x => x[1]).toString()
          fs.appendFile(fileName, `${data},\n`, (err) => {
            console.log(err)
          })
        } else {
          console.log(fileIndex)
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
