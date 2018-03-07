<template>
  <div>
    <table id="edit-leftpaneltable-table">
      <tr>
        <th class="table-danger"> 选择编辑条目</th>
      </tr>
      <tr class="edit-leftpaneltable-tr" v-for="(data, index) in file" v-bind:key='index' v-on:click="loadDoc(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td>{{data.substr(0, 100)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    computed: {
      file: {
        get() {
          const f = []
          let start = 0
          let fileLen = this.$store.state.Edit.file.length;
          // console.log(fileLen)
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
          return f
        }
      },
      flag: {
        get() {
          return this.$store.state.Edit.fileIndex
        }
      }
    },
    methods: {
      loadDoc: function (data, index) {
        this.$store.commit('EDIT_SET_FILE_INDEX', index)
        let r = []
        if (this.$store.state.Edit.fileType === 'csv') {
          const h = this.$store.state.Edit.file[0].split(',')
          const b = data.split(',')
          h.forEach((key, i) => {
            r.push(`${key} ${b[i]}`)
          });
        } else {
          r = data.split(',')
        }
        this.$store.commit('EDIT_LOAD_DOC', r)
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
        this.$store.commit('EDIT_SET_RIGHT_PANEL', 'left')
        this.$store.commit('EDIT_SET_DOC_INDEX', [0, true]);
        document.getElementById('edit-editbar-input').focus()
      },
    },
  };
</script>

<style scoped>

</style>
