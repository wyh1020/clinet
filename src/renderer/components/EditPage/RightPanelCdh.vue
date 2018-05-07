<template>
  <div style="overflow:auto;">
    <table id="edit-rightpanelCDH-table">
      <tr>
        <th colspan="10" class="table-info" id="edit-rightpanellocal-title"> {{title}}</th>
      </tr>
      <tr class="edit-rightpanellocal-tr" v-for="(data, index) in xs" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}">
        <td>{{index}}</td>
        <td>{{data}}</td>
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
          const x = global.hitbdata.cdh
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
      onClick: function (data, index) {
        const value = `${index} ${data}`
        this.$store.commit('EDIT_SET_BAR_VALUE', value)
        document.getElementById('edit-editbar-input').focus()
      },
    },
  };
</script>

<style scoped>

</style>
