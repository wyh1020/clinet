<template>
  <div id="edit-rightpanel">
    <right-bar></right-bar>
    <right-panel-local v-if="rightPanel == 'local'"></right-panel-local>
    <right-panel-local v-if="rightPanel == 'server'"></right-panel-local>
    <right-panel-help v-if="rightPanel == 'help'"></right-panel-help>
    <left-panel-table v-if="rightPanel == 'left'"></left-panel-table>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  import RightPanelLocal from './RightPanelLocal';
  import RightPanelHelp from './RightPanelHelp';
  import LeftPanelTable from './LeftPanelTable';
  export default {
    components: { RightBar, RightPanelLocal, RightPanelHelp, LeftPanelTable },
    data() {
      return {
        flag: ''
      };
    },
    computed: {
      rightPanel: {
        get() {
          return this.$store.state.Edit.rightPanel
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
