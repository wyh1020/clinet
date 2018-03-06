<template>
  <div>
    <table>
      <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}" class="server-drg-rightpanel-tr">
        <td v-for="(field, index) in data" v-bind:key='index' class="server-drg-rightpanel-td">{{data[index]}}</td>
      </tr>
    </table>
    <div v-if="this.$store.state.System.toolbar === 'getLocalData'">
      <table class="table">
        <thead>
          <tr>
            <th>年龄</th>
            <th>性别</th>
            <th>出院转归</th>
            <th>ICD10编码</th>
            <th>ICD9编码</th>
            <th>新生儿出生天数</th>
            <th>新生儿入院体重</th>
            <th>呼吸机使用小时数</th>
            <th>其他诊断</th>
            <th>住院天数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, index) in this.$store.state.System.wt4.data"  v-bind:key="index">
            <td>{{value.age}}</td>
            <td>{{value.gender}}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div class="col-9" />
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#" v-on:click="wt4Page('up')">上一页</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#" v-on:click="wt4Page('down')">下一页</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: null
      }
    },
    computed: {
      file: {
        get() {
          const f = []
          let fileLen = this.$store.state.System.file.length;
          switch (this.$store.state.Home.toolbar) {
            case 'files':
              if (fileLen > 99) { fileLen = 99 }
              for (let i = 0; i < fileLen; i += 1) {
                f.push(this.$store.state.System.file[i].split(','))
              }
              break;
            default:
              break;
          }
          return f
        }
      },
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_GET_FIELD', data);
        this.$store.commit('SYSTEM_GET_FIELD_INDEX', index);
      },
      wt4Page: function (value) {
        switch (value) {
          case 'up':
            console.log(value)
            break;
          case 'down':
            console.log(value)
            break;
          default:
            break;
        }
      }
    },
  };
</script>

<style scoped>
</style>
