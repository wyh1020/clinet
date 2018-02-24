<template>
  <div>
    <table>
      <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td v-for="(field, index) in data" v-bind:key='index' v-if="index < 10">{{data[index]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: null
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
              f = this.$store.state.System.table
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
            default:
              break;
          }
          return f
        }
      },
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        // console.log(this.$store.state.System.table[n])
        this.$store.commit('SYSTEM_GET_FIELD', data);
        this.$store.commit('SYSTEM_GET_FIELD_INDEX', index);
      },
    },
  };
</script>

<style scoped>

</style>
