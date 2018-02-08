<template>
  <div>
    <table>
      <tr>
        <th class="table-danger"> 选择编辑条目</th>
      </tr>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="loadDoc(data)">
        <td>{{data.substr(0, 100)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: null
      };
    },
    computed: {
      xs: {
        get() {
          return this.$store.state.Edit.file
        }
      }
    },
    methods: {
      loadDoc: function (x) {
        const h = this.$store.state.Edit.file[0].split(',')
        const b = x.split(',')
        const r = []
        h.forEach((d, i) => {
          r.push(`${d} ${b[i]}`)
        });
        this.$store.commit('EDIT_LOAD_DOC', r)
        this.$store.commit('EDIT_SET_LEFTPANEL', 'doc')
      },
    },
  };
</script>

<style scoped>

</style>
