<template>
  <div id="edit-leftpaneldoc-doc" v-bind:style="{ height: height + 'px', overflow: 'auto' }">
    <div class="card">
      <div class="card-body" v-for="(section, key) of doc" v-bind:key='key'>
        <!-- 个人信息 -->
        <div v-if="lastNav === '/stat' || lastNav === '/library' || lastNav === '/system'">
          <table>
            <tr class="table-warning"><td>{{key}}</td><td></td></tr>
            <tr v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}" v-on:click="changeIndex(item)">
              <td><b>{{ item[1] }}</b></td>
              <td>{{ item[2] }}{{ item[3] }}{{ item[4] }}{{ item[5] }}{{ item[6] }}{{ item[7] }}{{ item[8] }}</td>
            </tr>
          </table>
        </div>
        <div v-if="lastNav === '/edit'">
          <table v-if="key === '个人信息'">
            <tr class="table-warning"><td colspan="4">{{key}}</td></tr>
            <tr rowspan="2" v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}" v-on:click="changeIndex(item)">
              <td rowspan="2" v-if="index % 2 === 0"><b>{{ item[1] }}</b></td>
              <td rowspan="2" v-if="index % 2 === 0">{{ item[2] }}{{ item[3] }}{{ item[4] }}{{ item[5] }}{{ item[6] }}{{ item[7] }}{{ item[8] }}</td>
              <td v-if="index % 2 !== 0"><b>{{ item[1] }}</b></td>
              <td v-if="index % 2 !== 0">{{ item[2] }}{{ item[3] }}{{ item[4] }}{{ item[5] }}{{ item[6] }}{{ item[7] }}{{ item[8] }}</td>
            </tr>
          </table>
          <!-- 未定义-主诉-病史-体格检查 -->
          <table v-if="['未定义', '主诉', '病史', '现病史', '既往史', '家族史', '个人史', '月经史', '婚育史', '家庭史', '遗传史', '体格检查'].includes(key)">
            <tr class="table-warning"><td>{{key}}</td></tr>
            <tr v-if="section.length > 0"><td>
              <ol class="breadcrumb" >
                <li class="breadcrumb-item" v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}" v-on:click="changeIndex(item)">
                  <b>{{ item[1] }}</b>
                  ：{{ item[2] }} {{ item[3] }} {{ item[4] }} {{ item[5] }} {{ item[6] }} {{ item[7] }} {{ item[8] }}
                </li>
                <hr>
              </ol>      
            </td></tr>
            <tr v-if="section.length === 0"><td>
              <ol class="breadcrumb" >
                <li class="breadcrumb-item" v-on:click="changeIndex(item)">
                  <b>空</b>
                </li>
                <hr>
              </ol>       
            </td></tr>
          </table>
          <!-- 医嘱 -->
          <table v-if="key === '医嘱'">
            <tr class="table-warning"><td>{{key}}</td></tr>
            <tr v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}">
              <td v-on:click="changeIndex(item)"><b>{{ item[1] }}</b>
                {{ item[2] }}  {{ item[3] }}  {{ item[4] }}
                {{ item[5] }}  {{ item[6] }}  {{ item[7] }}  {{ item[8] }}
              </td>
            </tr>
          </table>
          <!-- 检查/检验结果 -->
          <table v-if="key === '检验结果'">
          </table>  
          <!-- 签名-日期 -->
          <table v-if="key === '签名'">
            <tr v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}">
              <td class="text-right" v-bind:class="{'table-info':index == 0}" v-on:click="changeIndex(item)">
                <b>{{ item[1] }}</b>
                {{ item[2] }}  {{ item[3] }}  {{ item[4] }}
                {{ item[5] }}  {{ item[6] }}  {{ item[7] }}  {{ item[8] }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import editDoc from '../../utils/EditDoc'
  export default {
    data() {
      return {
        height: window.innerHeight - 120
      };
    },
    computed: {
      flag: {
        get() {
          // const doc = this.$store.state.Edit.doc
          // const key = doc[this.$store.state.Edit.docIndex]
          // if (key) {
          //   return key[0]
          // }
          return this.$store.state.Edit.docIndex
        }
      },
      doc: {
        get() {
          const doc = this.$store.state.Edit.doc
          const doc1 = editDoc(doc)
          return doc1
        }
      },
      lastNav: {
        get() {
          return this.$store.state.Edit.lastNav
        }
      }
    },
    methods: {
      changeIndex: function (v) {
        const value = v.concat()
        const index = value.shift(0)
        this.$store.commit('EDIT_SET_BAR_VALUE', value)
        this.$store.commit('EDIT_SET_DOC_INDEX', [index, 'set']);
        document.getElementById('edit-editbar-input').focus()
      },
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .breadcrumb > li + li:before {
    color: #CCCCCC;
    content: "  ";
    padding: 0 5px;
  }
</style>
