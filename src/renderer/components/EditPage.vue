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
  import NavBar from './HomePage/NavBar';
  import EditBar from './EditPage/EditBar';
  import LeftPanel from './EditPage/LeftPanel';
  import RightPanel from './EditPage/RightPanel';
  export default {
    name: 'edit-page',
    components: { NavBar, EditBar, LeftPanel, RightPanel },
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
