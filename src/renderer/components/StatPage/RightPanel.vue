<template>
  <div>
    <right-bar></right-bar>
      <div class="row">
      <div class="col">
        <left-panel></left-panel>
      </div>
      <div class="col">
        <div id="chart1" style="width: 600px; height:400px;"></div>
      </div>
      <div class="col">
        <div id="chart2" style="width: 600px; height:400px;"></div>
      </div>
      <div class="col">
        <div class="alert alert-danger" role="alert" style="height:100%; overflow-y:auto;">
          <h4 class="alert-heading">数据分析提示!</h4>
          <ol class="">
            <li class="">aaa</li>
            <li class="" aria-current="page">bbb</li>
          </ol>
        </div>
      </div>
      <!-- <div class="container"> -->
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">7</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">8</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">9</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
  import RightBar from './RightBar';
  import LeftPanel from './Leftpanel';
  export default {
    components: { RightBar, LeftPanel },
    data() {
      return {
        name: this.$route.name
      };
    },
    methods: {
      loadPath: function () {
        this.$store.commit('GET_PATH', 'paths');
      },
      show: function () {
        this.showChart()
      },
    },
  };
</script>

<style scoped>
  table {
    width: 100%;
    margin: 15px;
    margin-top: 0;
    padding: 0;
  }
</style>
