<template>
  <div>
    <nav-bar></nav-bar>
    <main>
      <!-- <notice-bar></notice-bar> -->
      <div class="left-side">
        <home-information></home-information>
      </div>
    </main>
    <notice-bar></notice-bar>
  </div>
</template>

<script>
  import HomeInformation from './HomePage/HomeInformation';
  import NavBar from './HomePage/NavBar';
  import NoticeBar from './HomePage/NoticeBar';

  export default {
    name: 'home-page',
    components: { HomeInformation, NavBar, NoticeBar },
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

  .left-side {
    display: flex;
    flex-direction: column;
  }

</style>
