<template>
  <div>
    <table v-if="this.$store.state.System.toolbar === 'checkTable'" v-bind:style="{ height: height + 'px', overflow: 'auto' }">
      <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}" class="server-load-rightpanel-tr">
        <td v-for="(field, index) in data" v-bind:key='index' v-bind:class="{'table-danger': String(field) == 'NaN'}" class="server-load-rightpanel-td">{{data[index]}}</td>
      </tr>
    </table>
    <table v-else>
      <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}" class="server-load-rightpanel-tr">
        <td v-for="(field, index) in data" v-bind:key='index' v-if="index < 10" class="server-load-rightpanel-td">{{data[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import loadFile from '../../utils/LoadFile';
  export default {
    data() {
      return {
        flag: null,
        height: 0
      }
    },
    computed: {
      file: {
        get() {
          let f = []
          let fileLen = this.$store.state.System.file.length;
          switch (this.$store.state.System.toolbar) {
            case 'files':
              if (fileLen > 99) { fileLen = 99 }
              for (let i = 0; i < fileLen; i += 1) {
                f.push(this.$store.state.System.file[i].split(','))
              }
              break;
            case 'tables':
              f = this.$store.state.System.table
              break;
            case 'compareTable':
              f = this.$store.state.System.table
              break;
            case 'checkTable':
              f = this.$store.state.System.checkData
              // this.$set(f, 0, this.$store.state.System.checkData)
              break;
            case 'loadTable':
              // f = this.$store.state.System.table
              break;
            case 'compDrg':
              // f = this.$store.state.System.table
              break;
            case 'statDrg':
              // f = this.$store.state.System.table
              break;
            case 'upLoadTableData':
              f = this.$store.state.System.upLoadFile
              break;
            default:
              break;
          }
          return f
        }
      },
    },
    created: function () {
      this.height = document.body.clientHeight - 400
      loadFile(this, this.$store.state.System.serverTable, 'system-home')
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_GET_FIELD', data);
        this.$store.commit('SYSTEM_GET_FIELD_INDEX', index);
      },
    },
  };
</script>

<style scoped>
</style>
