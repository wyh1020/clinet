<template>
  <div>
    <table id="edit-leftpaneltable-table">
      <tr>
        <th colspan="10" class="table-danger"> 选择编辑条目</th>
      </tr>
      <tr class="edit-leftpaneltable-tr" v-for="(data, index) in file" v-bind:key='index' v-on:click="loadDoc(data, index)" v-bind:class="{'table-danger':flag === index && index !== 0}">
        <td v-if="lastNav !== '/edit' && index < 10" v-for="(field, index) in data" v-bind:key='index' v-on:click="onClickTd(data, index)" v-bind:class="{'table-danger':flagTd.find((n)=>n===index)}">{{data[index]}}</td>
        <td v-if="lastNav === '/edit'">{{data.substr(0, 100)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    computed: {
      lastNav: {
        get() {
          return this.$store.state.Edit.lastNav
        }
      },
      file: {
        get() {
          let f = []
          if (this.$store.state.Edit.lastNav === '/edit') {
            let start = 0
            let fileLen = this.$store.state.Edit.file.length;
            if (fileLen > 99) {
              if (this.$store.state.Edit.filePage > 0) {
                start = 100 * this.$store.state.Edit.filePage
                fileLen = start + 99
              } else {
                fileLen = 99
              }
            }
            for (let i = start; i < fileLen; i += 1) {
              f.push(this.$store.state.Edit.file[i])
            }
          } else {
            f = this.$store.state.Edit.file
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
      loadDoc: function (data, index) {
        this.$store.commit('EDIT_SET_FILE_INDEX', index)
        let r = []
        if (this.$store.state.Edit.fileType === 'csv') {
          const file = this.$store.state.Edit.file
          let h = []
          h = file[0]
          // if (file.length === 20) {
          //   h = file[index]
          // } else {
          //   h = file[0].split(',')
          // }
          h.forEach((key, i) => {
            r.push(`${key} ${data[i]}`)
          });
        } else {
          r = data.split(',')
        }
        this.$store.commit('EDIT_LOAD_DOC', r)
        if (this.$store.state.Edit.selectedType === 'row') {
          this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
          this.$store.commit('EDIT_SET_RIGHT_PANEL', 'left')
        }
        this.$store.commit('EDIT_SET_DOC_INDEX', [0, true]);
        document.getElementById('edit-editbar-input').focus()
      },
    },
  };
</script>

<style scoped>

</style>
