<template>
  <div>
    <server-bar v-if="toolbar == '区块链服务-服务器节点设置'"></server-bar>
    <user-bar v-if="toolbar == '区块链服务-账户设置'"></user-bar>
    <block-bar v-if="toolbar == '区块链服务-区块查询'"></block-bar>
    <drg-bar v-if="toolbar == '区块链服务-DRG分组服务'"></drg-bar>
    <stat-bar v-if="toolbar == '区块链服务-DRG分析计算'"></stat-bar>

    <right-panel-server v-if="toolbar == '区块链服务-服务器节点设置'"></right-panel-server>
    <right-panel-user v-if="toolbar == '区块链服务-账户设置'"></right-panel-user>
    <right-panel-block v-if="toolbar == '区块链服务-区块查询'"></right-panel-block>
    <right-panel-drg v-if="toolbar == '区块链服务-DRG分组服务'"></right-panel-drg>
    <right-panel-stat v-if="toolbar == '区块链服务-DRG分析计算'"></right-panel-stat>
  </div>
</template>

<script>
  import UserBar from './UserBar';
  import BlockBar from './BlockBar';
  import ServerBar from './ServerBar';
  import DrgBar from './DrgBar';
  import StatBar from './StatBar';
  import RightPanelUser from './RightPanelUser';
  import RightPanelBlock from './RightPanelBlock';
  import RightPanelServer from './RightPanelServer';
  import RightPanelDrg from './RightPanelDrg';
  import RightPanelStat from './RightPanelStat';

  export default {
    components: { DrgBar, ServerBar, UserBar, StatBar, BlockBar, RightPanelUser, RightPanelBlock, RightPanelServer, RightPanelDrg, RightPanelStat },
    computed: {
      toolbar: {
        get() {
          return this.$store.state.Home.navbar
        }
      }
    },
  };
</script>

<style scoped>

</style>
