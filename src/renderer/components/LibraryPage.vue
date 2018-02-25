<template>
  <div>
    <nav-bar></nav-bar>
    <main>
      <div class="row">
        <div class="col-2">
          <left-panel></left-panel>
        </div>
        <div class="col-10">
          <right-panel></right-panel>
        </div>
      </div>
    </main>
    <notice-bar></notice-bar>
  </div>
</template>

<script>
  import NavBar from './HomePage/NavBar';
  import LeftPanel from './LibraryPage/LeftPanel';
  import RightPanel from './LibraryPage/RightPanel';
  import NoticeBar from './HomePage/NoticeBar';

  export default {
    name: 'library-page',
    components: { NavBar, LeftPanel, RightPanel, NoticeBar },
  };
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

</style>
