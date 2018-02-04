<template>
  <div>
    <left-bar></left-bar>
    <left-doc></left-doc>

  </div>
</template>

<script>
  import LeftBar from './LeftBar';
  import LeftDoc from './LeftDoc';
  export default {
    components: { LeftBar, LeftDoc },
    data() {
      return {
        electron: process.versions['atom-shell'],
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version,
      };
    },
    methods: {
      load: function (n) {
        switch (n) {
          case 1:
            this.$router.push('/edit');
            break;
          case 2:
            this.$router.push('/stat');
            break;
          case 3:
            this.$router.push('/library');
            break;
          case 4:
            this.$router.push('/system');
            break;
          default:
            this.$router.push('/edit');
        }
      },
    },
  };
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }
  * {
    padding: 0;
    margin: 0;
  }

</style>
