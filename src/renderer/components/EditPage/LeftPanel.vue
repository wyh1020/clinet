<template>
  <div>
    <left-bar></left-bar>
    <left-panel-doc v-if="leftPanel == 'doc'"></left-panel-doc>
    <left-panel-table v-if="leftPanel == 'table'"></left-panel-table>
  </div>
</template>

<script>
  import LeftBar from './LeftBar';
  import LeftPanelDoc from './LeftPanelDoc';
  import LeftPanelTable from './LeftPanelTable';
  export default {
    components: { LeftBar, LeftPanelDoc, LeftPanelTable },
    data() {
      return {
        flag: ''
      };
    },
    computed: {
      leftPanel: {
        get() {
          return this.$store.state.Edit.leftPanel
        }
      }
    },
  };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    margin-bottom: 70px;
  }

</style>
