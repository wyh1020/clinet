<template>
  <div id="edit-rightpaneldoc-doc">
    <div class="card">
      <div>
        <a href="#" v-on:click="close('病案历史')" style="float: right; marginRight: 5px">✖</a>
      </div>
      <div class="card-body" v-for="(section, key) of doc" v-bind:key='key'>
        <!-- 个人信息 -->
        <div v-if="lastNav === '/stat'">
          <table>
            <tr class="table-warning" v-on:dblclick="addSection(key.split(',')[1])"><td>{{key.split(',')[1]}}</td><td></td></tr>
            <tr v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}" v-on:click="onClick(item)" v-on:dblclick="onDblClick(item)">
              <td><b>{{ item[1] }}</b></td>
              <td>{{ item[2] }}{{ item[3] }}{{ item[4] }}{{ item[5] }}{{ item[6] }}{{ item[7] }}{{ item[8] }}</td>
            </tr>
          </table>
        </div>
        <div v-if="lastNav === '/edit'">
          <table v-if="key.split(',')[1] === '个人信息'">
            <tr class="table-warning" v-on:dblclick="addSection(key.split(',')[1])"><td>{{key.split(',')[1]}}</td><td></td></tr>
            <tr v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}" v-on:click="onClick(item)" v-on:dblclick="onDblClick(item)">
              <td><b>{{ item[1] }}</b></td>
              <td>{{ item[2] }}{{ item[3] }}{{ item[4] }}{{ item[5] }}{{ item[6] }}{{ item[7] }}{{ item[8] }}</td>
            </tr>
          </table>
          <!-- 未定义-主诉-病史-体格检查 -->
          <table v-if="['未定义', '主诉', '病史', '现病史', '既往史', '家族史', '个人史', '月经史', '婚育史', '家庭史', '遗传史', '体格检查'].includes(key.split(',')[1])">
            <tr class="table-warning" v-on:dblclick="addSection(key.split(',')[1])"><td>{{key.split(',')[1]}}</td></tr>
            <tr><td>
              <ol class="breadcrumb" >
                <li class="breadcrumb-item" v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}" v-on:click="onClick(item)" v-on:dblclick="onDblClick(item)">
                  <b>{{ item[1] }}</b>
                  ：{{ item[2] }} {{ item[3] }} {{ item[4] }} {{ item[5] }} {{ item[6] }} {{ item[7] }} {{ item[8] }}
                </li>
                <hr>
              </ol>
            </td></tr>
          </table>
          <!-- 医嘱 -->
          <table v-if="key.split(',')[1] === '医嘱'">
            <tr class="table-warning" v-on:dblclick="addSection(key.split(',')[1])"><td>{{key.split(',')[1]}}</td></tr>
            <tr v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}">
              <td v-on:click="onClick(item)" v-on:dblclick="onDblClick(item)"><b>{{ item[1] }}</b>
                {{ item[2] }}  {{ item[3] }}  {{ item[4] }}
                {{ item[5] }}  {{ item[6] }}  {{ item[7] }}  {{ item[8] }}
              </td>
            </tr>
          </table>
          <!-- 检查/检验结果 -->
          <table v-if="key.split(',')[1] === '检验结果'">
          </table>
          <!-- 签名-日期 -->
          <table v-if="key.split(',')[1] === '签名'">
            <tr class="table-warning" v-on:dblclick="addSection(key.split(',')[1])"><td>{{key.split(',')[1]}}</td></tr>
            <tr v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}">
              <td class="text-right" v-bind:class="{'table-info':index == 0}" v-on:click="onClick(item)" v-on:dblclick="onDblClick(item)">
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
    computed: {
      flag: {
        get() {
          // const doc = this.$store.state.Edit.doc
          // const key = doc[this.$store.state.Edit.docIndex]
          // if (key) {
          //   return key[0]
          // }
          return this.$store.state.Edit.docShowIndex
        }
      },
      doc: {
        get() {
          const doc = this.$store.state.Edit.docShow
          const systemSection = this.$store.state.System.systemSection
          const doc1 = editDoc(doc, systemSection)
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
      onClick: function (v) {
        const value = v.concat()
        const index = value.shift(0)
        this.$store.commit('EDIT_SET_BAR_VALUE', value)
        this.$store.commit('EDIT_SET_DOC_SHOW_INDEX', [index, 'set']);
        document.getElementById('edit-editbar-input').focus()
      },
      onDblClick: function (v) {
        const value = v.concat()
        const index = value.shift(0)
        this.$store.commit('EDIT_SET_BAR_VALUE', value)
        this.$store.commit('EDIT_SET_DOC_SHOW_INDEX', [index, 'set']);

        const n = this.$store.state.Edit.docIndex
        this.$store.commit('EDIT_UPDATE_DOC', [n, value]);
        this.$store.commit('EDIT_SET_DOC_INDEX', [1]);
      },
      addSection: function (key) {
        const n = this.$store.state.Edit.docIndex
        this.$store.commit('EDIT_UPDATE_DOC', [n, [key]]);
        this.$store.commit('EDIT_SET_DOC_INDEX', [1]);
      },
      close(data) {
        this.$store.commit('EDIT_DELETE_RIGHT_PANELS', data);
      }
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
