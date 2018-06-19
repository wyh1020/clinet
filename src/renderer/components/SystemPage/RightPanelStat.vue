<template>
  <div>
    <table>
      <tr v-for="(data, index) in file" v-bind:key='index' v-on:click="onClick(data, index)" v-bind:class="{'table-danger':flag == index}" class="server-stat-rightpanel-tr">
        <td v-for="(field, index) in data" v-bind:key='index'>{{data[index]}}</td>
      </tr>
    </table>
    <div v-if="this.$store.state.System.toolbar === 'serverData'">
      <table>
        <form>
          <thead>
            <tr>
              <th>选择</th>
              <th>年龄</th>
              <th>性别</th>
              <th>出院转归</th>
              <th>主要诊断</th>
              <th>其他诊断</th>
              <th>手术操作</th>
              <th>新生儿出生天数</th>
              <th>新生儿入院体重</th>
              <th>呼吸机使用小时数</th>
              <th>总费用</th>
              <th>住院天数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, index) in this.$store.state.System.wt4.data"  v-bind:key="index">
              <td>
                <div class="custom-control custom-checkbox mr-sm-2">
                  <input type="checkbox" class="custom-control-input" :id = "value.b_wt4_v1_id" v-on:click="getStat('wt4', value.b_wt4_v1_id)" checked="checked" v-if="checkbox.wt4.includes(value.b_wt4_v1_id)"/>
                  <input type="checkbox" class="custom-control-input" :id = "value.b_wt4_v1_id" v-on:click="getStat('wt4', value.b_wt4_v1_id)" v-else/>
                  <label class="custom-control-label" :for="value.b_wt4_v1_id"></label>
                </div>
              </td>
              <td>{{value.age}}</td>
              <td>{{value.gender}}</td>
              <td>{{value.sf0108}}</td>
              <td>{{value.disease_code}}</td>
              <td>{{value.diags_code.join(',')}}</td>
              <td>{{value.opers_code.join(',')}}</td>
              <td>{{value.sf0100}}</td>
              <td>{{value.sf0102}}</td>
              <td>{{value.sf0104}}</td>
              <td>{{value.total_expense}}</td>
              <td>{{value.acctual_days}}</td>
            </tr>
          </tbody>
        </form>
      </table>
      <div class="row">
        <div class="col-5" />
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" v-for="(value, index) in this.$store.state.System.wt4.page_list" v-bind:key="index" v-bind:class="{'disabled': value.page === page}" v-on:click="wt4Page(value.page)">
              <a class="page-link" href="#">{{value.num}}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div v-if="this.$store.state.System.toolbar === 'getIndex'">
      <form>
        <div class="row">
          <div class="col-md-4" v-for="(value, index) in this.$store.state.System.targetIndex" v-bind:key="index">
            <div class="custom-control custom-checkbox mr-sm-2">
              <input type="checkbox" class="custom-control-input" :id = "value" v-on:click="getStat('index', value)" v-if="checkbox.index.includes(value)" checked ="true"/>
              <input type="checkbox" class="custom-control-input" :id = "value" v-on:click="getStat('index', value)" v-else/>
              <label class="custom-control-label" :for="value">{{value}}</label>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div v-if="this.$store.state.System.toolbar === 'getDimension'">
      <dimension></dimension>
    </div>
  </div>
</template>

<script>
  import Dimension from './RightPanelStat/Dimension';
  import { sGetWt4 } from '../../utils/Server'
  export default {
    components: { Dimension },
    data() {
      return {
        flag: null,
        page: this.$store.state.System.wt4.page_num
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
      checkbox: {
        get() {
          return this.$store.state.System.serverStat
        }
      }
    },
    methods: {
      onClick: function (data, index) {
        this.flag = index
        this.$store.commit('SYSTEM_GET_FIELD', data);
        this.$store.commit('SYSTEM_GET_FIELD_INDEX', index);
      },
      wt4Page: function (value) {
        this.page = value
        sGetWt4(this, [this.$store.state.System.server, this.$store.state.System.port], this.page)
      },
      getStat: function (value, value1) {
        // if (value === 'index') {
        //   this.$store.state.System.targetArray[this.$store.state.System.indexTable] = value1);
        // }
        const values = [value, value1]
        this.$store.commit('SYSTEM_GET_SERVER_STAT', values);
      }
    },
  };
</script>

<style scoped>
</style>
