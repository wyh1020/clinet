<template>
  <div id="edit-leftpaneldoc-doc">
    <div class="card">
      <div class="card-body" v-for="(section, key) of doc" v-bind:key='key'>
        <!-- 个人信息 -->
        <!-- 主诉-病史-体格检查 -->
        <!-- 医嘱 -->
        <!-- 检查/检验结果 -->
        <!-- 签名-日期 -->
        <ol class="breadcrumb" v-if="true">
          <li class="breadcrumb-item" v-for="(item, index) in section" v-bind:key='index' v-bind:class="{'table-danger':flag == item[0]}">
            <b>{{ item[0] }}</b>
            ：{{ item[1] }} {{ item[2] }} {{ item[3] }} {{ item[4] }}
              {{ item[5] }} {{ item[6] }} {{ item[7] }} {{ item[8] }}
          </li>
          <hr>
        </ol>
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
          const doc = this.$store.state.Edit.doc
          const key = doc[this.$store.state.Edit.docIndex]
          if (key) {
            return key[0]
          }
          return null
        }
      },
      doc: {
        get() {
          // const doc = this.$store.state.Edit.doc
          const doc = ['a b c', 'b c d', '个人信息', '姓名 瞪大', '性别 男', '年龄 19', '主诉', '头 痛 3天', '体格检查', '体态 正常', '步态 正常', '心率 120']
          const x = doc.map(m => m.split(' ').filter(i => i !== ''))
          console.log(x)
          const doc1 = editDoc(x)
          console.log(doc1)
          return doc1
        }
      }
    },
    methods: {
    },
  };
</script>

<style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .breadcrumb > li + li:after {
    color: #CCCCCC;
    content: "，";
    padding: 0 5px;
  }
  .breadcrumb > li + li:before {
    color: #CCCCCC;
    content: "  ";
    padding: 0 5px;
  }
</style>
