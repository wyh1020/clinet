<template>
  <div>
    <nav-bar></nav-bar>
    <main>
      <div class="row">
        <div class="col col-lg-6">
          <left-panel></left-panel>
        </div>
        <div class="col col-lg-6">
          <right-panel></right-panel>
        </div>
      </div>
    </main>
    <edit-bar></edit-bar>
  </div>
</template>

<script>
  import NavBar from './HomePage/NavBar';
  import EditBar from './EditPage/EditBar';
  import LeftPanel from './EditPage/LeftPanel';
  import RightPanel from './EditPage/RightPanel';
  export default {
    name: 'edit-page',
    components: { NavBar, EditBar, LeftPanel, RightPanel },
    // mounted: function () {
    //   if (this.$store.state.Edit.isSave.length > 0) {
    //     window.addEventListener('beforeunload', this.windowClose())
    //   }
    // },
    // methods: {
    //   windowClose() {
    //     console.log(this.$store.state.Edit.isSave)
    //     if (confirm('是否保存全部未保存病案？')) {
    //       console.log('是')
    //     }
    //   }
    // }
  };
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  main {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    padding: 0;
  }

  main > div { flex-basis: 100%; }

  .row {
    margin-right: 0;
  }
  .col {
    padding-right: 0;
  }

</style>
