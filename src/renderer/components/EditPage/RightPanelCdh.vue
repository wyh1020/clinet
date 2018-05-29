<template>
  <div style="overflow:auto;">
    <table id="edit-rightpanelCDH-table">
      <tr>
        <th colspan="10" class="table-info" id="edit-rightpanellocal-title"> {{title}}
          <a href="#" v-on:click="close(title)" style="float: right">×</a>
        </th>
      </tr>
      <tr class="edit-rightpanellocal-tr" v-for="(data, index) in xs" v-bind:key='index' v-bind:class="{'table-danger':flag == index}">
        <td>{{index}}</td>
        <td>
          <ol class="breadcrumb" >
            <li class="breadcrumb-item" v-for="(item, i) in data" v-bind:key='i' v-on:click="getItem(item, index)" v-on:dblclick="addItem(item, index)">
              {{ item }}
            </li>
          </ol>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    components: { },
    computed: {
      title: {
        get() {
          const x = '输入框提示列表'
          return x
        }
      },
      xs: {
        get() {
          let x = global.hitbdata.cdh
          if (this.$store.state.Edit.rightPanel === 'local') {
            x = global.hitbdata.cdh
          } else {
            x = this.$store.state.Edit.rightCdh
          }
          return x
        },
      },
      flag: {
        get() {
          return this.$store.state.Edit.cdhIndex
        }
      }
    },
    methods: {
      getItem: function (item, index) {
        const value = `${index} ${item}`
        this.$store.commit('EDIT_SET_BAR_VALUE', value)
        document.getElementById('edit-editbar-input').focus()
      },
      addItem: function (item, index) {
        const value = `${index} ${item}`
        this.$store.commit('EDIT_SET_BAR_VALUE', value)

        const n = this.$store.state.Edit.docIndex
        this.$store.commit('EDIT_UPDATE_DOC', [n, [index, item]]);
        this.$store.commit('EDIT_SET_DOC_INDEX', [1]);
      },
      close(data) {
        this.$store.commit('EDIT_DELETE_RIGHT_PANELS', data);
      }
    },
  };
</script>

<style scoped>
  td {
    margin: 0;
    padding: 0;
  }

  ol {
    margin: 0;
    border: 0;
    padding: 0;
  }
</style>
