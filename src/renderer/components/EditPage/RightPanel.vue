<template>
  <div>
    <right-bar></right-bar>
    <right-panel-local v-if="rightPanel == 'local'"></right-panel-local>
    <right-panel-help v-if="rightPanel == 'help'"></right-panel-help>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  import RightPanelLocal from './RightPanelLocal';
  import RightPanelHelp from './RightPanelHelp';
  export default {
    components: { RightBar, RightPanelLocal, RightPanelHelp },
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
