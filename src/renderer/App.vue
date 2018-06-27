<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'clinet',
    mounted: function () {
      console.log(this.$store.state.Edit.isSave)
      if (this.$store.state.Edit.isSave.length > 0) {
        window.addEventListener('beforeunload', this.windowClose())
      }
    },
    methods: {
      windowClose() {
        console.log(this.$store.state.Edit.isSave)
        if (confirm('是否保存全部未保存病案？')) {
          console.log('是')
        }
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
