<template>
  <div id="edit-rightpanel">
    <right-bar></right-bar>
    <!-- <right-panel-local v-if="rightPanel == 'local'"></right-panel-local>
    <right-panel-local v-if="rightPanel == 'server'"></right-panel-local>
    <right-panel-help v-if="rightPanel == 'help'"></right-panel-help>
    <left-panel-table v-if="rightPanel == 'left'"></left-panel-table> -->
    <right-panel-local v-if="rightPanels.includes('本地文件') || rightPanels.includes('远程文件')"></right-panel-local>
    <right-panel-help v-if="rightPanels.includes('编辑器使用帮助') || rightPanels.includes('病案历史')|| rightPanels.includes('输入框提示')|| rightPanels.includes('病案参考')|| rightPanels.includes('DRG分析')|| rightPanels.includes('在线交流')|| rightPanels.includes('HIS接口')"></right-panel-help>
    <left-panel-table v-if="rightType == 'left' && rightPanels.includes('编辑病案')"></left-panel-table>
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
        flag: '',
      };
    },
    computed: {
      rightPanels: {
        get() {
          return this.$store.state.Edit.rightPanels
        }
      },
      rightPanel: {
        get() {
          return this.$store.state.Edit.rightPanel
        }
      },
      rightType: {
        get() {
          return this.$store.state.Edit.rightType
        }
      }
    },
  };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    /* margin-bottom: 10px; */
  }

</style>
