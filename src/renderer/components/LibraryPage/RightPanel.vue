<template>
  <div>
    <right-bar></right-bar>
    <div v-bind:style="{ height: height + 'px', overflow: 'auto' }">
      <!-- <table v-if ="this.$store.state.Library.tableType === 'local'">
        <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':rowHeight == index && index !== 0}" class="library-rightpanel">
          <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
        </tr>
        v-if ="this.$store.state.Library.tableType === 'server' || this.$store.state.Library.tableType === 'block'"
      </table> -->
      <table>
        <tr>
          <td v-for="(field, index) in this.$store.state.Library.title" v-bind:key='index'>{{field}}</td>
        </tr>
        <tr v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger': rowHeight == index}" class="library-rightpanel">
          <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
        </tr>
      </table>
      <nav aria-label="Page navigation example" v-if="this.$store.state.Library.tableType === 'server'">
        <ul class="pagination">
          <li class="page-item" v-for= "(value, index) in page.pageList" v-bind:key="index" v-bind:class="{'disabled':value.page == page.page}" v-on:click="serverPage(value.page)"><a class="page-link" href="#">
            {{value.num}}
          </a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  import { getLibrary } from '../../utils/LibraryServerFile'
  export default {
    components: { RightBar },
    data() {
      return {
        // flag: null
        height: 0
      };
    },
    created: function () {
      this.height = document.body.clientHeight - 100
    },
    computed: {
      page: {
        get() {
          return { pageList: this.$store.state.Library.serverTable.pageList, page: this.$store.state.Library.serverTable.page }
        }
      },
      xs: {
        get() {
          let table = []
          switch (this.$store.state.Library.tableType) {
            case 'local': {
              table = this.$store.state.Library.localTable;
              break;
            }
            case 'server': {
              table = this.$store.state.Library.serverTable.data
              break;
            }
            case 'block': {
              table = this.$store.state.Library.serverTable.data
              break;
            }
            default: {
              break;
            }
          }
          return table
        }
      },
      rowHeight: {
        get() {
          return this.$store.state.Library.rowHeight
        }
      },
      fieldIndex: {
        get() {
          return this.$store.state.Library.fieldIndex
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        this.$store.commit('LIBRARY_GET_ROW', index);
        this.$store.commit('LIBRARY_GET_FIELD', data);
        if (this.$store.state.Library.tableType === 'server') {
          this.$store.commit('LIBRARY_GET_FIELD_INDEX', index);
        }
      },
      serverPage: function (data) {
        const page = parseInt(data, 10)
        this.$store.commit('LIBRARY_SET_TABLE_PAGE', page);
        getLibrary(this, [this.$store.state.System.server, this.$store.state.System.port], this.$store.state.Library.serverTable.tableName, page, this.$store.state.Library.dimensionType, this.$store.state.Library.dimensionServer, 'library', this.$store.state.Library.tableType)
        // getLibrary(obj, data, tableName, pageNum, dimensionType, dimensionServer, type1, serverType = 'server'
      }
    },
  };
</script>

<style scoped>

</style>
