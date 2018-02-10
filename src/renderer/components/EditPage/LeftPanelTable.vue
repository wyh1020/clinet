<template>
  <div>
    <table>
      <tr>
        <th class="table-danger"> 选择编辑条目</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadDoc(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td>{{data.substr(0, 100)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    computed: {
      xs: {
        get() {
          return this.$store.state.Edit.file
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
        const h = this.$store.state.Edit.file[0].split(',')
        const b = data.split(',')
        const r = []
        h.forEach((d, i) => {
          r.push(`${d} ${b[i]}`)
        });
        this.$store.commit('EDIT_LOAD_DOC', r)
        this.$store.commit('EDIT_SET_LEFT_PANEL', 'doc')
      },
    },
  };
</script>

<style scoped>

</style>
