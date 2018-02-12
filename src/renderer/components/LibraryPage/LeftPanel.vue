<template>
  <div style="height:400px; overflow-y:auto;">
    <left-panel-file v-if="leftPanel == 'file'"></left-panel-file>
    <left-panel-dimension v-if="leftPanel == 'dimension'"></left-panel-dimension>
  </div>
</template>

<script>
  import LeftPanelFile from './LeftPanelFile'
  import LeftPanelDimension from './LeftPanelDimension'
  
  export default {
    components: { LeftPanelFile, LeftPanelDimension },
    computed: {
      leftPanel: {
        get() {
          return this.$store.state.Library.leftPanel
        }
      }
    },
    methods: {
      loadFile: function (data, index) {
        this.flag = index
      },
    },
  };
</script>

<style scoped>

</style>
