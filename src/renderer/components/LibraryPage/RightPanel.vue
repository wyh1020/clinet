<template>
  <div>
    <right-bar></right-bar>
    <table>
      <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}" class="library-rightpanel">
        <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
      </tr>
    </table>
    <nav aria-label="Page navigation example" v-if="this.$store.state.Library.tableType === 'server'">
      <ul class="pagination">
        <li class="page-item" v-for= "(value, index) in page.page_list" v-bind:key="index" v-bind:class="{'disabled':value.page == page.page_num}" v-on:click="serverPage(value.page)"><a class="page-link" href="#">
          {{value.num}}
        </a></li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  import { getLibrary } from '../../utils/LibraryServerFile'
  export default {
    components: { RightBar },
    data() {
      return {
        flag: null
      };
    },
    computed: {
      page: {
        get() {
          return this.$store.state.Library.serverTablePage
        }
      },
      xs: {
        get() {
          let table = []
          switch (this.$store.state.Library.tableType) {
            case 'local': {
              const f = []
              let start = 0
              let fileLen = this.$store.state.Library.tableSel.length;
              // console.log(fileLen)
              if (fileLen > 99) {
                if (this.$store.state.Library.tablePage > 0) {
                  start = 100 * this.$store.state.Library.tablePage
                  fileLen = start + 99
                } else {
                  fileLen = 99
                }
              }
              if (fileLen > this.$store.state.Library.tableSel.length) {
                fileLen = this.$store.state.Library.tableSel.length
              }
              for (let i = start; i < fileLen; i += 1) {
                f.push(this.$store.state.Library.tableSel[i])
              }
              const a = this.$store.state.Library.tableHeader[0]
              f.splice(0, 0, a)
              table = f
              break;
            }
            case 'server': {
              table = this.$store.state.Library.serverTable
              break;
            }
            default: {
              break;
            }
          }
          return table
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        this.$store.commit('LIBRARY_GET_FIELD', data);
        this.$store.commit('LIBRARY_GET_FIELD_INDEX', index);
      },
      serverPage: function (data) {
        const page = parseInt(data, 10)
        getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port, this.$store.state.Library.tableName, page])
      }
    },
  };
</script>

<style scoped>

</style>
