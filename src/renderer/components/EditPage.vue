<template>
  <div>
    <nav-bar></nav-bar>
    <main>
      <div class="row">
        <div class="col">
          <left-panel></left-panel>
        </div>
        <div class="col">
          <right-panel></right-panel>
        </div>
      </div>
    </main>
    <edit-bar></edit-bar>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation';
  import NavBar from './HomePage/NavBar';
  import EditBar from './EditPage/EditBar';
  import LeftPanel from './EditPage/LeftPanel';
  import RightPanel from './EditPage/RightPanel';
  export default {
    name: 'edit-page',
    components: { SystemInformation, NavBar, EditBar, LeftPanel, RightPanel },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      load() {
        this.$router.push('/home');
      },
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
  }
  main {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    padding: 0;
  }

  main > div { flex-basis: 100%; }

</style>
