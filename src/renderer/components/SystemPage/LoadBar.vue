<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" v-on:click='getFiles()' id="server-load-loaclfile">
          <a class="nav-link text-light" href="#"> 选择CSV文件 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='getTables()' id="server-load-choosedb">
          <a class="nav-link text-light" href="#"> 选择数据表 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='compareTable()' id="server-load-contrast">
          <a class="nav-link text-light" href="#"> 对照数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='checkTable()' id="server-load-checkdata">
          <a class="nav-link text-light" href="#"> 校验数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click='editTable()' id="server-load-editdata">
          <a class="nav-link text-light" href="#"> 编辑数据 <span class="sr-only">(current)</span></a>
        </li>
        <!-- <li class="nav-item active" v-on:click='loadTable' id="server-load-import">
          <a class="nav-link text-light" href="#"> 导入数据 <span class="sr-only">(current)</span></a>
        </li> -->
        <!-- <li class="nav-item active" v-on:click='saveTableData' id="server-load-savelocal">
          <a class="nav-link text-light" href="#"> 保存本地文件 <span class="sr-only">(current)</span></a>
        </li> -->
        <li class="nav-item active" v-on:click='upLoadTableData()' id="server-load-uploaddata">
          <a class="nav-link text-light" href="#"> 上传服务器数据 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click="checkPage('up')" id="server-load-uppage">
          <a class="nav-link text-light" href="#"> 前页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click="checkPage('down')" id="server-load-downpage">
          <a class="nav-link text-light" href="#"> 后页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click="checkPage('left')" id="server-load-leftpage">
          <a class="nav-link text-light" href="#"> 左页 <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active" v-on:click="checkPage('right')" id="server-load-rightpage">
          <a class="nav-link text-light" href="#"> 右页 <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="server-load-search">
      </form> -->
    </div>
  </nav>
</template>

<script>
  import { sUploadDoc } from '../../utils/Server';
  // import loadFile from '../../utils/LoadFile';
  export default {
    data() {
      return {
        paths: []
      };
    },
    computed: {
      serverTable: {
        get() {
          return this.$store.state.System.serverTable
        }
      }
    },
    methods: {
      loadPath: function () {},
      getFiles: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'files');
        this.$store.commit('SYSTEM_GET_FILES');
      },
      getTables: function () {
        const tables = Object.keys(global.hitbdata.table)
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'tables');
        this.$store.commit('SYSTEM_GET_TABLES', tables);
      },
      compareTable: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'compareTable');
      },
      checkTable: function () {
        if (this.$store.state.System.table.length === 0) {
          this.$store.commit('SET_NOTICE', '无校验文件');
        } else {
          const y = this.$store.state.System.table.filter(x => x[x.length - 1] !== '')
          const [first, ...rest] = this.$store.state.System.file
          const header = first.split(',')
          const files = []
          const headers = [...header, ...y.map(n => n[2])]
          rest.forEach((n) => {
            let body = n.split(',')
            y.forEach((n1) => {
              const type = typeof (body[header.indexOf(n1[5])])
              if (n1[3] !== type) {
                if (n1[3] === 'string') {
                  const a = String(body[header.indexOf(n1[5])])
                  body = [...body, a]
                } else if (n1[3] === 'integer') {
                  const a = Number(body[header.indexOf(n1[5])])
                  body = [...body, a]
                } else if (n1[3] === 'boolean') {
                  const a = Boolean(body[header.indexOf(n1[5])])
                  body = [...body, a]
                } else {
                  console.log('数据类型校验错误')
                }
              } else {
                body = [...body, body[header.indexOf(n1[5])]]
                this.$store.commit('SET_NOTICE', '数据校验成功');
              }
            });
            files.push(body);
          })
          const file = [headers, ...files]
          this.$store.commit('SYSTEM_GET_CHECKDATA', file)
          this.$store.commit('SYSTEM_SET_TOOLBAR', 'checkTable');
        }
      },
      checkPage: function (value) {
        if (this.$store.state.System.checkData[0].length !== 10 && value === 'right') {
          this.$store.commit('SET_NOTICE', '当前已经是最后一页')
        } else if (this.$store.state.System.checkDataNum <= 0 && value === 'left') {
          this.$store.commit('SET_NOTICE', '当前已经是第一页')
        } else if (value === 'up' && this.$store.state.System.checkDataPage <= 0) {
          this.$store.commit('SET_NOTICE', '当前已经是第一页')
        } else if (value === 'down' && this.$store.state.System.checkData.length !== 21) {
          this.$store.commit('SET_NOTICE', '当前已经是最后一页')
        } else {
          this.$store.commit('SYSTEM_GET_CHECKDATA_PAGE', value)
          this.$store.commit('SET_NOTICE', `当前是${this.$store.state.System.checkDataPage + 1}页`)
        }
      },
      editTable: function () {
        const files = this.$store.state.System.files.filter(x => x.endsWith('.csv'))
        this.$store.commit('EDIT_LOAD_FILE', this.$store.state.System.checkDataAll)
        this.$store.commit('EDIT_SERVER_FILES', files)
        this.$store.commit('EDIT_SET_LAST_NAV', '/system');
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'local');
        this.$store.commit('EDIT_SET_FILES_INDEX', this.$store.state.System.loadTable);
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'table')
        this.$router.push('/edit');
      },
      loadTable: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'loadTable');
      },
      saveTableData: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'saveTableData');
      },
      upLoadTableData: function () {
        this.$store.commit('SYSTEM_SET_TOOLBAR', 'upLoadTableData');
        let server = []
        if (this.$store.state.System.server === '') {
          const key = Object.keys(global.hitbdata.server)
          server = global.hitbdata.server[key][0];
        } else {
          server = [this.$store.state.System.server, this.$store.state.System.port]
        }
        let f = []
        let fileName = ''
        // const filename =
        if (this.serverTable.endsWith('.csv')) {
          f = this.$store.state.System.file
          fileName = this.serverTable
        } else {
          f = this.$store.state.System.checkDataAll
          fileName = `${this.serverTable}.csv`
        }
        sUploadDoc(this, [server[0], server[1]], fileName, f)
      }
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  #navbarSupportedContent {
    background-image: linear-gradient(to right , #4772fe, #7997fa);
  }
  .nav-link {
    color:#ffffff;
  }
</style>
