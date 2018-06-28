<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import saveFile from './utils/SaveFile'
  export default {
    name: 'clinet',
    mounted: function () {
      window.addEventListener('beforeunload', e => this.windowClose(e))
    },
    methods: {
      windowClose(e) {
        console.log(e)
        console.log('222')
        // alert('asdasdf')
        let x = ''
        let p = ''
        if (this.$store.state.Edit.lastNav === '/stat') {
          x = this.$store.state.Stat.fileName
        } else {
          x = '未保存病案.cda'
        }
        p = this.$store.state.Edit.lastNav
        saveFile(this, x, p)
      }
    }
  };
</script>

<style>
  * {
    font-size: medium;
  }

  body {
    /* 原始颜色 */
    /* background: radial-gradient(ellipse at top left, #97dde0 40%, #82e0e0 100%); */
    /* 原始颜色变换 */
    /* background: radial-gradient(ellipse at top left, #e1fdfd 35%, #82e0e0 100%); */
    /* 极光色 */
    /* background: linear-gradient(to bottom , #c8cdfb, #9bf7c0); */
    /* 亮蓝色-白色 */
    background: radial-gradient(circle at 70% 40%, #eef5fb 3%, #b4daf8 80%);
  }
</style>
