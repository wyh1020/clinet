<template>
  <div>
    <left-bar></left-bar>
    <left-panel-doc></left-panel-doc>
    <left-panel-table></left-panel-table>
  </div>
</template>

<script>
  import LeftBar from './LeftBar';
  import LeftPanelDoc from './LeftPanelDoc';
  import LeftPanelTable from './LeftPanelTable';
  export default {
    components: { LeftBar, LeftPanelDoc, LeftPanelTable },
  };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

</style>
